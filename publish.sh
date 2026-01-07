#!/bin/bash

# Script to build and publish @coinswap-app/sdk to npm

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "📦 Preparing @coinswap-app/sdk for npm publication..."
echo ""

# Check if logged in to npm
echo "Step 1: Checking npm authentication..."
if ! npm whoami &> /dev/null; then
    echo "❌ Error: Not logged in to npm."
    echo "   Please run: npm login"
    exit 1
fi

NPM_USER=$(npm whoami 2>/dev/null)
if [ -z "$NPM_USER" ]; then
    echo "❌ Error: npm authentication failed. Token may have expired."
    echo "   Please run: npm logout && npm login"
    exit 1
fi

echo "✓ Logged in as: $NPM_USER"
echo ""

# Check organization access
echo "Step 2: Checking organization access..."
if ! npm org ls coinswap-app &> /dev/null; then
    echo "⚠️  Warning: Could not verify organization access. Continuing anyway..."
else
    echo "✓ Organization access verified"
fi
echo ""

# Install dependencies if needed
echo "Step 3: Installing dependencies..."
if [ ! -d "node_modules" ]; then
    echo "  Installing dependencies..."
    npm install
else
    echo "  Dependencies already installed"
fi
echo ""

# Build the package
echo "Step 4: Building package..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed - dist folder not found"
    exit 1
fi

echo "✓ Build successful"
echo ""

# Check if package already exists
echo "Step 5: Checking if package already exists on npm..."
PACKAGE_VERSION=$(node -p "require('./package.json').version")
PACKAGE_NAME=$(node -p "require('./package.json').name")

if npm view "${PACKAGE_NAME}@${PACKAGE_VERSION}" version &> /dev/null; then
    echo "⚠️  Warning: Version ${PACKAGE_VERSION} already exists on npm"
    read -p "Do you want to publish anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Publication cancelled"
        exit 1
    fi
else
    echo "✓ Version ${PACKAGE_VERSION} is available for publication"
fi
echo ""

# Publish to npm
echo "Step 6: Publishing to npm..."
echo "  Package: ${PACKAGE_NAME}"
echo "  Version: ${PACKAGE_VERSION}"
echo "  Organization: coinswap-app"
echo ""

npm publish --access public

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully published ${PACKAGE_NAME}@${PACKAGE_VERSION} to npm!"
    echo "   View at: https://www.npmjs.com/package/${PACKAGE_NAME}"
else
    echo ""
    echo "❌ Publication failed"
    exit 1
fi

