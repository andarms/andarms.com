# andarms.com

Minimal personal site for Adrian Manjarres (ANDarms), built with Astro.

## Develop

1. Install dependencies
2. Start dev server

```
npm ci
npm run dev
```

Open http://localhost:4321

## Build

```
npm run build
```

Static output in `dist/`.

## Deploy

GitHub Actions will build and deploy to GitHub Pages on each push to `master`.
`CNAME` is preserved via `public/CNAME` to point to andarms.com.
