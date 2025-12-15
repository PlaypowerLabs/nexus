# Deployment Guide

## Quick Start

All landing pages are deployed to Vercel:
- **Vercel**: Production and preview deployments
- **Auto-Deploy**: Push to any connected branch triggers automatic deployment
- **Preview URLs**: Each pull request gets its own preview URL

## Available Paths

- `/` → Landing pages directory (lists all available pages)
- `/minimal` → Minimal Clean landing page
- `/grid` → Grid Showcase landing page
- `/hero` → Hero Focused landing page
- `/gamified` → Gamified Interactive landing page
- `/video` → Video Story landing page

**Note:** The root path (`/`) automatically displays all available landing pages by reading from `vercel.json`. No manual updates needed when adding new pages!

---

## Initial Setup

Before deploying, connect to Vercel:

1. **Install Vercel CLI** (optional): `npm i -g vercel`
2. **Connect repository** to Vercel via Vercel dashboard or CLI
3. **Configure build settings** in Vercel dashboard:
   - Build Command: `bash build.sh`
   - Output Directory: `public`
4. **Test deployment** by pushing to any connected branch

---

## Adding a New Landing Page

### Step 1: Create the App Directory

Create a new directory in `apps/` with your landing page files:

```bash
mkdir -p apps/landing-your-name
```

### Step 2: Add Your Files

Add your `index.html`, `styles.css`, and any other assets to the new directory:

```
apps/landing-your-name/
  ├── index.html
  ├── styles.css
  └── (other assets)
```

### Step 3: Update build.sh

Add a new line to copy your app in `build.sh`:

```bash
# Add this line in the mkdir section
mkdir -p public-build/your-path

# Add this line in the copy section
cp -r apps/landing-your-name/* public-build/your-path/
```

**Example:**
```bash
mkdir -p public-build/dashboard
cp -r apps/landing-dashboard/* public-build/dashboard/
```

### Step 4: Update vercel.json

Add a new rewrite rule in `vercel.json`:

```json
{
  "source": "/your-path",
  "destination": "/your-path/index.html"
}
```

**Example:**
```json
{
  "source": "/dashboard",
  "destination": "/dashboard/index.html"
}
```

### Step 5: Deploy

Commit and push your changes:

```bash
git add .
git commit -m "Add new landing page: your-name"
git push origin your-branch-name
```

Vercel will automatically deploy. The new path will be available at your Vercel deployment URL:
- Production: `https://your-project.vercel.app/your-path`
- Preview: `https://your-deployment-hash.vercel.app/your-path`

---

## Updating an Existing Landing Page

### Step 1: Edit Files

Edit the files in the corresponding app directory:

```
apps/landing-minimal-clean/
  ├── index.html      ← Edit this
  ├── styles.css      ← Edit this
  └── (other files)
```

### Step 2: Test Locally (Optional)

You can test locally using the serve scripts in `package.json`:

```bash
npm run serve:minimal  # For minimal-clean
npm run serve:grid     # For grid-showcase
npm run serve:hero     # For hero-focused
```

Or build and serve locally:

```bash
bash build.sh
npx serve public
```

### Step 3: Deploy

Commit and push your changes:

```bash
git add .
git commit -m "Update landing page: minimal-clean"
git push origin your-branch-name
```

Changes will be automatically deployed by Vercel.

---

## Manual Deployment

### Option 1: Vercel Dashboard

1. Go to your Vercel dashboard
2. Select your project
3. Click **"Deployments"** tab
4. Click **"Redeploy"** on any deployment
5. Choose to use existing build cache or rebuild

### Option 2: Vercel CLI

```bash
# Install Vercel CLI (if needed)
npm i -g vercel

# Deploy to production
vercel --prod

# Deploy preview
vercel

# Check deployment status
vercel ls
```

---

## File Structure

```
nexus-landing/
├── apps/                          # Source files for each landing page
│   ├── landing-minimal-clean/
│   ├── landing-grid-showcase/
│   ├── landing-hero-focused/
│   ├── landing-gamified-interactive/
│   └── landing-video-story/
├── public/                        # Generated during build (gitignored)
│   ├── minimal/
│   ├── grid/
│   ├── hero/
│   ├── gamified/
│   └── video/
├── vercel.json                    # Vercel configuration
├── vercel.json.example            # Vercel config template
├── build.sh                       # Build script (copies apps to public/)
└── package.json
```

---

## How It Works

1. **Build Process**: `build.sh` copies files from `apps/` to `public/` directory
2. **Routing**: `vercel.json` defines URL paths and rewrites
3. **Deployment**: Vercel automatically builds and deploys on push
4. **CDN**: Vercel Edge Network serves content globally
5. **Auto-Deploy**: Pushing to any connected branch automatically triggers deployment
6. **Preview**: Pull requests get automatic preview deployments

---

## Troubleshooting

### Path not working?

1. Check that the path exists in `vercel.json` rewrites
2. Verify the directory exists in `build.sh`
3. Check Vercel deployment logs
4. Verify build completed successfully

### Changes not showing?

1. Wait for Vercel deployment to complete
2. Clear browser cache or use incognito mode
3. Check deployment status in Vercel dashboard
4. Verify files were committed and pushed

### Build failing?

1. Check `build.sh` syntax
2. Verify all app directories exist
3. Check Vercel build logs for specific errors
4. Verify build command and output directory in vercel.json

### Preview deployment not working?

1. Check that the branch is connected to Vercel
2. Verify pull request is open
3. Check Vercel dashboard for deployment status
4. Ensure vercel.json configuration is correct

---

## Notes

- The `public/` directory is generated during build and should not be committed to git
- Each landing page is independent - update one without affecting others
- All landing pages share the same domain and assets from `public/assets/`
- Vercel provides automatic HTTPS and global CDN
- Preview deployments are created for all pull requests
- Environment variables can be configured in Vercel dashboard

---

## Vercel Features

**Included:**
- Automatic HTTPS
- Global CDN (Edge Network)
- Instant rollbacks
- Preview deployments for PRs
- Zero-config deployment
- Built-in analytics (optional)

**Free Tier:**
- 100GB bandwidth per month
- Unlimited deployments
- Automatic preview deployments
- **Cost: Free for hobby projects**
