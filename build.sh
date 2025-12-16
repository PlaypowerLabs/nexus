#!/bin/bash
# Build script to prepare files for deployment (Vercel)
# This creates a public directory structure that can be served statically

# Create public directory structure
mkdir -p public-build/games-dashboard
mkdir -p public-build/3d-manan
mkdir -p public-build/playpower-park

# Copy each app to public-build directory
cp -r apps/landing-games-dashboard/* public-build/games-dashboard/
cp -r apps/landing-3d-manan/* public-build/3d-manan/
cp -r apps/landing-playpower-park/* public-build/playpower-park/

# Copy existing public assets
if [ -d "public/assets" ]; then
  mkdir -p public-build/assets
  cp -r public/assets/* public-build/assets/
fi

# Copy root index.html and metadata files to public
cp index.html public-build/index.html 2>/dev/null || true
cp landing-pages-registry.json public-build/landing-pages-registry.json 2>/dev/null || true
cp claude.md public-build/claude.md 2>/dev/null || true

# Move public-build to public (this will be the output)
rm -rf public
mv public-build public

echo "Build complete! Files prepared in public directory."
