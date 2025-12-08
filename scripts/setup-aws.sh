#!/bin/bash
# AWS Infrastructure Setup Script
# This script helps set up S3 bucket and CloudFront for deployment

set -e

BUCKET_NAME="nexus-landing-pages"
REGION="us-east-1"

echo "🚀 Setting up AWS infrastructure for nexus-landing-pages..."
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed."
    echo "Install it from: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured."
    echo "Run: aws configure"
    exit 1
fi

echo "✅ AWS CLI configured"
echo ""

# Step 1: Create S3 bucket
echo "📦 Creating S3 bucket: $BUCKET_NAME"
if aws s3 ls "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'; then
    aws s3 mb "s3://$BUCKET_NAME" --region "$REGION"
    echo "✅ Bucket created"
else
    echo "⚠️  Bucket already exists"
fi
echo ""

# Step 2: Enable static website hosting
echo "🌐 Enabling static website hosting..."
aws s3 website "s3://$BUCKET_NAME" \
    --index-document index.html \
    --error-document index.html
echo "✅ Static website hosting enabled"
echo ""

# Step 3: Set bucket policy for public read
echo "🔓 Setting bucket policy for public read access..."
cat > /tmp/bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy \
    --bucket "$BUCKET_NAME" \
    --policy file:///tmp/bucket-policy.json
echo "✅ Bucket policy set"
echo ""

# Step 4: Remove public access block
echo "🔓 Removing public access block..."
aws s3api put-public-access-block \
    --bucket "$BUCKET_NAME" \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
echo "✅ Public access enabled"
echo ""

# Get website endpoint
WEBSITE_ENDPOINT="http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo "✅ Setup complete!"
echo ""
echo "📍 S3 Website Endpoint: $WEBSITE_ENDPOINT"
echo ""
echo "📝 Next steps:"
echo "1. Create CloudFront distribution (see AWS-SETUP.md)"
echo "2. Create IAM user for GitHub Actions (see AWS-SETUP.md)"
echo "3. Configure GitHub Secrets (see AWS-SETUP.md)"
echo ""

# Cleanup
rm -f /tmp/bucket-policy.json


