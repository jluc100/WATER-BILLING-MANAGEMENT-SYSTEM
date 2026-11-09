# Deploy Smart Water Bill (Vercel + Render)

| Service | URL |
|---------|-----|
| **Frontend** (Vercel) | https://water-bill-gamma.vercel.app |
| **Backend API** (Render) | https://water-bill-7kuy.onrender.com |

The frontend calls the API at `https://water-bill-7kuy.onrender.com/api`.

---

## 1. Render (backend)

In [Render Dashboard](https://dashboard.render.com) → your **water-bill** service → **Environment**:

| Variable | Value |
|----------|--------|
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://water-bill-gamma.vercel.app` |
| `ALLOWED_ORIGINS` | `https://water-bill-gamma.vercel.app,http://localhost:5173` |
| `SUPABASE_URL` | `https://YOUR_PROJECT.supabase.co` (no `/rest/v1`) |
| `SUPABASE_SERVICE_ROLE_KEY` | your service role key |
| `ADMIN_REGISTRATION_SECRET` | `AdminSeedSecret123!` (must match admin “create user” in dashboard) |
| `SUPABASE_INSECURE_SSL` | `true` |
| `SEED_ADMIN_EMAIL` | `admin@smartwaterbill.local` (optional) |
| `SEED_ADMIN_PASSWORD` | `Admin123!` (optional) |

**Settings:**
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

After saving env vars, click **Manual Deploy** → **Deploy latest commit**.

Test: https://water-bill-7kuy.onrender.com/api/health

---

## 2. Vercel (frontend)

In [Vercel Dashboard](https://vercel.com) → project **water-bill-gamma** → **Settings** → **Environment Variables**:

| Variable | Value |
|----------|--------|
| `VITE_API_URL` | `https://water-bill-7kuy.onrender.com/api` |
| `VITE_WHATSAPP_NUMBER` | `0781011343` |
| `VITE_ADMIN_REGISTRATION_SECRET` | `AdminSeedSecret123!` (same as Render `ADMIN_REGISTRATION_SECRET`) |

Apply to **Production**, **Preview**, and **Development**.

**Settings:**
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

Redeploy after changing env vars (Vite bakes `VITE_*` at build time).

---

## 3. Local development

**backend/.env**
```env
FRONTEND_URL=http://localhost:5173
```

**frontend/.env**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 4. Troubleshooting

| Problem | Fix |
|---------|-----|
| CORS error in browser | Set `ALLOWED_ORIGINS` on Render to include exact Vercel URL (no trailing slash) |
| Login fails / network error | Open Render URL `/api/health`; wake free tier by visiting site first |
| 404 on Vercel refresh | `frontend/vercel.json` rewrites must be deployed |
| Wrong API URL | Rebuild Vercel after setting `VITE_API_URL` |

### Create admin (production)

After deploy, run once (replace secret if you changed it):

```bash
curl -X POST https://water-bill-7kuy.onrender.com/api/auth/ensure-admin \
  -H "Content-Type: application/json" \
  -d "{\"setupSecret\":\"AdminSeedSecret123!\"}"
```

Or locally: `cd backend && npm run create-admin`

**Login:** `admin@smartwaterbill.local` / `Admin123!` → Admin dashboard → **Users** → create manager/customer accounts.

### CORS error fix

If login shows CORS blocked from `water-bill-gamma.vercel.app`, redeploy Render after pulling latest code (CORS allows Vercel by default). Set on Render:

`ALLOWED_ORIGINS=https://water-bill-gamma.vercel.app,http://localhost:5173`
