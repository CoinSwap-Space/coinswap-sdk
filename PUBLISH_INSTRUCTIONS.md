# Publishing @coinswap-app/sdk to npm

## Prerequisites
- ✅ Logged in to npm (`npm login`)
- ✅ Member of `coinswap-app` organization
- ✅ **Two-Factor Authentication (2FA) enabled** OR **Granular Access Token with bypass 2FA enabled**
- ✅ All dependencies installed

## Important: 2FA Requirement

npm requires **Two-Factor Authentication (2FA)** or a **Granular Access Token with bypass 2FA enabled** to publish packages to scoped organizations.

### Option 1: Enable 2FA on npm account ✅

1. Go to https://www.npmjs.com/settings/[your-username]/security
2. Enable Two-Factor Authentication
3. Use an authenticator app (Google Authenticator, Authy, etc.)
4. **After enabling 2FA, you MUST logout and login again:**
   ```bash
   npm logout
   npm login
   ```
   When logging in, npm will prompt you for the 2FA code from your authenticator app.

### Option 2: Use Granular Access Token (with bypass 2FA)

1. Go to https://www.npmjs.com/settings/[your-username]/tokens
2. Click "Generate New Token"
3. Select "Granular Access Token"
4. Set permissions:
   - **Read and Publish** for `@coinswap-app` organization
   - Enable **"Bypass 2FA"** option
5. Copy the token and use it for authentication:
   ```bash
   npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
   ```
   Or add it to `~/.npmrc`:
   ```
   //registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE
   ```

## Quick Publish

Run the publish script:
```bash
cd coinswap-sdk
chmod +x publish.sh
./publish.sh
```

## Manual Publish

Or run commands manually:

```bash
cd coinswap-sdk

# 1. Install dependencies (if needed)
npm install

# 2. Build the package
npm run build

# 3. Verify build
ls -la dist/

# 4. Publish to npm
npm publish --access public
```

## Package Information

- **Name**: `@coinswap-app/sdk`
- **Current Version**: `1.1.1`
- **Organization**: `coinswap-app`
- **Repository**: `https://github.com/CoinSwap-Space/coinswap-app/tree/main/coinswap-sdk`

## After Publishing

The package will be available at:
https://www.npmjs.com/package/@coinswap-app/sdk

## Updating Version

To publish a new version, update the version in `package.json`:
```bash
npm version patch  # for 1.0.0 -> 1.0.1
npm version minor  # for 1.0.0 -> 1.1.0
npm version major  # for 1.0.0 -> 2.0.0
```

Then run the publish script again.



