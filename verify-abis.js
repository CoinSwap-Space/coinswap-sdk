const https = require('https');
const fs = require('fs');
const path = require('path');

const contracts = {
  Factory: {
    address: '0xC2D8d27F3196D9989aBf366230a47384010440c0',
    file: 'src/abis/Factory.json'
  },
  Masterchef: {
    address: '0x3A0a988D680dBBB02DECBfd35F9E0676B4bEc292',
    file: 'src/abis/Masterchef.json'
  },
  Router: {
    address: '0x34DBe8E5faefaBF5018c16822e4d86F02d57Ec27',
    file: null // Router ABI not in SDK yet
  }
};

function fetchABI(address) {
  return new Promise((resolve, reject) => {
    const url = `https://api.bscscan.com/api?module=contract&action=getabi&address=${address}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.status === '1' && json.result) {
            resolve(JSON.parse(json.result));
          } else {
            reject(new Error(`API Error: ${json.message || 'Unknown error'}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function normalizeABI(abi) {
  return JSON.stringify(abi, null, 2);
}

function compareABIs(abi1, abi2) {
  const normalized1 = normalizeABI(abi1);
  const normalized2 = normalizeABI(abi2);
  return normalized1 === normalized2;
}

async function verifyContract(name, contract) {
  console.log(`\n🔍 Verifying ${name}...`);
  console.log(`   Address: ${contract.address}`);
  
  try {
    const bscscanABI = await fetchABI(contract.address);
    console.log(`   ✅ ABI fetched from BSCScan (${bscscanABI.length} functions/events)`);
    
    if (contract.file) {
      const filePath = path.join(__dirname, contract.file);
      if (fs.existsSync(filePath)) {
        const sdkABI = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const abi = Array.isArray(sdkABI) ? sdkABI : sdkABI.abi || sdkABI;
        
        const isMatch = compareABIs(bscscanABI, abi);
        if (isMatch) {
          console.log(`   ✅ ABI matches SDK file`);
        } else {
          console.log(`   ⚠️  ABI differs from SDK file`);
          console.log(`   📝 BSCScan has ${bscscanABI.length} items, SDK has ${abi.length} items`);
          
          // Find differences
          const bscscanFunctions = new Set(bscscanABI.map(item => item.name || item.type).filter(Boolean));
          const sdkFunctions = new Set(abi.map(item => item.name || item.type).filter(Boolean));
          
          const missingInSDK = [...bscscanFunctions].filter(x => !sdkFunctions.has(x));
          const extraInSDK = [...sdkFunctions].filter(x => !bscscanFunctions.has(x));
          
          if (missingInSDK.length > 0) {
            console.log(`   ⚠️  Missing in SDK: ${missingInSDK.slice(0, 5).join(', ')}${missingInSDK.length > 5 ? '...' : ''}`);
          }
          if (extraInSDK.length > 0) {
            console.log(`   ⚠️  Extra in SDK: ${extraInSDK.slice(0, 5).join(', ')}${extraInSDK.length > 5 ? '...' : ''}`);
          }
        }
      } else {
        console.log(`   ⚠️  SDK file not found: ${contract.file}`);
      }
    } else {
      console.log(`   ℹ️  No SDK file to compare (Router ABI not in SDK)`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
}

async function main() {
  console.log('🔐 Verifying CoinSwap Contract ABIs from BSCScan...\n');
  
  for (const [name, contract] of Object.entries(contracts)) {
    await verifyContract(name, contract);
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n✅ Verification complete!');
}

main().catch(console.error);



