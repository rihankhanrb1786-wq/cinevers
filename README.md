# CINEVERS

A premium free OTT streaming experience built with Next.js, TypeScript, Tailwind CSS and Supabase.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app runs in a complete demo mode without environment variables. Add Supabase credentials to enable real authentication.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Add the project URL and anonymous key to `.env.local`.
4. Create an admin user, then set its `profiles.role` to `admin`.

The schema includes profiles, titles, watchlists, progress, likes, comments, storage buckets and row-level security policies.

## Production notes

- Replace demo catalog data with queries from the `videos` table.
- For scalable playback, connect the upload flow to a transcoding provider and store adaptive HLS manifests in `video_url`.
- Configure your production domain in Supabase Auth.
- Set `NEXT_PUBLIC_SITE_URL` when using a custom domain. Vercel deployment URLs are detected automatically.

## Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for GitHub and Vercel deployment instructions.
