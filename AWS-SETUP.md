# AWS Setup Guide - Step by Step

Complete guide to set up AWS infrastructure for deploying landing pages.

## Prerequisites

- AWS Account (create at https://aws.amazon.com)
- AWS CLI installed (optional, for local testing)

---

## Step 1: Create S3 Bucket

### Option A: Using AWS Console

1. Go to [AWS S3 Console](https://console.aws.amazon.com/s3/)
2. Click **"Create bucket"**
3. Configure:
   - **Bucket name**: `nexus-landing-pages`
   - **Region**: `us-east-1`
   - **Block Public Access**: **Uncheck** "Block all public access" (check the acknowledgment)
   - **Bucket Versioning**: Disable (optional)
   - **Default encryption**: Enable (optional, recommended)
4. Click **"Create bucket"**

### Option B: Using AWS CLI

```bash
aws s3 mb s3://nexus-landing-pages --region us-east-1
```

---

## Step 2: Enable Static Website Hosting

### Using AWS Console

1. Open your bucket `nexus-landing-pages`
2. Go to **"Properties"** tab
3. Scroll to **"Static website hosting"**
4. Click **"Edit"**
5. Configure:
   - **Static website hosting**: Enable
   - **Hosting type**: Host a static website
   - **Index document**: `index.html`
   - **Error document**: `index.html`
6. Click **"Save changes"**
7. **Note the website endpoint URL** (e.g., `nexus-landing-pages.s3-website-us-east-1.amazonaws.com`)

### Using AWS CLI

```bash
aws s3 website s3://nexus-landing-pages \
  --index-document index.html \
  --error-document index.html
```

---

## Step 3: Set Bucket Policy (Public Read Access)

### Using AWS Console

1. Go to **"Permissions"** tab
2. Scroll to **"Bucket policy"**
3. Click **"Edit"**
4. Paste this policy (replace `nexus-landing-pages` if different):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::nexus-landing-pages/*"
    }
  ]
}
```

5. Click **"Save changes"**

### Using AWS CLI

Save the policy to `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::nexus-landing-pages/*"
    }
  ]
}
```

Then apply:

```bash
aws s3api put-bucket-policy \
  --bucket nexus-landing-pages \
  --policy file://bucket-policy.json
```

---

## Step 4: Create IAM User for GitHub Actions

### Using AWS Console

1. Go to [IAM Console](https://console.aws.amazon.com/iam/)
2. Click **"Users"** → **"Create user"**
3. **User name**: `github-actions-nexus-landing`
4. Click **"Next"**
5. **Set permissions**: Select **"Attach policies directly"**
6. Search and select:
   - `AmazonS3FullAccess` (or create custom policy with only needed permissions)
   - `CloudFrontFullAccess` (for CloudFront cache invalidation)
7. Click **"Next"** → **"Create user"**
8. Click on the user → **"Security credentials"** tab
9. Click **"Create access key"**
10. Select **"Application running outside AWS"**
11. Click **"Next"** → **"Create access key"**
12. **IMPORTANT**: Copy and save:
    - **Access key ID**
    - **Secret access key** (shown only once!)

---

## Step 5: Create CloudFront Distribution

### Using AWS Console

1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Click **"Create distribution"**
3. **Origin domain**: Select your S3 bucket endpoint (NOT the website endpoint, use the regular S3 endpoint like `nexus-landing-pages.s3.us-east-1.amazonaws.com`)
4. **Origin access**: Select **"Origin access control settings (recommended)"**
   - Click **"Create control setting"**
   - Name: `nexus-landing-oac`
   - Signing behavior: **Sign requests**
   - Click **"Create"**
5. **Default cache behavior**:
   - Viewer protocol policy: **Redirect HTTP to HTTPS**
   - Allowed HTTP methods: **GET, HEAD, OPTIONS**
   - Cache policy: **CachingOptimized** (or **CachingDisabled** for development)
6. **Distribution settings**:
   - **Price class**: Use all edge locations (or select cheaper option)
   - **Alternate domain names (CNAMEs)**: Leave empty (no custom domain yet)
   - **Default root object**: `index.html`
7. Click **"Create distribution"**
8. **Wait 5-10 minutes** for distribution to deploy
9. **Note the Distribution ID** and **Domain name** (e.g., `d1234567890abc.cloudfront.net`)

### Update S3 Bucket Policy for CloudFront

After creating CloudFront, you need to update the S3 bucket policy to allow CloudFront access:

1. Go back to S3 bucket → **"Permissions"** → **"Bucket policy"**
2. Replace the policy with this (get the OAC ID from CloudFront origin settings):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::nexus-landing-pages/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

Replace:
- `YOUR_ACCOUNT_ID`: Your AWS account ID (find in IAM console)
- `YOUR_DISTRIBUTION_ID`: Your CloudFront distribution ID

---

## Step 6: Configure GitHub Secrets

1. Go to your GitHub repository
2. Click **"Settings"** → **"Secrets and variables"** → **"Actions"**
3. Click **"New repository secret"** and add:

| Secret Name | Value | Where to Find |
|------------|-------|---------------|
| `AWS_ACCESS_KEY_ID` | Your IAM user access key ID | Step 4, item 12 |
| `AWS_SECRET_ACCESS_KEY` | Your IAM user secret access key | Step 4, item 12 |
| `AWS_REGION` | `us-east-1` | Your chosen region |
| `S3_BUCKET_NAME` | `nexus-landing-pages` | Your bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID` | Your CloudFront distribution ID | Step 5, item 9 |

---

## Step 7: Test Setup

### Test S3 Upload (Optional)

```bash
# Build locally
bash build.sh

# Upload to S3
aws s3 sync public/ s3://nexus-landing-pages/ --delete

# Test website
# Visit: http://nexus-landing-pages.s3-website-us-east-1.amazonaws.com
```

### Test CloudFront (After distribution is ready)

Visit your CloudFront domain: `https://YOUR_DISTRIBUTION_ID.cloudfront.net`

---

## Verification Checklist

- [ ] S3 bucket created: `nexus-landing-pages`
- [ ] Static website hosting enabled
- [ ] Bucket policy set for public/CloudFront access
- [ ] IAM user created with access keys
- [ ] CloudFront distribution created
- [ ] S3 bucket policy updated for CloudFront OAC
- [ ] All GitHub Secrets configured
- [ ] Test upload works (optional)

---

## Troubleshooting

### 403 Forbidden Error

- Check bucket policy allows public/CloudFront access
- Verify static website hosting is enabled
- Check CloudFront origin access control settings

### CloudFront Shows Old Content

- Wait 5-10 minutes for propagation
- Create cache invalidation: `/` and `/*`
- Or wait for TTL to expire

### GitHub Actions Failing

- Verify all secrets are set correctly
- Check IAM user has required permissions
- Review GitHub Actions logs for specific errors

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

---

## Next Steps

After completing this setup:
1. Push code to `main` branch
2. GitHub Actions will automatically deploy
3. Visit your CloudFront URL to see the site

For manual deployment, see `DEPLOYMENT.md`.


