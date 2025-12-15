# Claude Code Instructions - Nexus Landing Pages

## Repository Overview

This is a **Landing Pages Playground** for rapid prototyping and deploying landing pages to Vercel. Each landing page is a self-contained HTML file showcasing different design patterns for K-8 math educational games.

### Current Structure
```
nexus/
├── apps/                               # Landing page sources
│   ├── landing-games-dashboard/        # Games catalog dashboard
│   └── landing-3d-manan/              # 3D space-themed page
├── public/                             # Build output (auto-generated)
├── build.sh                            # Build script
├── vercel.json                         # Vercel deployment config
├── landing-pages-registry.json         # Metadata for all pages
└── index.html                          # Root page (table view)
```

### Key Files
- **apps/landing-*/**: Source folders for each landing page
- **build.sh**: Copies landing pages to public/ directory
- **vercel.json**: Routes and deployment configuration
- **landing-pages-registry.json**: Metadata (name, owner, dates, tags)
- **index.html**: Root page showing all landing pages in a table

---

## How to Add a New Landing Page

### Quick Steps

1. **Create Folder**
   ```bash
   mkdir -p apps/landing-[your-page-name]
   ```

2. **Create HTML File**
   ```bash
   # Create apps/landing-[your-page-name]/index.html
   # Make it self-contained with inline CSS/JS
   ```

3. **Update build.sh**
   Add these two lines:
   ```bash
   mkdir -p public-build/[your-page-name]
   cp -r apps/landing-[your-page-name]/* public-build/[your-page-name]/
   ```

4. **Update vercel.json**
   Add route in `rewrites` array:
   ```json
   {
     "source": "/[your-page-name]",
     "destination": "/[your-page-name]/index.html"
   }
   ```

5. **Update landing-pages-registry.json**
   Add entry (always at the top for newest first):
   ```json
   {
     "path": "/[your-page-name]",
     "name": "Your Page Name",
     "description": "Brief description",
     "owner": "Your Name",
     "createdDate": "YYYY-MM-DD",
     "lastUpdated": "YYYY-MM-DD",
     "tags": ["tag1", "tag2"]
   }
   ```

6. **Test Build**
   ```bash
   bash build.sh
   ```

7. **Commit Changes**
   ```bash
   git add apps/landing-[your-page-name]/ build.sh vercel.json landing-pages-registry.json
   git commit -m "feat: add [your-page-name] landing page"
   ```

### Example: Adding "Wizard Academy" Page

```bash
# 1. Create folder
mkdir -p apps/landing-wizard-academy

# 2. Create index.html in that folder with your design

# 3. Update build.sh - add these lines after line 7:
mkdir -p public-build/wizard-academy
cp -r apps/landing-wizard-academy/* public-build/wizard-academy/

# 4. Update vercel.json - add in rewrites array:
{
  "source": "/wizard-academy",
  "destination": "/wizard-academy/index.html"
}

# 5. Update landing-pages-registry.json - add at top of landingPages array:
{
  "path": "/wizard-academy",
  "name": "Wizard Academy",
  "description": "Magic-themed learning adventure",
  "owner": "Claude AI",
  "createdDate": "2024-12-15",
  "lastUpdated": "2024-12-15",
  "tags": ["wizard", "magic", "adventure"]
}

# 6. Test
bash build.sh

# 7. Commit
git add apps/landing-wizard-academy/ build.sh vercel.json landing-pages-registry.json
git commit -m "feat: add wizard academy landing page"
```

---

## Creating a GitHub Pull Request

### Standard Workflow

1. **Ensure you're on the correct branch**
   ```bash
   # Branch name MUST start with 'claude/' and end with session ID
   # Example: claude/add-new-feature-s5yiC
   git branch
   ```

2. **Check status and commit**
   ```bash
   git status
   git add [files]
   git commit -m "feat: descriptive commit message"
   ```

3. **Push to remote**
   ```bash
   git push -u origin <branch-name>
   ```

4. **Create PR using GitHub CLI**
   ```bash
   gh pr create --title "Add [Feature Name]" --body "$(cat <<'EOF'
   ## Summary
   - Added new landing page: [name]
   - Updated build configuration
   - Updated registry with metadata

   ## Changes
   - Created apps/landing-[name]/
   - Updated build.sh, vercel.json, landing-pages-registry.json

   ## Test Plan
   - Ran bash build.sh successfully
   - Verified routes in vercel.json
   - Checked registry metadata
   EOF
   )"
   ```

### PR Best Practices

- **Title**: Clear and descriptive (e.g., "Add wizard academy landing page")
- **Description**: Include summary, changes, and test plan
- **Commits**: Use conventional commits (feat:, fix:, chore:, docs:)
- **Testing**: Always run `bash build.sh` before pushing

---

## Vercel Deployment

### Automatic Deployment
- Vercel automatically deploys on push to `main` branch
- Preview deployments created for all PRs

### Manual Deployment
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Configuration
- Build command: `bash build.sh`
- Output directory: `public`
- Routes defined in `vercel.json`

---

## Design Guidelines

### Self-Contained Pages
- Use inline CSS and JavaScript
- Minimal external dependencies
- CDN links are OK (fonts, libraries)

### Responsive Design
- Mobile-first approach
- Test on mobile, tablet, desktop

### Performance
- Optimize images (use public/assets/ for shared images)
- Lazy load heavy resources
- Keep initial load fast

### Naming Conventions
- Folder: `landing-[descriptive-name]`
- Route: `/[descriptive-name]` (no "landing-" prefix)
- Use kebab-case

---

## Common Tasks

### Update Existing Page
1. Edit `apps/landing-[name]/index.html`
2. Update `lastUpdated` date in registry
3. Run `bash build.sh` to test
4. Commit and push

### Remove a Page
1. Delete folder: `rm -rf apps/landing-[name]/`
2. Remove from `build.sh` (mkdir and cp lines)
3. Remove from `vercel.json` (rewrite entry)
4. Remove from `landing-pages-registry.json`
5. Commit and push

### View All Pages Locally
1. Run `bash build.sh`
2. Serve the public directory:
   ```bash
   cd public && python3 -m http.server 8000
   ```
3. Open http://localhost:8000

---

## Troubleshooting

### Build Fails
- Check file paths in `build.sh`
- Ensure all referenced folders exist
- Verify JSON syntax in registry and vercel.json

### Page Not Found (404)
- Verify route exists in `vercel.json`
- Check folder name matches route
- Run `bash build.sh` again

### Images Not Loading
- Use absolute paths: `/assets/images/...`
- Or relative paths: `./image.png`
- Shared images go in `public/assets/`

### Registry Not Updating
- Ensure `landing-pages-registry.json` is valid JSON
- Check it's being copied in `build.sh`
- Clear browser cache

---

## Git Branch Naming

**CRITICAL**: Branch names MUST follow this pattern:
```
claude/[feature-description]-[session-id]
```

Examples:
- `claude/add-wizard-page-s5yiC`
- `claude/update-dashboard-s5yiC`
- `claude/fix-mobile-layout-s5yiC`

The session ID is provided in your instructions. Without it, pushes will fail with 403 error.

---

## Quick Reference

### File Locations
- Landing pages: `apps/landing-*/index.html`
- Build script: `build.sh`
- Routes: `vercel.json`
- Metadata: `landing-pages-registry.json`
- Root page: `index.html`

### Commands
```bash
# Build
bash build.sh

# Test locally
cd public && python3 -m http.server 8000

# Create branch
git checkout -b claude/feature-name-s5yiC

# Commit
git add .
git commit -m "feat: description"

# Push
git push -u origin claude/feature-name-s5yiC

# Create PR
gh pr create --title "Title" --body "Description"
```

---

## Notes for Claude Code

- **Always** run `bash build.sh` after making changes
- **Always** update the registry when adding/modifying pages
- **Always** test routes in vercel.json are correct
- **Always** use the correct branch naming pattern
- Prefer self-contained HTML files over external dependencies
- Keep the registry sorted by `lastUpdated` (newest first)
- Tag pages appropriately for discoverability

---

## Support

For questions or issues:
- Check this file first
- Review existing landing pages for examples
- Test locally before pushing
- Verify all 4 files are updated (folder, build.sh, vercel.json, registry)
