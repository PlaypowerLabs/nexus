# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains a collection of independent landing page designs for K-8 math educational games. Each landing page is a standalone HTML/CSS project with no shared dependencies between pages.

**Key Principle:** Independent folder strategy - each landing page lives in `apps/landing-*/` and can be developed in isolation without affecting other pages.

## Deployment Architecture

The repository uses Vercel for deployment:

- **Primary Deployment:** Vercel
- **Auto-Deploy:** Vercel automatically deploys on push to connected branches
- **Build Script:** `build.sh` (copies apps to `public/` directory)
- **Configuration:** `vercel.json` (routing and build settings)

## Common Commands

### Serving Landing Pages Locally

```bash
# Serve individual landing pages
npx serve apps/landing-hero-focused
npx serve apps/landing-grid-showcase
npx serve apps/landing-minimal-clean

# Or use package.json scripts
npm run serve:hero
npm run serve:grid
npm run serve:minimal
```

### Building for Deployment

```bash
# Build all landing pages into public/ directory
bash build.sh

# The build script:
# - Creates public-build/ directories for each app
# - Copies app files to their respective paths
# - Copies shared assets from public/assets/
# - Moves public-build/ to public/
```

### Vercel Deployment

```bash
# Install Vercel CLI (if needed)
npm i -g vercel

# Deploy to Vercel (production)
vercel --prod

# Deploy to Vercel (preview)
vercel

# Check deployment status
vercel ls
```

### GitHub CLI Commands

```bash
# View repository info
gh repo view

# Create pull request
gh pr create --title "Your PR title" --body "Description"

# Check PR status
gh pr status
```

## Code Architecture

### Repository Structure

```
apps/                                   # Independent landing pages (source)
├── landing-hero-focused/               # Hero-first emotional design
├── landing-grid-showcase/              # Game catalog browser
├── landing-minimal-clean/              # Accessibility-first design
├── landing-gamified-interactive/       # Animated, playful design
├── landing-video-story/                # Video-driven narrative
├── landing-wizard-academy/             # Wizard academy theme
├── landing-3d-manan/                   # 3D Manan experimental page
└── landing-claude-manan/               # Claude Manan experimental page

public/                                 # Build output (gitignored)
├── hero/                               # Built from landing-hero-focused
├── grid/                               # Built from landing-grid-showcase
├── minimal/                            # Built from landing-minimal-clean
├── gamified/                           # Built from landing-gamified-interactive
├── video/                              # Built from landing-video-story
├── wizard/                             # Built from landing-wizard-academy
├── 3d-manan/                           # Built from landing-3d-manan
├── claude-manan/                       # Built from landing-claude-manan
└── assets/                             # Shared images/fonts

data/                                   # Game data
├── games.ts                            # Game catalog with grade levels
└── scorm.json                          # SCORM metadata

vercel.json                             # Vercel deployment configuration
```

### URL Routing

The `vercel.json` file defines URL path mappings:

- `/` → Root directory listing
- `/hero` → `apps/landing-hero-focused/index.html`
- `/grid` → `apps/landing-grid-showcase/index.html`
- `/minimal` → `apps/landing-minimal-clean/index.html`
- `/gamified` → `apps/landing-gamified-interactive/index.html`
- `/video` → `apps/landing-video-story/index.html`
- `/wizard` → `apps/landing-wizard-academy/index.html`
- `/3d-manan` → `apps/landing-3d-manan/index.html`
- `/claude-manan` → `apps/landing-claude-manan/index.html`
- `/claude-manan/math-cosmos` → `apps/landing-claude-manan/math_cosmos_landing.html`

### Build Process Flow

1. `build.sh` creates `public-build/` directories for each app route
2. App files are copied from `apps/landing-*/` to `public-build/{route}/`
3. Shared assets from `public/assets/` are copied to `public-build/assets/`
4. Root `index.html` and `vercel.json` are copied
5. `public-build/` is renamed to `public/`
6. Vercel automatically builds and deploys when changes are pushed

## Adding a New Landing Page

When creating a new landing page:

1. **Create app directory:**
   ```bash
   mkdir -p apps/landing-your-name
   ```

2. **Add your files:**
   ```
   apps/landing-your-name/
   ├── index.html
   ├── styles.css
   └── (other assets)
   ```

3. **Update `build.sh`:**
   ```bash
   # Add in mkdir section
   mkdir -p public-build/your-route

   # Add in copy section
   cp -r apps/landing-your-name/* public-build/your-route/
   ```

4. **Update `vercel.json`:**
   ```json
   {
     "source": "/your-route",
     "destination": "/your-route/index.html"
   }
   ```

