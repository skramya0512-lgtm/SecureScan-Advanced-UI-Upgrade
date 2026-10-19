# SecureScan connected prototype — safe setup notes

This is a source-only working copy based on the frontend.zip and backend.zip you supplied. Your original ZIPs and existing project files have not been modified.

## What was updated
- Registration now creates the account, signs in through the existing login endpoint, saves the returned JWT, and navigates to `/dashboard`.
- Login and registration show visible errors and always reset their loading states.
- API requests use a 20-second timeout and configurable `VITE_API_BASE_URL` rather than silently depending on a hard-coded deployment URL.
- Backend CORS has a configurable `FRONTEND_ORIGINS` allow-list with the current Netlify domain and local Vite origin as defaults.
- Removed `sequelize.sync({ alter: true })` because automatic schema alteration can risk existing data; plain `sync()` does not alter existing table definitions.
- `.env.example` files contain placeholders only; they do not include credentials.

## Before running
1. Keep a backup of the current project and database.
2. Copy the relevant source folders into your existing project only after reviewing the changes.
3. Configure the real backend environment variables in Render and set `FRONTEND_ORIGINS` to the exact frontend origins you use.
4. In Netlify, set `VITE_API_BASE_URL` to the correct Render API URL, including `/api`, then trigger a new frontend deploy.
5. In Render, verify MySQL credentials and set `JWT_SECRET` to a long random value. Never commit `.env` files.
6. Run `npm install` and `npm run build` inside `frontend`; run `npm install` and `npm start` inside `backend`.

## Important limitations
- This ZIP is a code prototype based on the supplied source; it is not deployed or tested against your private Render/MySQL service from this environment.
- Existing database rows are not copied into this ZIP. Do not drop/recreate the database. Confirm the database backup before any schema or provider changes.
- The scanner is a basic HTTP-header/HTTPS checker, not a full penetration-testing tool. Scan only websites you own or are authorized to assess.
