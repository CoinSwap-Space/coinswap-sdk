const https = require('https');
const fs = require('fs');
const path = require('path');

const ROUTER_ADDRESS = '0x34DBe8E5faefaBF5018c16822e4d86F02d57Ec27';
const OUTPUT_FILE = path.join(__dirname, 'src/abis/Router.json');

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
            const abi = JSON.parse(json.result);
            resolve(abi);
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

async function main() {
  console.log(`Fetching Router ABI from BSCScan for address: ${ROUTER_ADDRESS}...`);
  
  try {
    const abi = await fetchABI(ROUTER_ADDRESS);
    console.log(`✅ ABI fetched successfully (${abi.length} functions/events)`);
    
    // Save as array (not wrapped in object)
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(abi, null, 2), 'utf8');
    console.log(`✅ Router ABI saved to ${OUTPUT_FILE}`);
    
    // Verify key functions
    const functionNames = abi
      .filter(item => item.type === 'function')
      .map(item => item.name)
      .filter(Boolean);
    
    const keyFunctions = ['swapExactETHForTokens', 'swapExactTokensForETH', 'addLiquidity', 'removeLiquidity'];
    const found = keyFunctions.filter(fn => functionNames.includes(fn));
    
    console.log(`\nKey functions found: ${found.join(', ')}`);
    if (found.length === keyFunctions.length) {
      console.log('✅ All key Router functions present');
    } else {
      console.log(`⚠️  Missing functions: ${keyFunctions.filter(fn => !found.includes(fn)).join(', ')}`);
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();



