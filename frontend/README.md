# workIT frontend

React + TypeScript application scaffolded with the official Vite `react-ts` template.
The Vite demo and bundled images have been removed. React Router serves five blank pages.

## Requirements and development

Use Node.js 24 LTS and npm. From this directory:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server with hot module replacement |
| `npm run typecheck` | Check TypeScript application and configuration files |
| `npm run lint` | Run Oxlint |
| `npm run build` | Check types and build production files into `dist/` |
| `npm run preview` | Serve the production build locally after building |

## File structure

```text
frontend/
  public/              Static files served without processing
  src/
    App.tsx            Root application component
    pages/             Dashboard, Kanban, Statistics, My Day, Projects
    index.css          Global styles
    main.tsx           React entry point
  index.html           Vite HTML entry point
  package.json         Dependencies and scripts
  package-lock.json    Locked dependency versions
  tsconfig.json        TypeScript project references
  tsconfig.app.json    Application TypeScript configuration
  tsconfig.node.json   Tooling TypeScript configuration
  vite.config.ts       Vite and React plugin configuration
```

Keep `index.html` at the frontend root. As functionality is added, put shared UI
in `src/components/`, pages in `src/pages/`, reusable hooks in `src/hooks/`, and
API access in `src/services/`. Add these directories when they contain code.

## Pages

| URL | Component |
| --- | --- |
| `/dashboard` | `src/pages/DashboardPage.tsx` |
| `/kanban` | `src/pages/KanbanPage.tsx` |
| `/statistics` | `src/pages/StatisticsPage.tsx` |
| `/my-day` | `src/pages/MyDayPage.tsx` |
| `/projects` | `src/pages/ProjectsPage.tsx` |

The root URL redirects to `/dashboard`. All pages intentionally render no content.
Projects is a placeholder fifth page because only four page names were specified.
For production hosting, configure SPA fallback to `index.html` for these URLs.

The backend lives separately in `../backend/`. No API integration is configured yet.
Generated `node_modules/` and `dist/` directories are ignored by Git.
