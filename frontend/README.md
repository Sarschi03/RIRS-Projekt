# workIT frontend

React + TypeScript application scaffolded with the official Vite `react-ts` template.
The Vite demo has been replaced with a responsive, grayscale UI prototype using mock data.
All forms, filters, editing controls, and timers are visual placeholders. No backend,
authentication, API requests, or persistence is implemented.

## Requirements and development

Use Node.js 24 LTS and npm. From this directory:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Commands

| Command             | Purpose                                                  |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Start the development server with hot module replacement |
| `npm run typecheck` | Check TypeScript application and configuration files     |
| `npm run lint`      | Run Oxlint                                               |
| `npm run build`     | Check types and build production files into `dist/`      |
| `npm run preview`   | Serve the production build locally after building        |

## File structure

```text
frontend/
  public/              Static files served without processing
  src/
    App.tsx            Root application component
    assets/            Local grayscale authentication illustration
    components/        Shared UI, auth, dashboard, projects, tasks, planner, tables
    data/              Static mock data
    pages/             Routed workspace and authentication screens
    routes/            React Router configuration
    types/             Mock data interfaces
    styles/            Existing navigation styles, workspace styles, auth styles
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

| URL              | Component                          |
| ---------------- | ---------------------------------- |
| `/dashboard`     | `src/pages/DashboardPage.tsx`      |
| `/kanban`        | `src/pages/KanbanPage.tsx`         |
| `/statistics`    | `src/pages/StatisticsPage.tsx`     |
| `/my-day`        | `src/pages/MyDayPage.tsx`          |
| `/projects`      | `src/pages/ProjectsPage.tsx`       |
| `/projects/:id`  | `src/pages/ProjectDetailsPage.tsx` |
| `/time-tracking` | `src/pages/TimeTrackingPage.tsx`   |
| `/management`    | `src/pages/ManagementPage.tsx`     |
| `/users`         | `src/pages/UsersPage.tsx`          |
| `/login`         | `src/pages/LoginPage.tsx`          |
| `/signup`        | `src/pages/SignupPage.tsx`         |

The root URL redirects to `/dashboard`. Open `/login` to preview the sliding
login/sign-up layout. Account buttons do not log in or create accounts; use
"Back to workspace" to return. The image changes sides on desktop and stacks
above the form on mobile. Reduced-motion preferences disable the animation.
User management is linked from Management to preserve the existing sidebar.
For production hosting, configure SPA fallback to `index.html` for these URLs.

The backend lives separately in `../backend/`. No API integration is configured yet.
Generated `node_modules/` and `dist/` directories are ignored by Git.
