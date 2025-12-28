# NEXURA Frontend

Next.js 15 frontend application for the NEXURA Behavioral Intelligence System.

## Development

```bash
npm run dev    # Start development server on port 3001
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Tech Stack

- Next.js 15 (App Router)
- React 18
- TypeScript
- TailwindCSS
- Framer Motion
- Recharts
- Lucide React