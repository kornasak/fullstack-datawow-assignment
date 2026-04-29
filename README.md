# Full-stack Developer Assignment (Next.js + NestJS)

Free Concert Ticket Reservation System built with **Next.js**, **NestJS**, **PostgreSQL**, **Prisma**, **JWT Authentication**, and **Docker**.

---

# Setup Instructions

## Run with Docker

```bash
docker compose up -d --build
```

## Services

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Run Locally

### Backend

```bash
cd backend
pnpm install
pnpm prisma migrate deploy
pnpm start:dev
```

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

---

## Test execution commands

### Backend Unit Tests

```bash
cd backend
pnpm test
```

### Coverage

```bash
pnpm test:cov
```

---

## Features

### Authentication & Authorization

- JWT Login / Register
- Role-based access control
- Roles:
  - `ADMIN`
  - `USER`

### Admin Features

- Create concert
- Delete concert
- View all reservation history
- Dashboard summary

### User Features

- View concerts
- Reserve 1 seat per concert
- Cancel reservation

### Validation & Error Handling

- Server-side validation
- Proper HTTP exceptions
- Frontend error feedback

### Testing

- Unit tests with Jest
- Concert service tests
- Reservation service tests

---

# Libraries

## Frontend Libraries

- **Next.js** — React framework for App Router and SSR support
- **TypeScript** — Static typing
- **Tailwind CSS** — Utility-first styling
- **Axios** — HTTP client for API requests
- **React Hook Form** — Form state management
- **Zod** — Schema validation
- **React Toastify** — Toast notifications for success/error feedback
- **jwt-decode** — Decode JWT token on frontend for auth handling
- **React Icons** — Icon library for UI components
- **Sass (SCSS)** — Additional styling customization
- **openapi-typescript** — Generate TypeScript API types from Swagger/OpenAPI

## Backend Libraries

- **NestJS** — Scalable Node.js framework
- **Prisma** — Type-safe ORM for PostgreSQL
- **PostgreSQL** — Relational database for users, concerts, and reservations
- **@prisma/adapter-pg** — PostgreSQL driver adapter for Prisma v7
- **JWT / Passport** — Authentication and protected routes
- **bcrypt** — Password hashing
- **class-validator + class-transformer** — DTO validation and request transformation
- **Swagger** — API documentation and OpenAPI schema
- **Jest + ts-jest** — Unit testing for service logic

## DevOps

- Docker
- Docker Compose

---

# Project Structure

```txt
root/
├── frontend/
├── backend/
└── docker-compose.yml
```

## Frontend (Next.js)

```txt
frontend/
├── app/                # App Router pages & layouts
├── api/                # API request functions
├── components/         # Reusable UI components
├── schemas/            # Zod validation schemas
├── lib/                # Utilities / auth / axios instance
├── config/             # Static route/menu config
├── types/              # Shared TypeScript types
├── styles/             # Global SCSS styles
└── public/             # Static assets
```

## Backend (NestJS)

```txt
backend/
├── src/
│   ├── modules/        # Feature modules
│   ├── prisma/         # Prisma service/module
│   ├── common/         # Shared DTOs / types
│   └── main.ts         # App bootstrap
├── prisma/             # Prisma schema / migrations / seeds
```

### Important Folders

- `modules/auth`
  - JWT login/register
  - Guards
  - Role-based authorization

- `modules/concerts`
  - Create/Delete concerts
  - User/Admin concert listing

- `modules/reservations`
  - Reserve seat
  - Cancel reservation
  - History APIs

- `prisma/schema.prisma`
  - Database schema

- `prisma/migrations`
  - Versioned DB migrations