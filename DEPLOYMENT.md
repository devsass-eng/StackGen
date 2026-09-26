# Deploy StackGen

StackGen is configured as a single Render web service: Express serves both the frontend and API. The Render Blueprint is in `render.yaml`.

## Before creating the service

1. Put this project in a GitHub repository. `.env`, `node_modules`, and uploaded profile photos are excluded by `.gitignore`.
2. Create a hosted PostgreSQL database with SSL support and copy its connection URL. The deployment initializes the schema and inserts the curriculum only when the categories table is empty.
3. If you need the accounts or progress in your local PostgreSQL database, export and import that data separately before going live. The deployment does not copy local database data.

## Deploy on Render

1. In Render, choose **New → Blueprint**, then connect the GitHub repository.
2. Review the Blueprint and create the `stackgen` web service.
3. When prompted, set `DATABASE_URL` to the hosted PostgreSQL connection URL. Render generates `JWT_SECRET` for the service.
4. Wait for the deploy health check at `/api/health` to pass, then open the service's `onrender.com` URL and register an account.

The app uses same-origin `/api` requests, so the hosted frontend and backend share the service URL. The service runs `npm run start:deploy`, which applies the idempotent schema setup before starting Express.

## Data storage note

The database stores accounts and learning data. Profile photos are currently written to `frontend/uploads`; Render's default filesystem is ephemeral, so uploaded photos can disappear after a restart or deploy. Use object storage or a persistent disk before relying on hosted profile photo uploads.

Render's free web services can sleep when idle, and its free PostgreSQL databases expire after 30 days. Choose plans based on the site's expected use and data retention needs.
