# 🌐 Language Exchange App (MeGoodSpeak)

A multilingual platform designed to help users connect, communicate, and exchange languages in real time. Built with a scalable fullstack architecture using **Next.js**, **TypeScript**, **Tailwind CSS**, **Node.js**, and **MongoDB (Mongoose)**.

## Features (Planned & In Progress)

- Secure user authentication and profile management
- One-on-one messaging 
- Notification system for unread messages, activity, and promotions
- Language preference matching and interface localization
- Admin dashboard for moderation and analytics

## 🛠 Tech Stack

| Layer        | Tools & Frameworks                   |
|--------------|--------------------------------------|
| Frontend     | Next.js, TypeScript, Tailwind CSS    |
| Backend      | Node.js, Express, Mongoose, MongoDB  |
| Authentication | JWT + middleware (WIP)            |
| Deployment   | Docker, Vercel / AWS (TBD)           |
| Testing      | Jest + React Testing Library (TBD)   |

## Project Structure

This is a monorepo using npm workspaces with the following structure:

```
├── package.json          # Root package with workspace configuration
├── package-lock.json     # Single lockfile for entire project
├── frontend/             # Next.js frontend application
├── backend/              # Express.js backend API
├── shared/               # Shared types and utilities
└── docs/                 # Project documentation
```

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm 9+
- MongoDB

### Installation

Install all dependencies for both frontend and backend:

```bash
npm install
```

### Development Commands

**Start both frontend and backend in development mode:**
```bash
# Frontend (Next.js dev server)
npm run dev --workspace=frontend

# Backend (Express.js with hot reload)  
npm run dev --workspace=backend
```

**Build for production:**
```bash
# Build frontend
npm run build --workspace=frontend

# Build backend  
npm run build --workspace=backend

# Build both
npm run build --workspaces
```

**Other useful commands:**
```bash
# Lint frontend
npm run lint --workspace=frontend

# Run specific workspace command
npm run <script> --workspace=<frontend|backend>

# Run command in all workspaces
npm run <script> --workspaces
```

## Architecture

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Express.js with TypeScript, MongoDB, JWT authentication  
- **Shared**: Common interfaces and utilities
- **Documentation**: Comprehensive TSDoc comments throughout

## Current Implementation Status

### ✅ Completed Features
- User registration and authentication flow
- Language learning profile management
- Responsive design with modern UI components
- Type-safe API with comprehensive validation
- Service layer architecture
- Comprehensive error handling
- Form state management with custom hooks
- Cross-platform TypeScript configuration

### 🚧 In Development
- Enhanced authentication middleware
- Real-time messaging system
- Language matching algorithms
- Admin dashboard interface

## Documentation

- [Coding Standards](coding-standards.md)
- [Architecture Documentation](ARCHITECTURE.md)
- [Data Flow Diagrams](DATA_FLOW.md)
- [Git Workflow](git-workflow.md)
- [Project Structure](project-structure.md)
- [Testing Guide](testing-guide.md)
- [Internationalization Guide](i18n-guide.md)

## Contributing

Please read our [coding standards](coding-standards.md) and [git workflow](git-workflow.md) before contributing.

## License

See [LICENSE](../LICENSE) file for details.

