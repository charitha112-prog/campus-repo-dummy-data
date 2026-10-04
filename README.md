# Campus Knowledge Repository — Frontend

React + Vite frontend matching the supplied glassmorphism UI direction.

## Run

1. Install Node.js LTS.
2. Open this folder in VS Code.
3. Run:

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Important: no seeded/dummy data

The project does not create sample interview, hackathon, club, academic-resource, or placement records.

- Before Flask/SQL, records entered through the forms are stored locally in the browser so the frontend can be tested.
- The storage boundary is `src/services/repository.js`.
- Later replace those methods with Flask API calls without changing the page UI.

## Authentication

### Student
The student form validates email/password and creates a local student profile from the details the user actually enters. There is no hardcoded student account.

### TPO
Production-ready behavior expects Flask at:

`POST /api/auth/tpo/login`

with JSON:

```json
{
  "adminName": "...",
  "password": "...",
  "verificationId": "..."
}
```

For UI-only testing, you can set `VITE_LOCAL_TPO_AUTH=true`. In that mode any non-empty TPO fields are accepted. Do not use that mode in production.

## Future Flask integration

Recommended API routes:

- `POST /api/auth/tpo/login`
- `GET /api/interviews`
- `POST /api/interviews`
- `GET /api/hackathons`
- `POST /api/hackathons`
- `GET /api/clubs`
- `GET /api/clubs/:id/reviews`
- `POST /api/clubs/:id/reviews`
- `GET /api/resources`
- `POST /api/resources`
- `GET /api/placements`
- `POST /api/placements`
- `PUT /api/placements/:id`
- `GET /api/profile`
- `PUT /api/profile`

The frontend already separates data access from UI so the SQL/Flask stage can replace the local repository layer.
