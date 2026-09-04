# DEV STUDIOS

The portfolio site for **DEV STUDIOS** — a full-stack engineering collective founded by **Nithin Selvaraj**, **Kranti .P.A**, and **Vivin .S**. It showcases 19 live, embedded web applications spanning aerospace simulation, WebGL/shader work, AI systems, and SaaS tooling.

## Features

- **Live application windows** — every project card embeds the real deployed site in an iframe, with a fullscreen interactive sandbox (device-size switcher, reload, spec drawer) for a closer look.
- **Lazy-mounted iframes** — an `IntersectionObserver`-backed wrapper ([`LazyLiveFrame`](src/components/LazyLiveFrame.tsx)) mounts a project's live site only when its card nears the viewport and unmounts it again once scrolled away, so dozens of embedded apps never run concurrently in the background.
- **Subtle 3D scroll reveals** — GSAP `ScrollTrigger` drives gentle perspective/`rotateX`/depth reveals as sections and cards enter view ([`src/lib/motion.ts`](src/lib/motion.ts)), on top of a pinned horizontal scrub gallery and parallax showcase.
- **Smooth-scroll architecture** — [Lenis](https://github.com/darkroomengineering/lenis) drives inertial scrolling, synced to GSAP's ticker for `ScrollTrigger` accuracy.
- **Filterable project catalog** — filter the full directory by founder or category, search by stack/keyword, and sort by index, rating, or featured status.
- **Single dark theme** — a near-black palette with a muted, low-saturation accent and a Space Grotesk / JetBrains Mono type system.

## Tech Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tooling & dev server
- [Tailwind CSS](https://tailwindcss.com/) — styling, with a custom `ink` / `paper` / `accent` design-token palette
- [GSAP](https://gsap.com/) (`ScrollTrigger`) — scroll-driven and 3D reveal animations
- [Lenis](https://github.com/darkroomengineering/lenis) — smooth scrolling
- [Lucide React](https://lucide.dev/) — icons

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

Other scripts:

```bash
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
```

## Project Structure

```
src/
  components/     UI sections (Hero, ParallaxShowcase, HorizontalGallery,
                   CuratedCatalog, LivePreviewCard, LazyLiveFrame, ...)
  data/            Project directory data (src/data/projects.ts)
  hooks/           useInView — shared IntersectionObserver hook
  lib/             motion.ts — shared 3D scroll-reveal helper
```

## Contact

Built by **DEV STUDIOS** — [Nithin Selvaraj](https://github.com/Nithinfgs) · [Kranti .P.A](https://github.com/Krtx-dev) · [Vivin .S](https://github.com/vivins2009-droid)

📧 nithinselvaraj9@gmail.com
