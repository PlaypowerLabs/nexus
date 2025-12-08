# Deployment Guide

## Quick Start

All landing pages are deployed to AWS S3 with CloudFront CDN:
- **S3 Website**: `http://nexus-landing-pages.s3-website-us-east-1.amazonaws.com`
- **CloudFront**: `https://YOUR_DISTRIBUTION_ID.cloudfront.net` (after setup)
- **Auto-Deploy**: Push to `main` branch triggers GitHub Actions deployment

## Available Paths

- `/` → Landing pages directory (lists all available pages)
- `/minimal` → Minimal Clean landing page
- `/grid` → Grid Showcase landing page
- `/hero` → Hero Focused landing page
- `/gamified` → Gamified Interactive landing page
- `/video` → Video Story landing page

**Note:** The root path (`/`) automatically displays all available landing pages by reading from `vercel.json.example`. No manual updates needed when adding new pages!

---

## Initial Setup

Before deploying, complete the AWS setup:

1. **Follow `AWS-SETUP.md`** for complete AWS infrastructure setup
2. **Configure GitHub Secrets** (see AWS-SETUP.md Step 6)
3. **Test deployment** by pushing to `main` branch

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

### Step 4: Update vercel.json.example

Add a new rewrite rule in `vercel.json.example` (for reference, used by root index.html):

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

**Note:** Also copy `vercel.json.example` to `vercel.json` in the build output (already handled by build.sh)

### Step 5: Deploy

Commit and push your changes:

```bash
git add .
git commit -m "Add new landing page: your-name"
git push origin main
```

GitHub Actions will automatically deploy to AWS S3. The new path will be available at:
- `http://nexus-landing-pages.s3-website-us-east-1.amazonaws.com/your-path`
- `https://YOUR_DISTRIBUTION_ID.cloudfront.net/your-path`

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
git push origin main
```

Changes will be automatically deployed to AWS S3 via GitHub Actions.

---

## Manual Deployment

### Option 1: GitHub Actions UI

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. Select **"Deploy to AWS S3"** workflow
4. Click **"Run workflow"**
5. Select branch (default: `main`)
6. Click **"Run workflow"**

### Option 2: AWS CLI (Local)

```bash
# Build the project
bash build.sh

# Deploy to S3
aws s3 sync public/ s3://nexus-landing-pages/ --delete

# Invalidate CloudFront cache (if using)
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
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
├── .github/workflows/             # GitHub Actions workflows
│   └── deploy-aws.yml
├── scripts/
│   └── setup-aws.sh              # AWS infrastructure setup script
├── build.sh                       # Build script (copies apps to public/)
├── vercel.json.example            # Routing configuration (archived from Vercel)
├── aws-config.json                # AWS configuration reference
└── package.json
```

---

## How It Works

1. **Build Process**: `build.sh` copies files from `apps/` to `public/` directory
2. **Routing**: `vercel.json.example` defines URL paths (used by root index.html)
3. **Deployment**: GitHub Actions syncs `public/` directory to S3
4. **CDN**: CloudFront serves content globally with caching
5. **Auto-Deploy**: Pushing to `main` branch automatically triggers deployment

---

## Troubleshooting

### Path not working?

1. Check that the path exists in `vercel.json.example` rewrites
2. Verify the directory exists in `build.sh`
3. Check GitHub Actions build logs
4. Verify files were uploaded to S3: `aws s3 ls s3://nexus-landing-pages/your-path/`

### Changes not showing?

1. Wait for GitHub Actions deployment to complete
2. Clear browser cache or use incognito mode
3. If using CloudFront, wait for cache invalidation (or create manual invalidation)
4. Check that files were committed and pushed

### Build failing?

1. Check `build.sh` syntax
2. Verify all app directories exist
3. Check GitHub Actions logs for specific errors
4. Verify AWS credentials are set correctly in GitHub Secrets

### 403 Forbidden Error?

1. Check S3 bucket policy allows public/CloudFront access
2. Verify static website hosting is enabled
3. Check CloudFront origin access control settings
4. See `AWS-SETUP.md` for bucket policy configuration

### CloudFront showing old content?

1. Wait 5-10 minutes for propagation
2. Create cache invalidation: `aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"`
3. Or wait for TTL to expire

---

## GitHub Secrets Required

Ensure these secrets are configured in GitHub (Settings → Secrets and variables → Actions):

- `AWS_ACCESS_KEY_ID` - IAM user access key
- `AWS_SECRET_ACCESS_KEY` - IAM user secret key
- `AWS_REGION` - AWS region (default: `us-east-1`)
- `S3_BUCKET_NAME` - S3 bucket name (default: `nexus-landing-pages`)
- `CLOUDFRONT_DISTRIBUTION_ID` - CloudFront distribution ID (optional)

See `AWS-SETUP.md` for detailed setup instructions.

---

## Notes

- The `public/` directory is generated during build and should not be committed to git
- Each landing page is independent - update one without affecting others
- All landing pages share the same domain and assets from `public/assets/`
- CloudFront cache invalidation happens automatically on deployment
- HTML/JSON files are uploaded with `no-cache` headers for immediate updates

---

## Cost Estimate

**Free Tier (First Year):**
- S3: 5GB storage, 20,000 GET requests
- CloudFront: 1TB data transfer, 10M requests
- **Estimated cost: $0/month**

**After Free Tier:**
- S3: ~$0.023/GB storage, ~$0.0004 per 1,000 requests
- CloudFront: ~$0.085/GB data transfer
- **Estimated cost: < $1/month for small sites**
