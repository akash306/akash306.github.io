# akash306.github.io

My personal portfolio website, built with plain HTML, CSS, and JavaScript.
Hosted on GitHub Pages.

**Live site:** https://akash306.github.io

## Structure

```
.
├── index.html              # Home page (hero, about, projects, blog, contact)
├── styles.css              # Responsive layout, light/dark themes, reduced motion
├── theme.js                # Apply saved/system theme before styles load
├── script.js               # Theme controls, mobile nav, active section, footer year
└── posts/
    └── hello-world.html    # Example blog post
```

## Editing

- **Content:** edit `index.html` directly — sections are clearly commented.
- **Styling:** colors and spacing live in the `:root` variables at the top of `styles.css`.
- **Themes:** follows the system preference initially; the theme button saves a manual
  choice in local storage. Both pages share the same preference.
- **Accessibility:** includes skip links, visible keyboard focus, Escape-to-close mobile
  navigation, reduced-motion support, and readable content/navigation without JavaScript.
- **Dependencies:** no build step or JavaScript packages. Google Fonts is optional;
  system fonts are used if it cannot load.
- **New blog post:** copy `posts/hello-world.html`, rename it, and add a link in the
  Blog section of `index.html`. Update the title, description, canonical URL, and
  Open Graph metadata in the copied post.

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
