# Project Structure & Setup Guide

## Recommended Next.js Project Structure

```
project-name/
├── app/                          # Next.js App Router (13+)
│   ├── (auth)/                   # Route groups
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── users/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   └── route.ts
│   │   └── users/
│   │       └── [id]/
│   │           └── route.ts
│   ├── globals.css
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Global loading UI
│   ├── error.tsx                 # Global error UI
│   ├── not-found.tsx             # 404 page
│   └── page.tsx                  # Home page
├── components/                   # Reusable UI components
│   ├── ui/                       # Basic UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── index.ts              # Export all UI components
│   ├── forms/                    # Form components
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   └── index.ts
│   ├── layout/                   # Layout components
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── Footer/
│   │   └── index.ts
│   └── features/                 # Feature-specific components
│       ├── auth/
│       ├── dashboard/
│       └── profile/
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useLocalStorage.ts
│   ├── useApi.ts
│   └── index.ts
├── lib/                          # Utility libraries and configurations
│   ├── auth.ts                   # Authentication setup
│   ├── db.ts                     # Database connection
│   ├── utils.ts                  # General utilities
│   ├── validations.ts            # Form validation schemas
│   └── constants.ts              # Application constants
├── types/                        # Shared TypeScript types
│   ├── auth.ts
│   ├── user.ts
│   ├── api.ts
│   ├── common.ts
│   └── index.ts
├── utils/                        # Utility functions
│   ├── format-date.ts
│   ├── api-helpers.ts
│   ├── validation.ts
│   └── index.ts
├── store/                        # State management
│   ├── auth-slice.ts             # If using Redux Toolkit
│   ├── user-slice.ts
│   ├── store.ts
│   └── providers.tsx             # Context providers
├── styles/                       # Additional styles
│   ├── globals.css
│   ├── components.css
│   └── utilities.css
├── locales/                      # Internationalization
│   ├── en/
│   │   ├── common.json
│   │   ├── auth.json
│   │   └── dashboard.json
│   ├── es/
│   └── fr/
├── __tests__/                    # Test files
│   ├── __mocks__/                # Mock files
│   ├── setup.ts                  # Test setup
│   ├── utils.tsx                 # Test utilities
│   └── integration/              # Integration tests
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── .env.local                    # Environment variables
├── .env.example                  # Environment variables template
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
├── package.json
└── README.md
```

## Component Organization Patterns

### 1. Feature-Based Organization (Large Apps)

```
components/
├── ui/                          # Reusable UI components
│   ├── Button/
│   ├── Input/
│   └── Modal/
├── layout/                      # Layout components
│   ├── Header/
│   ├── Navigation/
│   └── Footer/
└── features/                    # Feature-specific components
    ├── auth/
    │   ├── LoginForm/
    │   ├── RegisterForm/
    │   └── PasswordReset/
    ├── dashboard/
    │   ├── DashboardStats/
    │   ├── RecentActivity/
    │   └── QuickActions/
    └── profile/
        ├── ProfileForm/
        ├── AvatarUpload/
        └── SettingsPanel/
```

## File Naming Within Components

### Component Directory Structure

```
LoginForm/
├── LoginForm.tsx                # Main component
├── LoginForm.types.ts           # TypeScript types
├── LoginForm.test.tsx           # Unit tests
├── LoginForm.stories.tsx        # Storybook stories
├── LoginForm.module.css         # CSS modules (if not using Tailwind)
├── hooks/                       # Component-specific hooks
│   └── useLoginForm.ts
├── utils/                       # Component-specific utilities
│   └── validation.ts
└── index.ts                     # Export file
```

### Index File Pattern

```typescript
// components/ui/Button/index.ts
export { Button } from "./Button";
export type { ButtonProps } from "./Button.types";

// components/ui/index.ts
export { Button } from "./Button";
export { Input } from "./Input";
export { Modal } from "./Modal";
```
