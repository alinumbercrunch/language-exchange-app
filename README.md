# Language Exchange App (MeGoodSpeak)

A modern language exchange platform built with Next.js, Express.js, and MongoDB.

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

## Features

- User registration and authentication
- Language learning profile management
- Responsive design with modern UI components
- Type-safe API with comprehensive validation
- Service layer architecture
- Comprehensive error handling

## Documentation

- [Coding Standards](docs/coding-standards.md)
- [Architecture Documentation](docs/ARCHITECTURE.md)
- [Data Flow Diagrams](docs/DATA_FLOW.md)
- [Git Workflow](docs/git-workflow.md)

## License

See [LICENSE](LICENSE) file for details.
