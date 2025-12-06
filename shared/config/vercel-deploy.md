# Vercel Deployment Guide

## 🚀 Setup Instructions

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy Each Landing Page

For each landing page folder, run:

```bash
# Landing Hero Focused
cd apps/landing-hero-focused
vercel --prod

# Landing Grid Showcase
cd apps/landing-grid-showcase
vercel --prod

# Landing Minimal Clean
cd apps/landing-minimal-clean
vercel --prod
```

### 4. Configure Git Integration

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. For **Root Directory**, set to the specific landing page folder:
   - `apps/landing-hero-focused`
   - `apps/landing-grid-showcase`
   - `apps/landing-minimal-clean`
   - `apps/landing-gamified-interactive` (when ready)
   - `apps/landing-video-story` (when ready)

5. Deploy settings:
   - **Framework Preset**: Other
   - **Build Command**: (leave empty)
   - **Output Directory**: `.`
   - **Install Command**: (leave empty)

### 5. Auto-Deployment Settings

Once connected:
- ✅ Every push to `main` → Auto-deploys to production
- ✅ Every push to other branches → Creates preview deployment
- ✅ Every PR → Gets its own preview URL

## 📋 Expected URLs

After setup, you'll have:
- `landing-hero-focused.vercel.app`
- `landing-grid-showcase.vercel.app`
- `landing-minimal-clean.vercel.app`
- `landing-gamified-interactive.vercel.app` (future)
- `landing-video-story.vercel.app` (future)

## 🔄 Branch Strategy

### Main Branch
- Production-ready code
- Auto-deploys to production URLs

### Feature Branches
```bash
git checkout -b landing-hero-focused/update-cta
# Make changes
git push origin landing-hero-focused/update-cta
```
- Creates preview deployment
- URL: `landing-hero-focused-git-update-cta.vercel.app`

## 🎯 For Non-Technical Team Members

### Option 1: GitHub Web Editor
1. Go to GitHub.com
2. Navigate to file
3. Click pencil icon to edit
4. Make changes
5. Commit (write message)
6. Wait ~1 minute for deployment!

### Option 2: GitHub Desktop
1. Open GitHub Desktop
2. Click "Fetch origin"
3. Edit files in your code editor
4. See changes in GitHub Desktop
5. Write commit message
6. Click "Commit to main"
7. Click "Push origin"
8. Deployment automatic!

## 🔍 Checking Deployment Status

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your project
3. Click on it
4. See "Deployments" tab
5. Each deployment shows:
   - Status (Building/Ready/Error)
   - Branch name
   - Commit message
   - Preview URL

## 🛠️ Troubleshooting

### Deployment Failed?
- Check the build logs in Vercel dashboard
- Ensure file paths are correct
- Verify HTML/CSS syntax

### Wrong URL?
- Check "Root Directory" in project settings
- Should point to specific `apps/landing-*` folder

### Not Auto-Deploying?
- Verify Git integration is connected
- Check deployment settings in Vercel
- Ensure branch is not ignored

## 📞 Need Help?

Contact the dev team or check:
- [Vercel Documentation](https://vercel.com/docs)
- Project README in repository root

