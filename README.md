## project stucture
Root director/
    ├── index.html
    ├── package.json
    ├── tailwind.config.cjs
    ├── postcss.config.cjs
    └── src/
        ├── main.jsx
        ├── index.css
        ├── App.jsx
        ├── services/api.js
        ├── routes/PrivateRoute.jsx
        ├── components/
        └── pages/
##  Prerequisites

* Node.js v14+ & npm
* MongoDB URI (local or Atlas)
* (Optional) `git` to clone the repo

---

##  Environment Variables

Copy `.env.example` to `.env` in the `client/` folder and fill in:

```
VITE_API_BASE = https://task-distributor-backend.onrender.com/api
```

## Frontend Setup (Vite + React + Tailwind)

1. **Install dependencies**

   
   cd client
   npm install
   

2. **Start Vite dev server**

   
   npm run dev
   

   * Frontend served at `http://localhost:5173`

3. **Build for production**

   
   npm run build
   

---
##  Workflow

1. **Admin Login**

   * Email: `admin@example.com`
   * Password: `adminpass`

2. **Agents Management**

   * Create new agents via the “Add Agent” form.
   * View all agents in a responsive grid.

3. **CSV Upload & Distribute**

   * Prepare a CSV with columns `FirstName,Phone,Notes`.
   * Upload under “Upload CSV” and the system evenly assigns rows to agents.

4. **Agent View**

   * Agents log in with their seeded credentials (e.g. `agent1@example.com` / `agentpass`).
   * They see only their assigned tasks under “My Tasks.”

---

##  Usage Notes

* All protected routes require a valid JWT stored in `localStorage`.
* Frontend automatically attaches the token via Axios interceptor.
* Any network or validation errors surface inline as banners or field errors.
