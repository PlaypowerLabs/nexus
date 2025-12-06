# 🎮 K-8 Math Games - Landing Pages Portfolio

A collection of independent landing page designs for educational math games (Grades K-8).

## 📁 Repository Structure

```
nexus/
├── apps/                                    # Independent landing pages
│   ├── landing-hero-focused/               # Hero-first design
│   ├── landing-grid-showcase/              # Game grid layout
│   ├── landing-minimal-clean/              # Accessible, minimal design
│   ├── landing-gamified-interactive/       # (To be developed)
│   └── landing-video-story/                # (To be developed)
│
├── shared/                                  # Shared resources
│   ├── assets/                             # Common images/fonts
│   └── config/                             # Configuration & guides
│
└── docs/                                    # Documentation
```

## 🚀 Quick Start

### For Developers

```bash
# Clone repository
git clone <repository-url>
cd nexus

# Each landing page is independent - just open the HTML file
open apps/landing-hero-focused/index.html

# Or serve with any static server
npx serve apps/landing-hero-focused
```

### For Non-Technical Team Members

See [Vercel Deployment Guide](shared/config/vercel-deploy.md) for step-by-step instructions.

## 🎨 Landing Page Variants

### 1. Hero-Focused Landing ✅ Complete
**Location:** `apps/landing-hero-focused/`
- Large hero section with gradient background
- Animated preview cards
- Focus on emotional appeal and engagement
- Target: Parents and younger students (K-5)

### 2. Grid Showcase Landing ✅ Complete
**Location:** `apps/landing-grid-showcase/`
- Game catalog with filter/sort options
- Grade-level badges
- Ratings and play counts
- Target: All ages, browsing-focused users

### 3. Minimal Clean Landing ✅ Complete
**Location:** `apps/landing-minimal-clean/`
- Accessibility-first design
- WCAG 2.1 AA compliant
- Screen reader optimized
- Target: Educators, accessibility-conscious users

### 4. Gamified Interactive Landing 🚧 Planned
**Location:** `apps/landing-gamified-interactive/`
- Animations and interactions
- Character mascots
- Particle effects
- Target: Younger students who respond to visual stimulation

### 5. Video Story Landing 🚧 Planned
**Location:** `apps/landing-video-story/`
- Video-driven narrative
- Student testimonials
- Success stories
- Target: Decision-making parents and educators

## 🌐 Deployment

Each landing page is deployed independently on Vercel:

- **Hero-Focused:** `landing-hero-focused.vercel.app`
- **Grid Showcase:** `landing-grid-showcase.vercel.app`
- **Minimal Clean:** `landing-minimal-clean.vercel.app`

### Auto-Deployment Workflow

1. Push to `main` branch → Production deployment
2. Create feature branch → Preview deployment
3. Open PR → Automatic preview URL

See [detailed deployment guide](shared/config/vercel-deploy.md).

## 🔧 Development Workflow

### Creating a New Landing Page

```bash
# 1. Create new branch
git checkout -b landing-YOUR-NAME/initial-setup

# 2. Create folder
mkdir apps/landing-YOUR-NAME

# 3. Add your HTML/CSS/JS files
cd apps/landing-YOUR-NAME
touch index.html styles.css

# 4. Create vercel.json
cat > vercel.json << EOF
{
  "version": 2,
  "buildCommand": null,
  "outputDirectory": ".",
  "framework": null
}
EOF

# 5. Commit and push
git add .
git commit -m "feat(landing-YOUR-NAME): add initial landing page"
git push origin landing-YOUR-NAME/initial-setup
```

### Updating Existing Landing Page

```bash
# 1. Create feature branch
git checkout -b landing-hero-focused/update-cta

# 2. Make changes
# Edit files in apps/landing-hero-focused/

# 3. Commit with descriptive message
git add apps/landing-hero-focused/
git commit -m "feat(landing-hero-focused): update CTA button copy"
git push origin landing-hero-focused/update-cta

# 4. Vercel automatically creates preview URL
```

## 📐 Code Style Guide

Following [Udacity HTML/CSS Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/):

### HTML
- Use lowercase for element names
- Close all elements
- Use semantic HTML5 elements
- Include `alt` text for images
- Proper indentation (2 spaces)

### CSS
- Use lowercase with hyphens for class names
- Group related properties
- Use shorthand properties where possible
- Add comments for major sections
- Mobile-first responsive design

### Git Commits
Follow [Udacity Git Commit Message Style Guide](https://udacity.github.io/git-styleguide/):

```
type: subject line (max 50 chars)

Body explaining what and why (max 72 chars per line)

- Bullet points for details
- Each change on separate line
```

**Types:** feat, fix, docs, style, refactor, test, chore

## 🤝 Contributing

### For Developers

1. Follow folder-based strategy (one folder per landing page)
2. Never edit other team members' folders
3. Use descriptive branch names: `landing-NAME/feature-description`
4. Write clear commit messages following Udacity style guide
5. Test on multiple devices before pushing

### For Non-Developers

1. Use GitHub web editor for text changes
2. Use GitHub Desktop for file uploads
3. Write clear commit messages
4. Preview changes before committing

## 🎯 Project Goals

- ✅ Independent landing pages (no shared dependencies)
- ✅ Zero-conflict development (separate folders)
- ✅ Automatic deployments (Vercel integration)
- ✅ Multiple design approaches (A/B testing)
- ✅ Accessibility-first design
- ✅ Bilingual support (EN/ES)

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Udacity HTML/CSS Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/)
- [Udacity Git Style Guide](https://udacity.github.io/git-styleguide/)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 📝 License

Educational use only. Copyright © 2024

## 🐛 Issues & Support

- Create GitHub Issues for bugs
- Tag issues with landing page name
- Include screenshots for visual issues
- Check existing issues before creating new ones

---

**Last Updated:** December 2024  
**Status:** Active Development
