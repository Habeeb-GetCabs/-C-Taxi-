# GitHub Actions Automated Deployment for C Taxi

Set up an automated Vite build and deployment pipeline using GitHub Actions so that `https://habeeb-getcabs.github.io/-C-Taxi-/` builds and serves the compiled application instead of a blank screen.

## User Review & Critical Decisions

> [!IMPORTANT]
> In your GitHub Pages settings, selecting **Source: GitHub Actions** is the exact correct step! Now GitHub needs a workflow configuration file (`.github/workflows/deploy.yml`) inside the repository so it knows how to run the Vite compiler (`npm run build`) and publish the resulting `dist/` folder to GitHub Pages.

- **Confirmed Decision**: Deploy using **GitHub Actions** (as configured in your repository settings).
- **Subpath Handling**: Support both the GitHub Pages subpath (`/-C-Taxi-/`) and the future root domain (`www.ctaxicab.com`) without hardcoding conflicts.

---

## 1. Overview & Core Concept

- **What It Does**: Automates the build and publishing pipeline. Every time changes or images are pushed to GitHub, GitHub Actions will install dependencies, compile the TypeScript/React code with Tailwind CSS, and publish the optimized static output directly to your GitHub Pages URL.
- **Problem Solved**: Browsers cannot run raw `.tsx` files directly and fail with a 404 when trying to load root `/src/main.tsx`. The build workflow pre-compiles everything into pure, fast HTML, JS, and CSS bundles.

---

## 2. Technical Architecture & Workflow

```
┌───────────────────────────────────────┐
│ Git Push to main (Code & Images)      │
└──────────────────┬────────────────────┘
                   ▼
┌───────────────────────────────────────┐
│ GitHub Actions Runner (Node.js 20)    │
│  ├─ npm install                       │
│  ├─ npm run build (Vite + Tailwind)   │
│  └─ Output to ./dist                  │
└──────────────────┬────────────────────┘
                   ▼
┌───────────────────────────────────────┐
│ GitHub Pages Artifact Upload          │
│  └─ actions/deploy-pages@v4           │
└──────────────────┬────────────────────┘
                   ▼
┌───────────────────────────────────────┐
│ Live Site: habeeb-getcabs.github.io/  │
│            -C-Taxi-/                  │
└───────────────────────────────────────┘
```

---

## 3. Key Changes & Implementation Steps

### Step 1: Configure Vite Base URL (`vite.config.ts`)
- GitHub Pages serves from the subpath `/-C-Taxi-/`.
- Update `vite.config.ts` to dynamically use `base: process.env.GITHUB_PAGES ? '/-C-Taxi-/' : './'` (or relative base `./`) so assets and scripts resolve properly whether accessed on GitHub Pages or custom domain `ctaxicab.com`.

### Step 2: Create GitHub Actions Workflow File (`.github/workflows/deploy.yml`)
- Create standard, secure workflow file using GitHub's official Pages deployment actions:
  - `actions/checkout@v4`
  - `actions/setup-node@v4` (Node 20 with npm caching)
  - `actions/configure-pages@v5`
  - `actions/upload-pages-artifact@v3` (targeting `./dist`)
  - `actions/deploy-pages@v4`
- Set appropriate permissions (`contents: read`, `pages: write`, `id-token: write`).

### Step 3: Verification & Build Test
- Run `npm run build` locally in the applet to verify zero bundle or type errors.
- Verify asset links (images, styles, scripts) resolve cleanly.

---

## 4. Verification Plan

- **Local Build Check**: Run `npm run build` to confirm `dist/` builds with zero errors.
- **Path Resolution**: Verify generated asset URLs load correctly with relative or repository paths.
- **Live Deployment**: Once the workflow file is in your repository, the GitHub Actions tab will automatically show a green checkmark build, and your site will be live!