5. **Commit and push** - Vercel will automatically deploy

## Style Guide and Conventions

### HTML/CSS Standards

Following [Udacity HTML/CSS Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/):

- Use lowercase for element names
- Close all elements
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`)
- Include `alt` text for all images
- Use 2 spaces for indentation (not tabs)
- CSS class names: lowercase with hyphens (e.g., `hero-section`)
- Mobile-first responsive design

### Git Commit Message Format

Following [Udacity Git Style Guide](https://udacity.github.io/git-styleguide/):

```
type(scope): subject line (max 50 chars)

Body explaining what and why, not how.
Wrap at 72 characters per line.

- Bullet points for multiple changes
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Scopes:** Use landing page name (e.g., `landing-hero-focused`)

**Example:**
```
feat(landing-hero-focused): add Spanish language toggle

Added language selector in navigation bar that switches
between English and Spanish content.

- Added language toggle button to nav
- Implemented Spanish translations for hero section
- Updated CTA buttons with bilingual support
```

### Branch Naming Convention

```
landing-{PAGE_NAME}/{feature-description}
```

Examples:
- `landing-hero-focused/update-cta-button`
- `landing-grid-showcase/fix-card-aspect-ratio`
- `landing-minimal-clean/add-dark-mode`

## Accessibility Requirements

All landing pages must meet WCAG 2.1 AA standards:

- Include skip links for keyboard navigation
- Use semantic HTML5 elements
- Provide alt text for all images
- Ensure sufficient color contrast
- Support keyboard navigation
- Include ARIA labels where needed
- Test with screen readers

## Development Workflow

### Isolation Strategy

**Golden Rule:** Only edit files in your assigned landing page folder. Never modify other team members' folders.

```bash
✅ apps/landing-hero-focused/index.html
✅ apps/landing-hero-focused/styles.css
❌ apps/landing-grid-showcase/anything.html  # Don't touch!
```

### Testing Before Commit

Test in multiple browsers:
- Chrome
- Firefox
- Safari (on Mac)
- Mobile view (Chrome DevTools)

### Typical Development Flow

```bash
# 1. Create branch
git checkout -b landing-hero-focused/new-feature

# 2. Make changes in your folder
# Edit apps/landing-hero-focused/...

# 3. Test locally
npx serve apps/landing-hero-focused

# 4. Commit with descriptive message
git add apps/landing-hero-focused/
git commit -m "feat(landing-hero-focused): add new feature"

# 5. Push and create PR
git push origin landing-hero-focused/new-feature

# 6. Vercel will auto-deploy on push
```

## Vercel Deployment

### Vercel Configuration

The `vercel.json` file contains:

- **Build command:** `bash build.sh`
- **Output directory:** `public`
- **Rewrites:** URL path mappings for each landing page
- **Headers:** Cache control for static assets

### Deployment Triggers

Automatic deployment occurs when:
- Push to any branch connected to Vercel
- Manual deployment via Vercel CLI or dashboard
- Pull request creation (preview deployments)

### Cache Strategy

Vercel uses cache headers defined in `vercel.json`:

- **Static assets (`/assets/*`):** `Cache-Control: public, max-age=31536000, immutable`

### Preview Deployments

Every pull request gets its own preview URL for testing before merging.

## Game Data Architecture

### Game Catalog (`data/games.ts`)

The `games.ts` file exports a TypeScript array of game objects organized by grade level (K-8). Each game includes:

- `id` - Unique identifier
- `path` - Game URL (uses `PPL_GAMES_URL` constant)
- `image` - Screenshot/thumbnail path
- `grade` - Grade level (K-8)
- `title` / `titleEs` - English/Spanish titles
- `description` / `descriptionEs` - English/Spanish descriptions
- `scormUrl` - SCORM package URL (optional)
- `disabled` - Boolean flag for unavailable games

Games are referenced by landing pages to display available content per grade level.

### SCORM Metadata (`data/scorm.json`)

Contains SCORM package metadata for LMS integration.

## Bilingual Support

All landing pages support English and Spanish:

- Use `title` / `titleEs` for titles
- Use `description` / `descriptionEs` for descriptions
- Texas-specific titles use `txTitle` / `txTitleEs` prefixes
- Language toggle functionality should be implemented per landing page

## Important Notes

- The `public/` directory is generated by `build.sh` and should NOT be committed to git
- Each landing page is completely independent - no shared JavaScript or CSS dependencies
- The root `index.html` provides a directory listing of all available landing pages
- `vercel.json` contains routing configuration and is used by Vercel for deployment
- Vercel is the primary deployment method
- Preview deployments are automatically created for pull requests
