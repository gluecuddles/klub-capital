# Klub Capital

Private capital network — invite-only landing page.

## Stack

- React 18
- Vite 5
- Tailwind CSS 3
- Framer Motion 11

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
klub-capital/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Reveal.jsx          # Scroll-triggered fade-in wrapper
│   │   ├── Navbar.jsx          # Sticky nav with mobile menu
│   │   ├── Hero.jsx            # Hero section
│   │   ├── QuietStatement.jsx  # Editorial statement section
│   │   ├── Problem.jsx         # Problem / friction section
│   │   ├── Solution.jsx        # Three-block solution section
│   │   ├── Audience.jsx        # Split investor / business section
│   │   ├── HowItWorks.jsx      # Step timeline
│   │   ├── Differentiation.jsx # 2x2 grid differentiators
│   │   ├── TrustAccess.jsx     # Access / trust section
│   │   ├── ApplicationSection.jsx # Tabbed application forms
│   │   ├── FinalCTA.jsx        # Final call to action
│   │   └── Footer.jsx          # Footer
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind + global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── package.json
```

## Deploying to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: GitHub + Vercel Dashboard

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Vercel auto-detects Vite — no config needed
4. Deploy

Build settings (auto-detected):
- **Framework**: Vite
- **Build command**: `npm run build`
- **Output directory**: `dist`

## Fonts

Loaded via Google Fonts in `index.html`:
- **Cormorant Garamond** — serif headings
- **DM Sans** — body text
