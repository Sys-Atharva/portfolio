# 🚀 Interactive 3D Portfolio

An immersive, high-performance developer portfolio built with **React**, **Vite**, and **Three.js/Framer Motion**. This project features a dynamic integration with the GitHub API to showcase live repositories in real-time.

[![Deploy Vite Site](https://github.com/Sys-Atharva/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Sys-Atharva/portfolio/actions/workflows/deploy.yml)

## 🌐 Live Demo
View the live site here: [sys-atharva.github.io/portfolio/](https://sys-atharva.github.io/portfolio/)

## ✨ Key Features
- **Dynamic Project Fetching:** Automatically pulls latest repositories via GitHub REST API.
- **3D Interactive Backdrop:** Immersive user experience using Framer Motion and custom shaders.
- **Responsive Design:** Optimized for mobile (Samsung F62) and desktop (Dell Inspiron) viewing.
- **Automated Deployment:** CI/CD pipeline managed via GitHub Actions.
- **Glassmorphic UI:** Built using Tailwind CSS and shadcn/ui components.

## 🛠️ Tech Stack
- **Framework:** React 18 (with TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion & Lucide React
- **Data Fetching:** TanStack Query & GitHub API
- **Deployment:** GitHub Pages

## 📂 Project Structure
```text
├── .github/workflows  # GitHub Actions Deployment scripts
├── src
│   ├── components     # UI Components (FloatingNav, SpotlightCard, etc.)
│   ├── pages          # Page views (Index, Projects, NotFound)
│   ├── hooks          # Custom React hooks
│   └── lib            # Utility functions
├── public             # Static 3D assets and icons
└── vite.config.ts     # Vite configuration & path aliasing

## 🚀 Getting Started Locally
1. Clone the repository:
git clone [https://github.com/Sys-Atharva/portfolio.git](https://github.com/Sys-Atharva/portfolio.git)
cd portfolio

2. Install dependencies:
npm install

3. Start development server:
npm run dev

## ⚙️ Deployment
This project is configured for GitHub Pages. To deploy your own version:

1. Ensure base: '/repo-name/' is set correctly in vite.config.ts.

2. Ensure the basename in BrowserRouter matches the repository name.

3. Push changes to the main branch to trigger the GitHub Action.

Developed by Atharva Purvat