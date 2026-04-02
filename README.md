# Andrew & Gabbi's Wedding

Personalised RSVP web app. Each guest gets a unique magic link — on arrival the app looks up their invite in Supabase, personalises the page by guest type (Aus / Pom / Kiwi), and walks them through a scroll-driven experience: animated Three.js wedding cake destruction, ceremony and reception details, and an RSVP form.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), deployed on Vercel |
| Database | Supabase (Postgres) |
| 3D / WebGL | Three.js via `@react-three/fiber` + `@react-three/drei` |
| Scroll animation | GSAP ScrollTrigger |
| Map | Google Maps JavaScript API |
| Styling | Tailwind CSS v4 |

---

## Getting started

### Prerequisites

- Node.js 18+
- A Supabase project
- A Google Maps API key

### Installation

```bash
git clone https://github.com/andrewrmills/wedding
cd wedding
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in .env.local with your Supabase and Google Maps keys

npm run dev
```

### Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable (anon) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase secret key — server only, never expose client-side |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps JS API key |

### Database

Run `supabase/schema.sql` against your Supabase project to create the `invitees` table, RLS policies, and seed data.

### 3D model

Place your wedding cake GLTF model at `public/models/wedding-cake.glb`.

---

## How it works

Guests arrive via `/rsvp?token=<uuid>`. The server looks up the token in Supabase, personalises the page, and renders:

1. **Hero** — personalised welcome message based on guest type
2. **Cake animation** — scroll-driven Three.js cake that tips and explodes
3. **Map** — ceremony and reception location reveal
4. **RSVP form** — attendance, dietary requirements, beer preference

No login, no cookies. The token in the URL is the only auth mechanism.
