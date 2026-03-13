# Sales Frontend — Angular 17

Frontend for the Sales System. Connects to the Spring Boot backend at `http://localhost:9898/api`.

## Setup

```bash
cd frontend
npm install
npm start       # http://localhost:4200
npm run build   # production build → dist/sales-frontend/
```

## Architecture

```
src/app/
├── core/           # CoreModule (loaded once in AppModule)
│   ├── guards/     # authGuard (functional CanActivateFn)
│   ├── interceptors/ # JwtInterceptor (adds Bearer token, handles 401)
│   ├── models/     # TypeScript interfaces matching backend DTOs
│   └── services/   # HTTP services (one per resource)
├── shared/         # SharedModule (re-exports Material + ReactiveFormsModule)
│   └── components/ # ConfirmDialogComponent
└── features/       # Lazy-loaded feature modules
    ├── auth/       # /auth/login — no guard
    ├── layout/     # App shell (sidenav + toolbar) — guarded
    ├── dashboard/  # / — stats overview
    ├── articles/   # /articles — CRUD with dialog
    ├── categories/ # /categories — inline form + table
    ├── sales/      # /sales — list with SUNAT send button; /sales/new — form with line items
    ├── persons/    # /persons — customer CRUD
    ├── providers/  # /providers — provider CRUD
    ├── income/     # /income — list; /income/new — form with line items
    └── users/      # /users — user management
```

## Key patterns

- **NgModules** — no standalone components
- **Lazy loading** — all feature modules via `loadChildren` in `LayoutRoutingModule`
- **JWT** — stored in `localStorage`; attached by `JwtInterceptor`; 401 triggers auto-logout
- **Auth guard** — functional `authGuard` using `inject(AuthService).isAuthenticated()`
- **SUNAT** — "Send" button in sales list calls `POST /api/billing/{saleId}`; shows CDR result in snackbar

## Backend

Requires the Spring Boot backend running on port `9898` with `CORS_ORIGINS=http://localhost:4200`.
