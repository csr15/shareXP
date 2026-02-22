# shareXP

A full-stack web application for sharing experiences and inspiring others. Built with React 18, Redux Toolkit, Express, and MongoDB.

## Tech Stack

| Layer     | Technology                                    |
| --------- | --------------------------------------------- |
| Client    | React 18, Redux Toolkit, React Router 6, SCSS |
| Server    | Express 4, Mongoose 8, Pino                   |
| Language  | TypeScript (strict mode)                      |
| Database  | MongoDB (Atlas or local)                      |
| Auth      | JWT (HTTP-only cookies), Google OAuth          |
| Testing   | Jest, React Testing Library, Supertest        |
| CI/CD     | GitHub Actions                                |
| Container | Docker & Docker Compose                       |

## Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB (local instance or Atlas connection string)

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd shareXP
npm install
```

This installs dependencies for both client and server workspaces.

### 2. Configure environment variables

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Edit each `.env` file with your values:

**Server** (`server/.env`):
- `MONGODB_URI` – MongoDB connection string
- `JWT_SECRET` – strong random secret for signing tokens
- `CORS_ORIGIN` – client URL (default `http://localhost:3000`)
- `GOOGLE_CLIENT_ID` – Google OAuth client ID
- `SMTP_*` – email configuration for notifications

**Client** (`client/.env`):
- `REACT_APP_API_URL` – server API URL (default `http://localhost:8080/api/v1`)
- `REACT_APP_GOOGLE_CLIENT_ID` – Google OAuth client ID
- `REACT_APP_UNSPLASH_ACCESS_KEY` – Unsplash API key for images

### 3. Run in development

```bash
npm run dev
```

This starts both the server (port 8080) and client (port 3000) concurrently.

### 4. Run with Docker

```bash
npm run docker:up
```

This builds and starts MongoDB, the server, and the client using Docker Compose.

To stop:

```bash
npm run docker:down
```

## Scripts

All scripts can be run from the project root:

| Script             | Description                                |
| ------------------ | ------------------------------------------ |
| `npm run dev`      | Start both client and server in dev mode   |
| `npm run build`    | Build both client and server for production|
| `npm test`         | Run all tests (server + client)            |
| `npm run lint`     | Lint both workspaces                       |
| `npm run docker:up`| Build and start all services with Docker   |
| `npm run docker:down`| Stop Docker services                     |

Workspace-specific scripts:

```bash
npm run dev -w server       # server only
npm start -w client         # client only
npm test -w server          # server tests
npm test -w client          # client tests
npm run build -w server     # server build
npm run build -w client     # client build
```

## Project Structure

```
shareXP/
├── .github/workflows/ci.yml    # GitHub Actions CI pipeline
├── client/                      # React 18 + Redux Toolkit frontend
│   ├── src/
│   │   ├── api/                 # Axios API layer
│   │   ├── components/          # UI components
│   │   │   ├── auth/            # Authentication views
│   │   │   ├── common/          # Shared components
│   │   │   ├── layout/          # Layout (Navigation, Container)
│   │   │   ├── profile/         # Profile management
│   │   │   ├── publish/         # Story publishing
│   │   │   ├── search/          # Search & categories
│   │   │   └── story/           # Story views & interactions
│   │   ├── pages/               # Route-level pages
│   │   ├── store/               # Redux Toolkit store & slices
│   │   ├── styles/              # Global SCSS variables
│   │   ├── types/               # TypeScript type definitions
│   │   └── utils/               # Constants & helpers
│   ├── Dockerfile
│   └── package.json
├── server/                      # Express + Mongoose backend
│   ├── src/
│   │   ├── config/              # Environment config & DB connection
│   │   ├── controllers/         # Route handlers
│   │   ├── middleware/          # Auth, error handling, rate limiting
│   │   ├── models/              # Mongoose schemas
│   │   ├── repositories/        # Data access layer
│   │   ├── routes/              # Express route definitions
│   │   ├── services/            # Business logic
│   │   ├── types/               # TypeScript type definitions
│   │   ├── utils/               # Logger, error classes
│   │   ├── app.ts               # Express app setup
│   │   └── server.ts            # Entry point
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── package.json                 # Root workspace config
```

## Testing

```bash
# All tests
npm test

# Server tests with coverage
npm test -w server -- --coverage

# Client tests in watch mode
npm test -w client
```

## Deployment

### Docker (recommended)

Build production images:

```bash
docker compose -f docker-compose.yml up --build -d
```

### Manual

```bash
npm run build
cd server && node dist/server.js
```

Serve the client build from `client/build/` using Nginx, a CDN, or any static file server.

## License

ISC
