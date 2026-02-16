# kanban

A full‑stack **Task Management Boards** application built as a test assignment.
The project demonstrates clean architecture, modern React state management, drag‑and‑drop UX, and a typed backend API.

---

## Table of Contents

* [Deployment](#-deployment)
* [Requirements](#-requirements)
* [Project Overview](#-project-overview)
* [Getting Started](#-getting-started)

  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
* [Backend Architecture](#-backend-architecture)

  * [Tech Stack](#tech-stack)
  * [Database Structure](#database-structure)
  * [Modules, Controllers & Services](#modules-controllers--services)
  * [API Endpoints](#api-endpoints)
* [Frontend Architecture](#-frontend-architecture)

  * [Tech Stack](#tech-stack-1)
  * [State Management (RTK)](#state-management-rtk)
  * [Drag & Drop](#drag--drop)
  * [Project Structure](#project-structure)
* [Testing](#-testing)

---
## Deployment
The application is fully deployed using modern cloud platforms.

### Production Stack
- backend - Railway
- frontend - Vercel
- Database - PostgreSQL (on Railway)

Link for delpoy project: https://kanban-seven-sigma.vercel.app

---

## Requirements

Before running the project, make sure you have:

* **Node.js** >= 20
* **npm** or **yarn**
* **PostgreSQL** >= 14

---

## Project Overview

Each visitor can:

* Create, update and delete **boards** (anonymous access)
* Access a board by its **unique hashed ID**
* Manage **cards** inside 3 fixed columns:

  * ToDo
  * In Progress
  * Done
* Drag & drop cards between columns
* Reorder cards inside a column

No authentication is required.

---

## Getting Started

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/kanban"
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the backend:

```bash
npm run start:dev
```

Backend will be available at:

```
http://localhost:3000
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend will be available at:

```
http://localhost:5173
```

---

## Backend Architecture

### Tech Stack

* **Nest.js** — backend framework
* **TypeScript** — strict typing
* **Prisma ORM** — database access
* **PostgreSQL** — relational database
* **ESLint + Prettier** — code quality

---

### Database Structure

#### Board

| Field     | Type     | Description             |
| --------- | -------- | ----------------------- |
| id        | UUID     | Unique board identifier |
| name      | String   | Board name              |

#### Task

| Field       | Type     | Description               |
| ----------- | -------- | ------------------------- |
| id          | UUID     | Unique task identifier    |
| title       | String   | Task title                |
| description | String   | Task description          |
| type        | Enum     | TODO / IN_PROGRESS / DONE |
| position    | Int      | Order inside column       |
| boardId     | UUID     | Reference to Board        |

---

### Modules, Controllers & Services

#### Boards

* **BoardsController**

  * Create board
  * Get board by ID
  * Update board
  * Delete board

* **BoardsService**

  * Business logic for board lifecycle

---

#### Tasks

* **TasksController**

  * Create task
  * Update task
  * Delete task
  * Reorder tasks (drag & drop)

* **TasksService**

  * Task ordering logic
  * Column transitions
  * Optimistic reorder handling

---

### API Endpoints

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| POST   | /boards        | Create a board      |
| GET    | /boards/:id    | Get board by ID     |
| PATCH  | /boards/:id    | Update board        |
| DELETE | /boards/:id    | Delete board        |
| POST   | /tasks         | Create task         |
| PATCH  | /tasks/:id     | Update task         |
| DELETE | /tasks/:id     | Delete task         |
| PATCH  | /tasks/reorder | Reorder tasks (DnD) |

---

## Frontend Architecture

### Tech Stack

* **React** (hooks only)
* **TypeScript**
* **Redux Toolkit (RTK)** — state management
* **dnd-kit** — drag & drop
* **Vite** — build tool
* **ESLint + Prettier** — code quality

---

### State Management (RTK)

* Centralized store in `src/store`
* Feature-based slices in `src/features`
* Redux Toolkit slices:

  * `boardSlice`
  * `tasksSlice`
* Async logic via `createAsyncThunk`
* Optimistic updates for drag & drop

Custom hooks act as **adapters** between RTK and UI components.

---

### Drag & Drop

* Implemented using **dnd-kit**
* Supports:

  * Reordering tasks inside a column
  * Moving tasks between columns

* Optimized with:

  * `useMemo`
  * `useCallback`
  * Minimal re-renders
---

## Testing

* **Jest** is used for unit testing on the frontend
* Reducer tests for:

  * `boardSlice`
  * `tasksSlice`
* Focus on:

  * Pure reducer logic
  * Optimistic reorder behavior

Run tests:

```bash
npm run test
```

---

## Final Notes

This project focuses on:

* Clean architecture
* Predictable state management
* Real‑world drag & drop UX
* Typed backend‑frontend integration

