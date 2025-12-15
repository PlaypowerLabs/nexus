#!/bin/bash
# Build script to prepare files for deployment (Vercel)
# This creates a public directory structure that can be served statically

# Create public directory structure (avoid overwriting existing public/assets)
mkdir -p public-build/minimal
mkdir -p public-build/grid
mkdir -p public-build/hero
mkdir -p public-build/gamified
mkdir -p public-build/video
mkdir -p public-build/3d-manan
mkdir -p public-build/claude-manan
mkdir -p public-build/wizard

# Copy each app to public-build directory
cp -r apps/landing-minimal-clean/* public-build/minimal/ 2>/dev/null || true
cp -r apps/landing-grid-showcase/* public-build/grid/ 2>/dev/null || true
cp -r apps/landing-hero-focused/* public-build/hero/ 2>/dev/null || true
cp -r apps/landing-gamified-interactive/* public-build/gamified/ 2>/dev/null || true
cp -r apps/landing-video-story/* public-build/video/ 2>/dev/null || true
cp -r apps/landing-3d-manan/* public-build/3d-manan/
cp -r apps/landing-claude-manan/* public-build/claude-manan/
cp -r apps/landing-video-story/* public-build/video/
cp -r apps/landing-wizard-academy/* public-build/wizard/

# Copy existing public assets
if [ -d "public/assets" ]; then
  mkdir -p public-build/assets
  cp -r public/assets/* public-build/assets/
fi

# Copy root index.html and vercel.json to public
cp index.html public-build/index.html 2>/dev/null || true
cp vercel.json public-build/vercel.json 2>/dev/null || true

# Move public-build to public (this will be the output)
rm -rf public
mv public-build public

echo "Build complete! Files prepared in public directory."

