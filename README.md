# IIT Dharwad CSE Department Website

React 19 single-page website built with Vite, Tailwind CSS, and React Router.

## Development

```bash
npm install
npm run dev
```

## Validation and production build

```bash
npm run lint
npm run build
npm run preview
```

The production bundle is written to `dist/`. The build also writes a bundle
analysis report to `dist/stats.html`.

## Project layout

- `src/App.jsx` defines the shared header, navigation, footer, and routes.
- `src/pages/` contains the routed website pages.
- `src/components/` contains shared page sections and interface components.
- `src/hooks/` contains React Query data hooks.
- `src/api/api.js` contains the Strapi and Google Sheets data integrations.
- `src/constant/` contains API and route constants.
- `src/content/` and `public/` contain static documents and media.

The navigation is horizontal at desktop widths and becomes a slide-out menu on
mobile and tablet widths. Search results are available at `/search?q=...`.
