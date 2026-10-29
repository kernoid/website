# kernoid – website

One static page for **kernoid**: no build step, no framework, no external resources, no cookies, no tracking.
A [falkOSS](https://falkoss.org) project.

| Path | What |
|---|---|
| `index.html`, `style.css`, `404.html` | the page (English) |
| `favicon.*`, `apple-touch-icon.png`, `icon-*.png`, `site.webmanifest`, `social.png` | head icons – **generated** by `brand/generate.py` in `kernoid/kernoid` (`brand/web/`), copied here |
| `assets/` | lockup and mark (from `brand/svg/`), IBM Plex Mono and Sans (`assets/fonts/`, SIL OFL 1.1) |

Imprint and privacy policy are falkoss.org's – same operator, one place to keep them current.

Preview locally:

```sh
python3 -m http.server 8012
```

## Publishing

GitHub Pages via `.github/workflows/pages.yml` on every push to `main`. One-time setup: Repo → Settings → Pages →
Source: **GitHub Actions**.

**OPEN:** the domain. Once it is registered: set it as custom domain, **Enforce HTTPS**, and add `canonical`,
`og:url` and an absolute `og:image` to `index.html` and `Canonical:` to `.well-known/security.txt`. Until then,
`404.html` uses root paths that only resolve under a custom domain.

## Licence

The site's code is **AGPL-3.0-or-later** (`LICENSE`); the fonts are under the SIL Open Font License 1.1
(`assets/fonts/OFL.txt`); the favicon, icons, `social.png`, `site.webmanifest` and the marks in `assets/` are copies
from [kernoid/brand](https://github.com/kernoid/brand) under CC BY-ND 4.0 – updated by copying from there, never
edited here. Every file's licence is in `REUSE.toml` ([REUSE](https://reuse.software), checked in CI). The name and
the brand are not covered by any of these licences.
