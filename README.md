# StationeryShop 🖊️

PenShop is a modern, full-stack monorepo built with **Turborepo**. It features a **Next.js 15** frontend, a **NestJS** backend, and a shared **Prisma** database package.

## 🚀 Technical Stack

- **Monorepo / Workspace**: [Turborepo](https://turbo.build/) & `pnpm`
- **Language**: TypeScript (Strict mode)
- **Frontend (`apps/frontend`)**: [Next.js 16](https://nextjs.org/) (App Router), Tailwind CSS, Shadcn UI
- **Backend (`apps/backend`)**: [NestJS](https://nestjs.com/)
- **Database & ORM (`packages/database`)**: [Prisma ORM](https://www.prisma.io/) (PostgreSQL/MySQL)
- **Environment Management**: `dotenvx` handles securely passing `.env` variables to all packages.

## 📁 Folder Structure

```
Stationery-shop/
├── apps/
│   ├── frontend/         # Next.js 16 web application
│   └── backend/          # NestJS API handling business logic
├── packages/
│   └── database/         # Shared Prisma schema, migrations, and NestJS PrismaModule
├── package.json          # Root workspace configuration
└── turbo.json            # Turborepo task definitions
```

## 🛠️ Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (>= 20.0.0)
- [pnpm](https://pnpm.io/) (>= 9.0.0)
- Docker (for standing up your local database)

## 🏁 Getting Started

1. **Clone the repository and install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up Environment Variables:**
   Copy the example environment variables file and fill in your database credentials:
   ```bash
   cp .env.example .env
   ```
   *(Ensure you have a database running on the URL defined in your `.env`)*

3. **Generate Prisma Client and Run Migrations:**
   ```bash
   pnpm db:generate
   pnpm db:migrate:dev
   ```

4. **Start the Development Server:**
   This command uses Turborepo to start both the Frontend and Backend concurrently using `dotenvx`:
   ```bash
   pnpm dev
   ```

## 📜 Available Scripts (Root)

Run these scripts from the root directory using `pnpm <script>`:

- `dev`: Start all apps in development mode.
- `build`: Build all apps and packages for production.
- `lint`: Run ESLint across the workspace.
- `format`: Format code using Prettier.
- `type-check`: Run TypeScript type checking on all packages.
- `clean`: Clean the Turbo cache and remove all `node_modules`.

### 🗄️ Database Scripts

- `db:generate`: Generate Prisma Client.
- `db:migrate:dev`: Run migrations for development.
- `db:studio`: Open Prisma Studio to view database records.
- `db:migrate:reset`: Reset the database and re-apply all migrations.

## 📐 Architecture & Standards

- **Shared DAL**: The database layer is isolated in `packages/database`. The backend utilizes the shared `PrismaModule` rather than keeping `.prisma` files inside its `src/` folder.
- **Frontend Components**: All atomic UI components are isolated using Shadcn UI. Default to Server Components where interactivity isn't needed.

## 📝 License

This project is proprietary and confidential.
