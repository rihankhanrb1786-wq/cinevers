# Deploy CINEVERS

## 1. Upload to GitHub

### GitHub website

1. Sign in at https://github.com and select **New repository**.
2. Name it `cinevers`, choose its visibility, and create it without adding a README or `.gitignore`.
3. Open the new repository, select **Add file > Upload files**, and upload the project files.
4. Do not upload `.env.local`, `.next`, `node_modules`, `outputs`, or `work`.
5. Commit the files to the `main` branch.

### Command line

Install Git first, then run these commands from the project directory:

```bash
git init
git add .
git commit -m "Deploy CINEVERS"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cinevers.git
git push -u origin main
```

## 2. Deploy with Vercel

1. Sign in at https://vercel.com using GitHub.
2. Select **Add New > Project**.
3. Import the `cinevers` GitHub repository.
4. Leave **Framework Preset** as Next.js and **Root Directory** as `./`.
5. Add these environment variables when connecting a real Supabase project:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

`SUPABASE_SERVICE_ROLE_KEY` is server-only. Never prefix it with `NEXT_PUBLIC_`.

6. Select **Deploy**.
7. After deployment, copy the production URL from the Vercel project overview.
8. If you add a custom domain, set `NEXT_PUBLIC_SITE_URL` to its full HTTPS URL and redeploy.
9. In Supabase Authentication URL Configuration, add the Vercel production URL as the Site URL and an allowed redirect URL.

The app also deploys successfully without Supabase variables in its built-in demo mode.

## 3. Automatic updates

Every push to `main` creates a new production deployment. Pull requests and other branches receive separate Vercel preview URLs.

