# Turborepo Full-Stack Project Rules (Next.js, NestJS, Prisma)

## 1. Technical Stack

- **Workspace**: Turborepo (using `pnpm`)
- **Language**: TypeScript (Strict mode)
- **Frontend (`apps/frontend`)**: Next.js 15 (App Router)
- **Backend (`apps/backend`)**: NestJS
- **Database & ORM**: Prisma ORM (PostgreSQL/MySQL)
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI (Radix UI)
- **Icons**: Lucide React
- **Validation**: Zod (Shared across frontend and backend)

## 2. General Principles

- **No 'any'**: Never use the `any` type. Define proper interfaces or types.
- **Functional Components (Frontend)**: Use arrow functions for all React components.
- **Client vs Server (Frontend)**: Default to Server Components. Use `'use client'` only when interactivity (useState, useEffect) or browser APIs are required.
- **Dependency Injection (Backend)**: Strictly follow NestJS module and dependency injection architecture.
- **Clean Code**: Follow DRY (Don't Repeat Yourself) and SOLID principles.

## 3. Naming Conventions

- **React Components**: PascalCase (e.g., `UserButton.tsx`)
- **Next.js App Router**: kebab-case (e.g., `user-profile/page.tsx`)
- **React Utils/Hooks**: camelCase (e.g., `useLocalStorage.ts`)
- **NestJS Files**: dot notation (e.g., `user.controller.ts`, `user.service.ts`, `user.dto.ts`)

## 4. Folder Structure Standards

The monorepo must follow this structure:

- `/packages/database`: Prisma schema (`schema.prisma`), migrations, and generated Prisma Client. (Shared package)
- `/apps/frontend/src/app`: All Next.js routes and layouts.
- `/apps/frontend/src/components/ui`: Atomic components (Shadcn).
- `/apps/frontend/src/components/shared`: Reusable business components.
- `/apps/frontend/src/lib`: Frontend utilities and API clients.
- `/apps/backend/src`: NestJS modules, controllers, services, and DTOs.

## 5. Agent-Specific Instructions

- **Plan First**: Before writing code or running setup commands, summarize the plan in the chat and ask for confirmation.
- **Check Environment**: Always verify if required environment variables (especially `DATABASE_URL` for Prisma) exist in `.env.example` before implementation.
- **Verify Build**: After significant changes, run `pnpm build` or `turbo build` to ensure no regressions across all apps.
- **Error Handling**: Always wrap async operations in try-catch blocks (or use NestJS Exception Filters for the backend). Use Zod for input validation.
- **Shadcn UI Usage**: This project uses Shadcn UI. The components are NOT pre-installed. If you need a UI component (e.g., Button, Card, Dialog), you MUST run the command `npx shadcn@latest add <component_name>` inside the `apps/frontend` directory to generate it before attempting to import it from `@/components/ui/...`.

## 6. CSS & UI

- Use Tailwind CSS for all styling.
- Avoid inline styles.
- Ensure responsive design (mobile-first).

## 7. Prisma & Database Standards

- **Data Access Layer (DAL) Isolation**: All database-related configurations MUST be strictly isolated inside the `packages/database` directory. Do NOT create `schema.prisma` or direct database connections inside the backend application folder.
- **NestJS Integration**: The `packages/database` acts as an internal shared library. It must encapsulate the Prisma Client and export a NestJS-compatible `PrismaModule` and `PrismaService`.
- **Backend Usage**: Whenever the backend needs database access, it MUST import `PrismaModule` and `PrismaService` from the internal package (`packages/database`). Keep the backend clean from database infrastructural code.
- **Schema Location**: Maintain the `schema.prisma` file inside `packages/database/prisma`.
- **Client Generation**: Ensure the Prisma Client and Types are generated and exported properly so both `apps/backend` and `apps/frontend` (if needed for server actions) can import them.
- **Migrations**: Always generate migrations for schema changes using `npx prisma migrate dev` within the `packages/database` directory.
