# Bhabhi-Deck

**Bhabhi-Deck** is an online multiplayer card game built with **Next.js 14 (App Router)**, **React**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **Supabase Authentication**. Play the classic Bhabhi card game with friends in real-time!

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Project Structure](#project-structure)
- [Authentication](#authentication)

---

## Overview

Bhabhi-Deck is a modern web-based card game platform featuring:
- User authentication and profile management
- Real-time multiplayer game rooms
- Beautiful dark theme UI with red accents
- Full-stack architecture with Next.js and PostgreSQL

---

## Features

### ✅ Implemented
- **Authentication System**
  - Email/password sign up and login
  - Google OAuth integration
  - Protected routes with middleware
  - User sessions and state management

- **User Interface**
  - Modern responsive landing page
  - Interactive game board with card animations
  - Room creation and joining system
  - User profile with statistics
  - Tutorial page
  - Conditional navigation (logged in/out states)

- **Database & Backend**
  - PostgreSQL database with Prisma ORM
  - User management and statistics tracking
  - Game state persistence
  - Database migrations

- **UI/UX**
  - Dark theme with customizable red accents
  - Responsive design for all screen sizes
  - ShadCN UI components
  - Smooth animations with Framer Motion

### 🚧 In Progress
- Real-time multiplayer gameplay
- Game logic implementation
- WebSocket integration for live updates

---

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI, Radix UI
- **Icons**: Lucide React, React Icons
- **Animations**: Framer Motion
- **Forms**: React Hook Form

### Backend
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **API**: Next.js API Routes

### DevOps
- **Version Control**: Git
- **Package Manager**: npm/pnpm
- **Deployment**: Vercel-ready

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/sehtaj/bhabhi-deck.git
cd bhabhi-deck
```

2. **Install dependencies:**

```bash
npm install
# or
pnpm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory (see [Environment Variables](#environment-variables))

4. **Set up the database:**

```bash
npx prisma generate
npx prisma migrate dev
```

5. **Run the development server:**

```bash
npm run dev
# or
pnpm dev
```

6. **Open http://localhost:3000 in your browser**

---

## Database Setup

### Prerequisites
- PostgreSQL database (we use Supabase)
- Supabase account (free tier works)

### Steps

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Get your connection string** from Supabase dashboard → Settings → Database

3. **Run migrations:**

```bash
npx prisma migrate dev --name init
```

4. **Generate Prisma Client:**

```bash
npx prisma generate
```

### Database Schema

The database includes:
- **User**: Player accounts with stats tracking
- **Game**: Game sessions with room codes and state
- **Participant**: Player-game relationships with hands and scores
- **UserStats**: Aggregated player statistics

---

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# App Configuration (optional)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Get these from your Supabase project:**
- `NEXT_PUBLIC_SUPABASE_URL`: Project Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Project Settings → API → anon/public key
- `DATABASE_URL`: Project Settings → Database → Connection string

---

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Run production build
npm run lint        # Run ESLint

npx prisma studio   # Open Prisma Studio (database GUI)
npx prisma migrate dev  # Create and apply migrations
npx prisma generate     # Generate Prisma Client
```

### Development Workflow

1. Make changes to your code
2. If you modify the Prisma schema, run:
   ```bash
   npx prisma migrate dev --name description_of_changes
   ```
3. Test locally
4. Commit and push to GitHub

---

## Project Structure

```
bhabhi-deck/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── (routes)/
│   │   │   ├── play/          # Game board
│   │   │   ├── room/          # Room creation/joining
│   │   │   ├── profile/       # User profile
│   │   │   ├── tutorial/      # Game tutorial
│   │   │   └── login/         # Authentication
│   │   ├── api/               # API routes
│   │   ├── auth/              # Auth callbacks
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── auth/              # Auth guard components
│   │   ├── game/              # Game-specific components
│   │   ├── hero/              # Landing page sections
│   │   ├── layout/            # Navbar, Footer
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
│   │   └── supabase/          # Supabase clients
│   ├── styles/                # Global styles
│   └── middleware.ts          # Route protection middleware
├── public/                    # Static assets
└── package.json
```

---

## Authentication

### Features
- Email/password authentication
- Google OAuth
- Protected routes (automatic redirects)
- User session management
- Profile avatars

### Protected Routes
- `/play` - Immediate redirect to login if not authenticated
- `/room` - Shows login prompt on page
- `/profile` - Shows login prompt on page

### Usage

Users can:
1. Sign up with email/password or Google
2. Log in to access game features
3. View their profile and stats
4. Create/join game rooms
5. Log out from the navbar

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

**Sehtaj Singh**
- GitHub: [@sehtaj](https://github.com/sehtaj)

---

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [ShadCN UI](https://ui.shadcn.com/)
- Database powered by [Supabase](https://supabase.com/)
- ORM by [Prisma](https://www.prisma.io/)

