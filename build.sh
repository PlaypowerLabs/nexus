#!/bin/bash
# Build script to prepare files for deployment (Vercel)
# This creates a dist directory structure that can be served statically

# Clean previous build
rm -rf dist

# Create dist directory structure
mkdir -p dist/games-dashboard
mkdir -p dist/3d-manan
mkdir -p dist/playpower-park
mkdir -p dist/playpower-park-vid-1-manan

# Copy each app to dist directory
cp -r apps/landing-games-dashboard/* dist/games-dashboard/
cp -r apps/landing-3d-manan/* dist/3d-manan/
cp -r apps/landing-playpower-park/* dist/playpower-park/
cp -r apps/landing-playpower-park-vid-1-manan/* dist/playpower-park-vid-1-manan/

# Copy existing public assets (includes Videos folder)
if [ -d "public/assets" ]; then
  mkdir -p dist/assets
  cp -r public/assets/* dist/assets/
fi

# Copy root index.html and metadata files to dist
cp index.html dist/index.html 2>/dev/null || true
cp landing-pages-registry.json dist/landing-pages-registry.json 2>/dev/null || true
cp claude.md dist/claude.md 2>/dev/null || true

echo "Build complete! Files prepared in dist directory."
