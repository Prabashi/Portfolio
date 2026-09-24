# Portfolio

Personal site built with Astro, TypeScript, Tailwind CSS v4 and MDX. Static output, deployed to Cloudflare Pages.

## Commands

| command            | what it does                                   |
| ------------------ | ---------------------------------------------- |
| `npm run dev`      | dev server at `localhost:4321` (shows drafts)  |
| `npm run build`    | production build into `dist/` (hides drafts)   |
| `npm run preview`  | serve the production build locally             |
| `npm run check`    | type-check `.astro`, `.ts` and content schemas |

## Where things live

```text
src/
├── consts.ts                 name, links, stack, nav: edit this first
├── content/
│   ├── projects/*.mdx        one file per project → /projects/<file-name>
│   └── blog/*.mdx            one file per post    → /blog/<file-name>
├── content.config.ts         frontmatter schemas for both collections
├── components/               Header, ProjectCard, Figure, Decision, ThemeToggle (React island), …
├── layouts/Layout.astro      page shell
├── pages/                    routes: /, /projects, /blog, /about, 404, rss.xml
└── styles/global.css         design tokens (light/dark), prose styles
public/
├── resume.pdf                ← add your résumé here
└── _headers                  Cloudflare caching rules
```

## Writing content

**Projects** (`src/content/projects/*.mdx`) support two components with no import needed:

~~~mdx
<Figure caption="What the diagram shows.">

```text
┌──────┐     ┌──────┐
│  A   │ ──▶ │  B   │
└──────┘     └──────┘
```

</Figure>

<Decision title="What you chose" tradeoff="What it cost you.">
  Why you chose it.
</Decision>
~~~

Diagrams can be ASCII (box-drawing characters render aligned in JetBrains Mono), an image, or inline SVG.

**Posts** support `tags`, `series` + `seriesPart` (adds a series navigator), and `draft: true`.

Sample content is marked `placeholder: true`, which shows a dashed **PLACEHOLDER** badge. Remove the flag once
you've rewritten a piece. To find what's left: `grep -rn "placeholder: true\|TODO" src`.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Build settings: framework preset **Astro**, build command `npm run build`, output directory `dist`.
   Set the environment variable `NODE_VERSION=22`.
4. Add your custom domain under the project's **Custom domains** tab.
5. Set `site` in `astro.config.mjs` to that domain so canonical URLs, the sitemap and RSS are correct.

Every push to `main` deploys to production. Other branches get preview URLs.

## Fonts

IBM Plex Sans is loaded through Astro's Google fonts provider. JetBrains Mono is self-hosted from
`src/assets/fonts/` (OFL licence alongside) because the Google subsets omit box-drawing glyphs.
