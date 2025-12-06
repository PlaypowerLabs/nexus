# Contributing Guide

Thank you for contributing to the K-8 Math Games Landing Pages project!

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Style Guides](#style-guides)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Keep discussions professional

## 🚀 Getting Started

### Prerequisites

- Git installed
- Text editor (VS Code, Sublime, etc.)
- Basic HTML/CSS knowledge (for developers)
- GitHub account

### Repository Structure

Each landing page lives in its own independent folder:

```
apps/
  landing-hero-focused/       ← Team A works here
  landing-grid-showcase/      ← Team B works here
  landing-minimal-clean/      ← Team C works here
```

**Golden Rule:** Only edit files in your assigned folder!

## 💻 Development Workflow

### Step 1: Create a Branch

```bash
# Format: landing-NAME/feature-description
git checkout -b landing-hero-focused/update-cta-button
```

### Step 2: Make Changes

Only edit files in **your** landing page folder:

```bash
✅ apps/landing-hero-focused/index.html
✅ apps/landing-hero-focused/styles.css
❌ apps/landing-grid-showcase/anything.html  # Don't touch!
```

### Step 3: Test Locally

Open `index.html` in multiple browsers:
- Chrome
- Firefox
- Safari (if on Mac)
- Mobile view (Chrome DevTools)

### Step 4: Commit Changes

```bash
git add apps/landing-hero-focused/
git commit -m "feat(landing-hero-focused): update CTA button copy

Changed 'Get Started' to 'Start Learning Free' based on
user feedback. New copy tested better in A/B test.
"
```

### Step 5: Push to GitHub

```bash
git push origin landing-hero-focused/update-cta-button
```

### Step 6: Create Pull Request

1. Go to GitHub repository
2. Click "Compare & pull request"
3. Fill in PR template
4. Request review from team lead
5. Wait for Vercel preview URL
6. Test preview URL
7. Get approval
8. Merge!

## 📐 Style Guides

### HTML Style Guide

Following [Udacity HTML Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/index.html):

#### ✅ Good Examples

```html
<!-- Use semantic HTML5 -->
<header>
  <nav>
    <a href="#main">Skip to main content</a>
  </nav>
</header>

<main id="main">
  <article>
    <h1>Page Title</h1>
    <p>Content here.</p>
  </article>
</main>

<!-- Always include alt text -->
<img src="game.png" alt="Math game screenshot showing addition problems">

<!-- Close all elements -->
<input type="text" name="email">
<br>

<!-- Use lowercase -->
<div class="hero-section">
  <button type="button">Click Me</button>
</div>
```

#### ❌ Bad Examples

```html
<!-- Missing semantic elements -->
<div class="header">
  <div class="nav">
    <a href="#main">Skip to main content</a>
  </div>
</div>

<!-- Missing alt text -->
<img src="game.png">

<!-- Unclosed elements -->
<input type="text" name="email">
<br>

<!-- Uppercase or mixed case -->
<DIV CLASS="Hero-Section">
  <BUTTON TYPE="button">Click Me</BUTTON>
</DIV>
```

#### Indentation

Use **2 spaces** (not tabs):

```html
<section class="features">
  <div class="container">
    <h2>Features</h2>
    <div class="feature-grid">
      <div class="feature">
        <h3>Title</h3>
      </div>
    </div>
  </div>
</section>
```

### CSS Style Guide

Following [Udacity CSS Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/css.html):

#### ✅ Good Examples

```css
/* Use lowercase with hyphens */
.hero-section {
  background-color: #667eea;
}

/* Group related properties */
.button-primary {
  /* Positioning */
  position: relative;
  display: flex;
  
  /* Box model */
  padding: 1rem 2rem;
  margin: 0 auto;
  
  /* Typography */
  font-size: 1rem;
  font-weight: 700;
  
  /* Visual */
  background: #3b82f6;
  border-radius: 8px;
  
  /* Misc */
  cursor: pointer;
  transition: all 0.2s;
}

/* Use shorthand */
.card {
  margin: 1rem 2rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
}

/* Mobile-first responsive */
.container {
  width: 100%;
}

@media (min-width: 768px) {
  .container {
    max-width: 1200px;
  }
}
```

#### ❌ Bad Examples

```css
/* Camel case or underscores */
.heroSection {
  background-color: #667eea;
}

.hero_section {
  background-color: #667eea;
}

/* Unorganized properties */
.button-primary {
  cursor: pointer;
  background: #3b82f6;
  font-size: 1rem;
  padding: 1rem 2rem;
  position: relative;
  display: flex;
}

/* Longhand when shorthand available */
.card {
  margin-top: 1rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
}
```

### Accessibility Requirements

All landing pages must:

- ✅ Include skip links for keyboard navigation
- ✅ Use semantic HTML5 elements
- ✅ Provide alt text for all images
- ✅ Have sufficient color contrast (WCAG AA)
- ✅ Support keyboard navigation
- ✅ Include ARIA labels where needed
- ✅ Work with screen readers

## 📝 Commit Messages

Following [Udacity Git Style Guide](https://udacity.github.io/git-styleguide/):

### Format

```
type(scope): subject line (max 50 characters)

Body explaining what and why, not how.
Wrap at 72 characters per line.

- Bullet points for multiple changes
- Each change on its own line
- Keep it clear and concise
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Scope

Use the landing page name:
- `landing-hero-focused`
- `landing-grid-showcase`
- `landing-minimal-clean`

### Examples

#### ✅ Good Commits

```
feat(landing-hero-focused): add Spanish language toggle

Added a language selector in the navigation bar that switches
between English and Spanish content. All text content is now
stored in data attributes for easy switching.

- Added language toggle button to nav
- Implemented Spanish translations for hero section
- Updated CTA buttons with bilingual support
```

```
fix(landing-grid-showcase): correct game card aspect ratio

Fixed issue where game cards would stretch on larger screens.
Changed from fixed height to aspect-ratio property for
better responsive behavior.
```

```
docs: update deployment guide with troubleshooting section

Added common issues and solutions to the Vercel deployment
guide based on team feedback and support questions.
```

#### ❌ Bad Commits

```
updated stuff
```

```
fix
```

```
Made changes to landing page and fixed some bugs and updated the readme
```

```
FEAT: ADDED NEW FEATURE!!!  # Too enthusiastic, wrong case
```

## 🔄 Pull Request Process

### 1. Create PR

- Use descriptive title matching commit message style
- Fill in the PR template
- Link related issues

### 2. PR Description Template

```markdown
## Description
Brief summary of changes

## Type of Change
- [ ] New landing page
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested on mobile
- [ ] Checked accessibility
- [ ] Validated HTML/CSS

## Screenshots
(If applicable)

## Checklist
- [ ] Follows style guides
- [ ] No console errors
- [ ] Responsive design works
- [ ] Alt text on all images
```

### 3. Review Process

- Team lead reviews code
- Automated checks must pass
- Vercel preview must be working
- At least 1 approval required

### 4. Merging

- Squash and merge (preferred)
- Delete branch after merge
- Deployment happens automatically

## 🚫 Common Mistakes to Avoid

### ❌ Editing Multiple Landing Pages

```bash
# DON'T DO THIS
git add apps/landing-hero-focused/
git add apps/landing-grid-showcase/
git commit -m "updated both"
```

### ❌ Vague Commit Messages

```bash
# DON'T DO THIS
git commit -m "changes"
git commit -m "fix"
git commit -m "update"
```

### ❌ Huge Commits

```bash
# DON'T DO THIS
# 50 files changed, 10,000 lines added
git commit -m "complete redesign"
```

### ✅ Do This Instead

```bash
# Make small, focused commits
git add apps/landing-hero-focused/index.html
git commit -m "feat(landing-hero-focused): update hero title"

git add apps/landing-hero-focused/styles.css
git commit -m "style(landing-hero-focused): improve button hover effects"
```

## 🎯 Landing Page Ownership

| Landing Page | Owner | Description |
|--------------|-------|-------------|
| landing-hero-focused | Team A | Hero-first emotional design |
| landing-grid-showcase | Team B | Game catalog browser |
| landing-minimal-clean | Team C | Accessible, minimal design |
| landing-gamified-interactive | TBD | Animated, playful design |
| landing-video-story | TBD | Video-driven narrative |

**Only edit your assigned landing page!**

## 📞 Getting Help

- **Stuck on something?** Create a GitHub Discussion
- **Found a bug?** Create a GitHub Issue
- **Need review?** Tag your team lead in PR
- **Style guide questions?** Check Udacity guides linked above

## 🎓 Learning Resources

- [Udacity HTML/CSS Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/)
- [Udacity Git Style Guide](https://udacity.github.io/git-styleguide/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev Accessibility](https://web.dev/learn/accessibility/)
- [CSS Tricks](https://css-tricks.com/)

---

**Questions?** Open a GitHub Discussion or contact the project maintainers.

Thank you for contributing! 🎉

