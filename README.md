# AFIL PM Portfolio

A premium, full-stack personal portfolio website for **AFIL PM** — Full-Stack Web Developer & Motion Graphics Designer.

## Tech Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS, glassmorphism UI, dark/light themes
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Database:** PostgreSQL + Prisma ORM (parameterized queries → SQL injection protection)
- **Authentication:** JWT (HttpOnly cookies), Argon2id password hashing
- **Validation:** Zod (server-side)
- **Security:** CSRF protection, rate limiting, secure HTTP headers, CORS, input sanitization

## Folder Structure

```
portfolio/
├── prisma/                 # Database schema & migrations
├── src/
│   ├── app/                # Next.js App Router (public + admin routes, API routes)
│   ├── components/         # Reusable UI, layout, section, form, admin components
│   ├── lib/                # Database client, auth, security utilities
│   ├── types/              # TypeScript type definitions
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets (images, videos, robots.txt, sitemap.xml)
├── .env.example            # Environment variables template
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
# Edit .env.local with your own values (DATABASE_URL, AUTH_SECRET, CSRF_SECRET, SMTP, etc.)
```

### 3. Set up the database

You need a PostgreSQL database. You can run one locally with Docker:

```bash
docker run --name portfolio-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=portfolio -p 5432:5432 -d postgres:16
```

Then push the schema and generate the Prisma client:

```bash
npm run db:generate
npm run db:push
```

### 4. Create the first admin user

Use the registration endpoint or seed script:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","username":"admin","password":"ChangeMeImmediately"}'
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Security

- Server-side input validation (Zod) on every API route
- Argon2id password hashing (never plain text)
- JWT sessions in HttpOnly, Secure, SameSite cookies
- CSRF double-submit cookie protection on state-changing endpoints
- Rate limiting on auth and contact endpoints
- Secure HTTP headers (CSP, X-Content-Type-Options, X-Frame-Options, etc.)
- Prisma parameterized queries → SQL/NoSQL injection protection
- File upload validation by type, size, and content
- Secrets only in environment variables (never in frontend code)

## Deployment

Recommended: **Vercel** with a PostgreSQL provider (e.g., Neon, Supabase, Railway).

```bash
vercel --prod
```

Set all environment variables from `.env.example` in your Vercel project settings, then run `prisma migrate deploy` against your production database.
