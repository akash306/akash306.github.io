# akash306.github.io

My personal portfolio website, built with plain HTML, CSS, and JavaScript.
Hosted for free on GitHub Pages.

**Live site:** https://akash306.github.io

## Structure

```
.
├── index.html              # Home page (hero, about, projects, blog, contact)
├── styles.css              # All styles (minimal light theme)
├── script.js               # Mobile nav, footer year, scroll animations
└── posts/
    └── hello-world.html    # Example blog post
```

## Editing

- **Content:** edit `index.html` directly — sections are clearly commented.
- **Styling:** colors and spacing live in the `:root` variables at the top of `styles.css`.
- **New blog post:** copy `posts/hello-world.html`, rename it, and add a link in the
  Blog section of `index.html`.

## Deploying

This repo is a GitHub Pages **user site** (`<username>.github.io`), so anything
pushed to the `main` branch is published automatically at
https://akash306.github.io.

```bash
git add .
git commit -m "Add portfolio site"
git push
```

Changes usually go live within a minute.

## Local preview

Open `index.html` in a browser, or run a local server:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000
