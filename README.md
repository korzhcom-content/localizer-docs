# Localizer Documentation

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

The official documentation site for **Localizer** — Korzh's localization toolkit for applications written in Borland/Embarcadero **Delphi** and **C++ Builder**. This repository contains the full documentation content (getting started, the Language Manager guide, the Language Wizard guide, and the Localizer API/runtime references) together with the Astro project that builds it into a static site.

The published site is served as part of **[korzh.com](https://korzh.com)** at **https://korzh.com/localizer/docs**.

## Approach

The site is a static documentation site built with [Astro](https://astro.build) and the [Starlight](https://starlight.astro.build) docs framework.

It is intentionally **content-driven**: you add and edit Markdown/MDX, and the navigation builds itself.

- All content lives under `src/content/docs/` as `.md` / `.mdx` files, grouped into top-level sections: `getting-started`, `language-manager`, `language-wizard`, and `localizer-references`.
- The **sidebar is generated from the folder tree** (`tools/get-sidebar.js`), not hand-maintained in config. Folder labels come from a `__section.md` heading, and ordering comes from `sidebar.order` in article frontmatter / `frontmatter.json` in folders.
- During the build, **section landing pages (`index.md`) are generated** from each `__section.md` (`tools/add-indexes.js`), including auto-built "In this section" and "Subsections" link lists. These `index.md` files are git-ignored — edit `__section.md`, not the generated `index.md`.
- A small rehype plugin (`plugins/rehype-links.js`) rewrites internal links to the deployment base path (`/localizer/docs`), so links are authored root-relative.

The site is built under the base path `localizer/docs` and output to `./dist/localizer/docs`.

## Local development

Requires Node.js 22+ and npm. All commands run from the repository root:

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `localhost:4321` (pages live under `/localizer/docs`) |
| `npm start` | Same as `dev`, but opens the browser |
| `npm run build` | Generate section indexes, then build the production site to `./dist/localizer/docs` |
| `npm run preview` | Preview the production build locally |
| `npm run generate:indexes` | Regenerate section `index.md` files without a full build |
| `npm run check` | Crawl the **running** dev server with `@olton/spider` for broken links (start `npm run dev` first) |

## Dependencies

This is a self-contained Astro project — there are **no git submodules and no sibling repositories required** to build it. All dependencies are npm packages declared in `package.json`, most notably:

- `astro` + `@astrojs/starlight` — site framework and docs theme.
- Starlight plugins enabled in `astro.config.mjs`: `starlight-theme-rapide` (theme) and `starlight-image-zoom`.
- `@expressive-code/plugin-line-numbers` — code-block line numbers (configured in `ec.config.mjs`; enabled for `js`/`ts`/`html`/`pas`/`pascal`).
- Build/content tooling: `gray-matter`, `glob`, `fs-extra`, `unist-util-visit`, `sharp` (image processing), `@olton/spider` (link crawler), `@olton/terminal`.

The only repository it depends on at runtime is, in effect, the **korzh.com site**, which embeds this documentation via a Netlify rewrite (see below).

## Contributing & branching

- **Never push directly to `main`.** All changes to `main` must go through a **Pull Request**.
- Day-to-day work happens on `dev` (and feature branches), which is also deployed for preview/review.

## Deployment

Deployment is handled by **Netlify** and triggered automatically on branch changes. Two branches are deployed:

- **`main`** — production documentation.
- **`dev`** — staging/preview of in-progress docs.

Both branches build with `npm run build` and publish `./dist/localizer/docs`.

### Integration into korzh.com

The deployed Netlify site is surfaced on the main korzh.com domain through a **Netlify rewrite (proxy) rule with a `200!` status**. Rather than redirecting the visitor, korzh.com proxies requests for `/localizer/docs/*` to this site, so the documentation appears seamlessly under `https://korzh.com/localizer/docs` while remaining a separate repository and deploy.

This is why the project is built under the `localizer/docs` base path — the paths must line up with the rewrite rule on korzh.com.

## Redirects

The root `netlify.toml` redirects `/` to the documentation entry point (`/localizer/docs/getting-started/overview`).
