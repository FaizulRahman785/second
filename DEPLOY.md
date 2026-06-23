Deployment guide

Overview
- Frontend: Vercel (Vite)
- Backend: Render (Node/Express)

Prerequisites
- GitHub repo connected to Vercel and Render or manual deploy access
- Render API key (if using GitHub Actions to trigger deployments)
- Vercel token (if using GitHub Actions to trigger deployments)

Environment variables (Render backend)
- NODE_ENV=production
- PORT=3001
- DATABASE_URL=<your postgres connection string>
- JWT_SECRET=<strong secret>
- JWT_EXPIRES_IN=7d
- CORS_ORIGIN=https://<your-vercel-app>.vercel.app

Frontend (Vercel) env
- VITE_API_URL=https://<your-render-service>.onrender.com/api
- NODE_ENV=production

Quick manual steps — Render (backend)
1. Import this repository in Render.
2. Add a new Web Service and point to `apps/backend` as the root.
3. Use `npm run build` as the build command and `npm start` as the start command.
4. Set required environment variables in Render dashboard (see list above).
5. Deploy.

Quick manual steps — Vercel (frontend)
1. Import the repository into Vercel.
2. Set the project root to repository root and build command to `vite build`, output dir `dist`.
3. Add `VITE_API_URL` environment variable to the project: `https://<your-render-service>.onrender.com/api`.
4. Deploy.

CI / GitHub Actions (optional)
- You can use the workflow templates in `.github/workflows/` to trigger deployments to Render/Vercel. They require `RENDER_API_KEY` or `VERCEL_TOKEN` secrets to be added in the GitHub repository settings.

Verifications after deploy
- Visit your Vercel frontend URL and confirm network calls to `/api/` go to your Render service URL.
- Login with seeded demo credentials (or create admin) and ensure dashboards load.
- Ensure SSE URL points to Render: `https://<render-service>.onrender.com/api/notifications/stream?token=...`

If you'd like, I can add CI workflows now (I added templates). If you want me to actually trigger deploys, provide render and vercel API tokens (or let me open a PR and you connect Render and Vercel via UI).