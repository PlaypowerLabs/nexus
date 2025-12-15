# Adding New Landing Pages

This guide explains how to add new landing pages to the Nexus project.

## Quick Steps

### 1. Create New Folder
Create a new folder in the `apps/` directory with a descriptive name:
```bash
mkdir -p apps/landing-[your-page-name]
```

### 2. Create Your Landing Page
Add your `index.html` file in the new folder:
```bash
# Create your landing page
touch apps/landing-[your-page-name]/index.html
```

### 3. Update Build Script
Edit `build.sh` to include your new landing page:

**Add mkdir command** (around line 14):
```bash
mkdir -p public-build/[your-page-name]
```

**Add copy command** (around line 26):
```bash
cp -r apps/landing-[your-page-name]/* public-build/[your-page-name]/
```

### 4. Update Vercel Configuration
Edit `vercel.json` to add routing for your page:

Add a new rewrite entry in the `rewrites` array:
```json
{
  "source": "/[your-page-name]",
  "destination": "/[your-page-name]/index.html"
}
```

### 5. Update Landing Pages Registry
Edit `landing-pages-registry.json` to add metadata about your page:
```json
{
  "path": "/[your-page-name]",
  "name": "Your Page Name",
  "description": "Brief description of your landing page",
  "owner": "Your Name",
  "createdDate": "2024-12-15",
  "lastUpdated": "2024-12-15"
}
```

### 6. Build and Test
Run the build script to test your changes:
```bash
bash build.sh
```

### 7. Commit Your Changes
```bash
git add apps/landing-[your-page-name]/ build.sh vercel.json landing-pages-registry.json
git commit -m "feat: add [your-page-name] landing page"
git push
```

## Example: Adding "Games Dashboard"

```bash
# 1. Create folder
mkdir -p apps/landing-games-dashboard

# 2. Create your HTML file
# (edit apps/landing-games-dashboard/index.html)

# 3. Update build.sh
# Add: mkdir -p public-build/games-dashboard
# Add: cp -r apps/landing-games-dashboard/* public-build/games-dashboard/

# 4. Update vercel.json
# Add rewrite: "/games-dashboard" -> "/games-dashboard/index.html"

# 5. Update landing-pages-registry.json
# Add entry with metadata

# 6. Build
bash build.sh

# 7. Commit
git add .
git commit -m "feat: add games dashboard landing page"
git push
```

## File Structure
```
nexus/
├── apps/
│   ├── landing-minimal-clean/
│   ├── landing-grid-showcase/
│   ├── landing-your-page-name/    ← Your new page here
│   │   └── index.html
│   └── ...
├── build.sh                         ← Update this
├── vercel.json                      ← Update this
├── landing-pages-registry.json      ← Update this
└── index.html                       ← Root page (auto-updates from registry)
```

## Best Practices

1. **Naming Convention**: Use `landing-[descriptive-name]` for folder names
2. **Route Naming**: Use `/[descriptive-name]` for URL paths (without "landing-" prefix)
3. **Self-Contained**: Keep all assets within your landing page folder when possible
4. **Shared Assets**: Use `/assets/` for shared images and resources
5. **Responsive Design**: Ensure your page works on mobile, tablet, and desktop
6. **Metadata**: Always update the registry with accurate information
7. **Testing**: Test your page locally before pushing

## Troubleshooting

- **Page not found**: Check that vercel.json has the correct route
- **Build fails**: Verify folder names match in build.sh
- **Images not loading**: Check asset paths (use relative paths or /assets/)
- **Not showing on root**: Update landing-pages-registry.json

## Need Help?

See existing landing pages in `apps/` folder for reference examples.
