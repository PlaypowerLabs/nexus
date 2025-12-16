# 🎮 Nexus - Landing Pages Playground

A minimal landing pages repository for rapid prototyping and deploying landing page designs to Vercel. Built for experimentation with Claude Code.

## 🚀 Quick Start

```bash
# Clone and view
git clone <repository-url>
cd nexus

# Build all pages
bash build.sh

# View locally
cd public && python3 -m http.server 8000
# Open http://localhost:8000
```

## 📁 Structure

```
nexus/
├── apps/                           # Landing page sources
│   ├── landing-games-dashboard/    # Games catalog with filters
│   └── landing-3d-manan/          # 3D space-themed page
├── public/                         # Build output (auto-generated)
├── build.sh                        # Build script
├── vercel.json                     # Deployment config
├── landing-pages-registry.json     # Page metadata
├── index.html                      # Root table view
└── claude.md                       # 📖 Full instructions
```

## 🎨 Current Landing Pages

| Path | Name | Description |
|------|------|-------------|
| `/games-dashboard` | Games Dashboard | Interactive K-8 math games catalog |
| `/3d-manan` | 3D Space Theme | Three.js 3D interactive experience |

View all pages at the root `/` path - displays a sortable table with metadata.

## ➕ Adding New Pages

**Quick version:**
1. Create folder: `apps/landing-[name]/`
2. Update `build.sh`, `vercel.json`, `landing-pages-registry.json`
3. Run `bash build.sh`
4. Commit and push

**Full instructions:** See [claude.md](./claude.md) for complete step-by-step guide.

## 🤖 For Claude Code

This repository is optimized for Claude Code development. Read [claude.md](./claude.md) for:
- Complete workflow instructions
- How to add new landing pages
- Git branching requirements
- Creating GitHub PRs
- Vercel deployment details

## 🌐 Deployment

**Vercel (Automatic):**
- Deploys on push to `main`
- Preview deployments for all PRs
- Build command: `bash build.sh`
- Output: `public/`

**Manual Deploy:**
```bash
npm i -g vercel
vercel --prod
```

## 📚 Documentation

- **[claude.md](./claude.md)** - Complete guide for Claude Code and developers
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment details
- **[AWS-SETUP.md](./AWS-SETUP.md)** - AWS S3 setup (optional)
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines

## 🎯 Features

- ✅ Minimal setup - only 2 landing pages
- ✅ Self-contained HTML pages
- ✅ Registry-based metadata system
- ✅ Automatic Vercel deployment
- ✅ Table view of all pages at root
- ✅ Claude Code optimized workflow

## 🔧 Key Files

| File | Purpose |
|------|---------|
| `apps/landing-*/index.html` | Landing page source files |
| `build.sh` | Copies pages to public/ |
| `vercel.json` | Routes and build config |
| `landing-pages-registry.json` | Metadata for all pages |
| `index.html` | Root page table view |
| `claude.md` | Full instructions |

## 📝 Git Workflow

```bash
# Branch naming (IMPORTANT!)
git checkout -b claude/feature-name-[session-id]

# Make changes, then commit
git add .
git commit -m "feat: add new landing page"

# Push
git push -u origin claude/feature-name-[session-id]

# Create PR
gh pr create --title "Title" --body "Description"
```

## 🤝 Contributing

1. Read [claude.md](./claude.md) for complete instructions
2. Follow the 5-step process for new pages
3. Test with `bash build.sh` before pushing
4. Use conventional commit messages
5. Update registry metadata

## 📊 Registry System

All landing pages are tracked in `landing-pages-registry.json`:
- Name, path, description
- Owner and dates
- Tags for categorization
- Powers the root table view

## 🐛 Troubleshooting

- **Build fails?** Check paths in `build.sh`
- **404 errors?** Verify route in `vercel.json`
- **Images missing?** Use `/assets/` paths
- **Registry not showing?** Check JSON syntax

Full troubleshooting: [claude.md](./claude.md#troubleshooting)

## 📖 Philosophy

Keep it minimal. Each landing page is:
- Self-contained (inline CSS/JS preferred)
- Independently deployable
- Easy to add/remove
- Metadata-driven

## 🎨 Design Guidelines

- Mobile-first responsive
- Self-contained when possible
- Use `/assets/` for shared resources
- Keep initial load fast
- Follow naming conventions

See [claude.md](./claude.md#design-guidelines) for details.

---

**For full instructions, workflows, and examples, see [claude.md](./claude.md)**

**Status:** Active Development
**Last Updated:** December 2024
**License:** Educational use only
