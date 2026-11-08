# workIT frontend

## Prikaz vlog

Izbirnik »Vloga« v zgornji vrstici preklaplja med tremi vzorčnimi profili:
Ana Novak (zaposleni), Luka Kovač (vodja projekta) in Neža Pirc (vodja podjetja).
Stranski meni prikaže Vodstvo za obe vodstveni vlogi in Uporabnike samo za vodjo
podjetja. Skupne strani, vključno s Kanbanom, ostanejo dostopne vsem.

Izbira živi samo v React stanju in se ob osvežitvi ponastavi. Gre za prikaz
navigacije: neposredni URL-ji niso varnostno zaščiteni. Prijava, dovoljenja,
projektne omejitve podatkov in backend niso del te simulacije.

React + TypeScript application scaffolded with the official Vite `react-ts` template.
The Vite demo has been replaced with a responsive, grayscale UI prototype using mock data.
Forms and editing controls open presentation-only dialogs. Search, status controls,
and tabs change the view of static mock data. Timer buttons only change their visual
state; they never measure or record time. No backend, authentication, API requests,
or persistence is implemented.

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
login/sign-up layout. Login and sign-up buttons navigate to the dashboard for
preview purposes without logging in or creating accounts. The image changes sides on desktop and stacks
above the form on mobile. Reduced-motion preferences disable the animation.
User management is linked from Management to preserve the existing sidebar.
For production hosting, configure SPA fallback to `index.html` for these URLs.

The backend lives separately in `../backend/`. No API integration is configured yet.
Generated `node_modules/` and `dist/` directories are ignored by Git.

## UI interactions

- `/forgot-password` displays a password reset preview. It never sends an email.
- Add task, create project, employee actions, assignment, project instructions,
  filters, and week selection open matching preview dialogs.
- Manual time entry is an editable row in the time entries table. It does not
  calculate durations or save records.
- Project creation and the project Members dialog support selecting multiple
  people with individual Project manager, Contributor, or Viewer roles. These
  selections are temporary UI state and never assign real permissions.
- `/profile` and `/settings` use the shared page layout and reusable components
  under `components/profile/`, `components/settings/`, and `components/common/`.
  Their forms never save details or apply preferences. Sidebar logout only
  navigates to `/login`.
- Project Board, Overview, and Files tabs switch the visible section.
- Task titles open details; upload icons open the attachment picker.
- Attachment selection only displays filenames locally. No file content is read
  or transmitted. Closing the dialog discards the selection.
- Drag cards to move between columns or reorder within a column. Drag the column
  handles to reorder columns. Card handles also support arrow keys. Every card
  has a move menu with a column selector and up/down controls for mobile use.
- Board movement is temporary React state and resets when leaving or refreshing
  the page. It never modifies the mock fixtures or saves to storage.
- Forms do not create, edit, send, upload, or save anything. Confirming a dialog
  closes it without a confirmation message. Prototype notices are not shown in the UI.
- Dialogs support Escape, close/cancel controls, and native modal focus trapping.
