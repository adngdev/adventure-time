# Adventure Time

A shared group app to track things you want to try and collaboratively decide what to do on adventure days.

## How It Works

1. **Wishlist** — anyone in the group adds items (restaurants, activities, places) to a shared pool with a location and a personal desire rating (1–5)
2. **Calendar** — someone creates an event by picking a day and time
3. **Propose** — for that event, select items from the wishlist as candidates
4. **Vote** — each group member rates each proposed item (1–5) and marks approve/disapprove
5. **Decide** — the items with the best ratings and approval make the cut

## Features

- Shared item wishlist with location and desire rating
- Group calendar — create events with a date and time
- Per-event item proposals selected from the wishlist
- Per-user voting: rate 1–5 + approve or disapprove each item
- Aggregated ratings and approval counts per event

## Tech Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- PostgreSQL on AWS RDS
- JWT auth via httpOnly cookies, bcryptjs for passwords
- `pg` for raw SQL queries

## Getting Started

Install dependencies, copy `.env.example` to `.env.local` and fill in your `DATABASE_URL` and `JWT_SECRET`, run the migration in `migrations/001_init.sql` against your RDS instance, then start the dev server with `npm run dev`.
