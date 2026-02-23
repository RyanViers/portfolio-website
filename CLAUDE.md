# Portfolio Website

## Overview
Personal staging site and app showcase. A living platform to host, demo, and let users interact with apps Ryan has built. Built with Angular 21 + Tailwind CSS 4.

## AWS Configuration
- **AWS CLI Profile:** `rachel` (NOT default, NOT ryanviers)
- **Always use:** `--profile rachel` with any AWS CLI commands
- **Auth:** AWS Cognito for user authentication
- **Hosting/Infrastructure:** AWS (Amplify, S3, CloudFront, etc.)

## Tech Stack
- **Framework:** Angular 21 (standalone components, signals, no NgModules)
- **Styling:** Tailwind CSS 4 (CSS-first config, `@theme` + `@utility` in styles.css)
- **Build:** `@angular/build:application` builder
- **Animations:** Native CSS via `animate.enter`/`animate.leave` (no @angular/animations module)
- **Router:** `withViewTransitions()` enabled

## Development Standards
See `.claude/standards/ESSENTIALS.md` for coding conventions. Key rules:
- Tailwind-first styling (no custom CSS for simple styles)
- No functions called in templates (use computed signals)
- No Component/Service suffixes on class names
- Effects only inside constructor
- Signals over observables

## Scripts
- `npm start` — dev server on localhost:4200
- `npm run build` — production build to dist/
