<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="brand/logo-dark.svg" />
  <img src="brand/logo-light.svg" alt="iGroup Solutions" width="260" />
</picture>

# iGroup Solutions — Website Redesign

**We Build Your Digital Future.**
A modern, motion-led redesign of the iGroup Solutions website — a software development company delivering since 2015.

<p>
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img alt="GSAP" src="https://img.shields.io/badge/GSAP-3.15-88CE02?style=flat-square&logo=greensock&logoColor=white" />
  <img alt="Lenis" src="https://img.shields.io/badge/Lenis-smooth%20scroll-111111?style=flat-square" />
  <img alt="React Bits" src="https://img.shields.io/badge/React%20Bits-components-F79420?style=flat-square" />
</p>

<a href="https://i-group-solutions-redesign-gw9u.vercel.app/">
  <img alt="Visit Live Site" src="https://img.shields.io/badge/Visit%20Live%20Site-F79420?style=for-the-badge&logo=googlechrome&logoColor=white" />
</a>

</div>

---

## ✦ Overview

A dark, ember-toned single-page site built around the iGS brand orange, with a warm cream light theme a click away. Every section from the original website is carried over — services, about, clients, careers and contact — and rebuilt with cinematic GSAP motion, buttery Lenis scrolling and interactive components from [React Bits](https://reactbits.dev).

## ✦ The original website

This project redesigns the existing site at **[igroupsolutions.lk](https://www.igroupsolutions.lk)**. All of its content is preserved; the experience around it is rebuilt.

| | Original site | Redesign |
|---|---|---|
| **Stack** | Bootstrap, jQuery, MDB, Slick carousel | React 19, Vite 6 |
| **Look** | Light theme with stock photography | Dark ember theme in the brand orange, plus a warm cream light theme |
| **Motion** | Static sections | GSAP timelines, ScrollTrigger, Lenis smooth scroll |
| **Hero** | Photo banner with headline | Liquid-metal `iGROUP` wordmark inside a breathing ember ring |
| **Clients** | Slick logo carousel | Marquee with silhouette-to-colour hover reveal |
| **Logo** | 200×90 PNG | Vector SVG set, round badge favicon + 2400px PNG exports |
| **Content** | — | All original copy, roles and contact details carried over |

## ✦ Highlights

| | |
|---|---|
| **Hero intro** | Once the display font is ready, the ember ring, wordmark, headline and nav play in as one timeline — no loading screen. |
| **Liquid-metal wordmark** | The hero `iGROUP` is rendered with React Bits **MetallicPaint** (WebGL2), in chrome on dark and copper on light. Falls back to plain type where WebGL2 is unavailable. |
| **Dark & light themes** | A sun/moon toggle in the nav switches themes. The new theme washes out from the toggle with a soft-edged radial reveal (View Transitions). Dark is the default; a visitor's choice is remembered and applied before first paint, so there's no flash. |
| **Custom cursor** | A precise dot with a trailing ring that swells over links, for mouse and trackpad users only. |
| **Scroll-proof hover** | Service rows, career roles and footer links are lit by a per-frame pointer hit-test, so they respond even while Lenis glides content under a resting cursor. |
| **Smooth scrolling** | Lenis drives the scroll, synced to GSAP's ticker so every ScrollTrigger stays frame-perfect. |
| **Drifting light pools** | Soft radial glows float behind the page with gentle parallax. |
| **Client marquee** | Logos rest as silhouettes and reveal their true colours on a light tile when hovered. |
| **Sliding social dock** | A highlight tile glides beneath the hovered icon. |
| **Self-fitting footer** | The giant `iGROUP` wordmark measures itself to span the container exactly at any width. |
| **Accessible by default** | Semantic headings, keyboard focus styles, `prefers-reduced-motion` support and a responsive layout from desktop down to phone widths. |

## ✦ Tech stack

| Layer | Tools |
|---|---|
| Framework | React 19, Vite 6 |
| Motion | GSAP 3.15 (ScrollTrigger, SplitText), `@gsap/react`, View Transitions API |
| Scrolling | Lenis |
| Components | React Bits — MetallicPaint, SplitText, ScrollReveal, ScrollFloat, LogoLoop, CountUp, ShinyText, StarBorder |
| Typography | Unbounded (display), Space Grotesk (body), Oswald (condensed) |

## ✦ Getting started

**Requirements:** Node.js 18+ and npm.

```bash
git clone https://github.com/Mihiran-Thilakarathna/iGROUP-Solutions_Redesign.git
cd iGROUP-Solutions_Redesign
npm install
npm run dev
```

Open <http://localhost:5173>.

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run logo:png` | Re-export the brand SVGs as high-resolution PNGs |

## ✦ Project structure

```
├── _source_assets/         Original files from the current live site (reference)
├── brand/                  Vector logo set + high-res PNG exports
├── public/                 Static files (favicon, logos, client logos)
├── scripts/
│   ├── build_logo.py       Rebuilds the logo SVGs from typefaces
│   ├── build_badge.py      Rebuilds the round badge / favicon from its artwork
│   └── export-logo.mjs     Renders SVG → PNG (resvg)
└── src/
    ├── components/
    │   ├── reactbits/      React Bits components
    │   ├── Navbar.jsx      Nav bar, active-section pill, mobile sheet
    │   ├── ThemeToggle.jsx Animated sun/moon theme switch
    │   ├── Cursor.jsx      Custom desktop cursor
    │   ├── Hero.jsx        Metallic wordmark, ember ring, intro timeline
    │   ├── Services.jsx    "What we build for you" rows
    │   ├── About.jsx       Lead, founding year, call to action
    │   ├── Clients.jsx     Logo marquee + statement
    │   ├── Careers.jsx     Open roles
    │   ├── Contact.jsx     Form + contact card
    │   └── Footer.jsx      CTA, link columns, fitted wordmark
    ├── data/content.js     All site copy in one place
    ├── gsap.js             GSAP + Lenis setup
    ├── theme.js            Theme state and the reveal transition
    ├── rowHover.js         Hover that keeps up with smooth scrolling
    └── index.css           Design tokens (dark + light) and global styles
```

## ✦ Editing content

All copy — services, clients, careers, contact details and social links — lives in [`src/data/content.js`](src/data/content.js). Update it there and every section follows. The contact form posts to the original site's mail handler, set by `formAction` in the same file.

## ✦ Brand

The original logo was a 200×90 PNG. `brand/` contains a vector rebuild that stays sharp at any size:

| File | Use |
|---|---|
| `logo-light.svg` | Original colours — light backgrounds (used in the light theme) |
| `logo-dark.svg` | White wordmark — dark backgrounds (used in the dark theme) |
| `logo-badge.svg` | Round iGS badge — the updated mark; the favicon is this badge without its black ring |
| `icon.svg` | Square mark for avatars |
| `*-2400w.png`, `*-512w.png` | High-resolution PNG exports |

To regenerate the badge from its source artwork (needs Python with `opencv-python` and `numpy`):

```bash
python scripts/build_badge.py _source_assets/logo-igs-badge.png brand/logo-badge.svg
python scripts/build_badge.py _source_assets/logo-igs-badge.png public/favicon.svg --no-rim
```

Brand orange: **`#F79420`**

## ✦ Credits

- Components from [React Bits](https://reactbits.dev)
- Animation by [GSAP](https://gsap.com) · smooth scroll by [Lenis](https://lenis.darkroom.engineering)
- Fonts from [Google Fonts](https://fonts.google.com)

---

<div align="center">

© iGroup Solutions · Software Development in Sri Lanka · All rights reserved.

</div>
