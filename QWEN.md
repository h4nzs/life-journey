# Life Journey Tracker - Development Context

## Project Overview

**Life Journey Tracker** is a full-stack web application that helps users map their life journey by recording:
- **Goals** (tujuan) - Life objectives and aspirations
- **Steps** (perjalanan) - Actions taken towards goals
- **Obstacles** (rintangan) - Challenges encountered
- **Emotions** (emosi) - Emotional responses to obstacles

This application serves as a medium for self-reflection and personal growth tracking, following the structure from the song "Surga Hati" lyrics meaning.

## Architecture

### Backend
- **Framework**: Node.js with Express.js (v5.1.0)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with access and refresh tokens
- **Validation**: Zod for input validation
- **Security**: Helmet, CORS, bcrypt for password hashing
- **Structure**: Clean architecture with controllers, services, and middleware

### Frontend
- **Framework**: React with Vite
- **Styling**: TailwindCSS
- **Routing**: React Router
- **Data Fetching**: TanStack React Query
- **State Management**: Zustand
- **HTTP Client**: Axios

## Database Schema

The application follows an ERD structure:
```
Tokoh_Utama -> Tujuan -> Perjalanan -> Rintangan -> Emosi
```

### Tables
1. `tokoh_utama` - User profile (tekad, keimanan, kondisi_jiwa)
2. `tujuan` - Life goals (jenis_tujuan, hasil)
3. `perjalanan` - Steps towards goals (ketahanan, arah)
4. `rintangan` - Obstacles faced (jenis_rintangan)
5. `emosi` - Emotional responses (jenis_emosi)

## API Endpoints

### Authentication
- `POST /auth/register`
- `POST /auth/login`

### User Profile (Tokoh)
- `GET /tokoh/me`
- `PUT /tokoh/me`

### Goals (Tujuan)
- `GET /tujuan`
- `POST /tujuan`
- `PUT /tujuan/:id`
- `DELETE /tujuan/:id`

### Steps (Perjalanan)
- `GET /tujuan/:id/perjalanan`
- `POST /tujuan/:id/perjalanan`
- `PUT /perjalanan/:id`
- `DELETE /perjalanan/:id`

### Obstacles (Rintangan)
- `GET /perjalanan/:id/rintangan`
- `POST /perjalanan/:id/rintangan`
- `PUT /rintangan/:id`
- `DELETE /rintangan/:id`

### Emotions (Emosi)
- `GET /rintangan/:id/emosi`
- `POST /rintangan/:id/emosi`
- `PUT /emosi/:id`
- `DELETE /emosi/:id`

### Dashboard
- `GET /dashboard/stats`

## Building and Running

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- pnpm (or npm)

### Backend Setup
```bash
cd backend
cp .env.example .env  # Update with your database credentials
pnpm install
npx prisma migrate dev
pnpm run dev
```

### Frontend Setup
```bash
cd frontend
pnpm install
pnpm run dev
```

### Using Docker
The project includes a docker-compose.yml file that sets up PostgreSQL:
```bash
docker-compose up -d
```

### Environment Variables
Backend `.env` file should contain:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - Refresh token signing secret
- `PORT` - Server port (default: 5000)

## Development Conventions

### Backend Structure
- `/api/routes` - Express route definitions
- `/controllers` - Request handling logic
- `/services` - Business logic
- `/middlewares` - Express middleware
- `/validations` - Zod validation schemas
- `/config` - Configuration files
- `/utils` - Utility functions

### Frontend Structure
- `/src/pages` - Route components
- `/src/components` - Reusable UI components
- `/src/api` - API service calls
- `/src/hooks` - Custom React hooks
- `/src/store` - Zustand stores
- `/src/layouts` - Layout components

### Coding Standards
- Use camelCase for JavaScript variables/functions
- Use PascalCase for React components
- Follow RESTful API design principles
- Use async/await for asynchronous operations
- Implement proper error handling
- Use Zod for validation schemas
- Follow TailwindCSS utility-first approach

## Key Features

### MVP Features
1. **Authentication** - Register, login, logout with JWT
2. **Profile Management** - Update user profile (tekad, keimanan, kondisi_jiwa)
3. **Goal Tracking** - Create, read, update, delete life goals
4. **Step Tracking** - Track steps taken towards each goal
5. **Obstacle Logging** - Record obstacles encountered during the journey
6. **Emotion Tracking** - Log emotional responses to obstacles
7. **Dashboard Insights** - Statistics on emotions, obstacles, goal progress, and timeline

### Dashboard Insights
- Most frequent emotions analysis
- Dominant obstacles identification
- Goal progress tracking
- User journey timeline

## File Structure
```
/home/kenz/life-journey/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   └── routes/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validations/
│   ├── .env
│   ├── package.json
│   └── prisma/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── layouts/
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── project-summary.md
```

## Development Notes

The project was scaffolded using Gemini CLI following the specifications in `gemini.config`. The application is designed to be production-ready with security best practices, proper error handling, and clean architecture principles.

The database uses Prisma with PostgreSQL adapter for robust database operations. The frontend uses React Query for efficient data fetching and caching, which is essential for a smooth user experience with real-time updates.