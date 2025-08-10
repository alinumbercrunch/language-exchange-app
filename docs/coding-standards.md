# Coding Standards & Conventions

## File Naming Conventions

### Components
```
✅ CORRECT:
PascalCase for component files
- LoginForm.tsx
- UserProfile.tsx
- ChatMessage.tsx

❌ AVOID:
- loginForm.tsx
- login-form.tsx
- login_form.tsx
```

### Hooks
```
✅ CORRECT:
camelCase starting with "use"
- useAuth.ts
- useLocalStorage.ts
- useDebounce.ts

❌ AVOID:
- UseAuth.ts
- use-auth.ts
- authHook.ts
```

### Utilities
```
✅ CORRECT:
kebab-case for utility files
- format-date.ts
- api-helpers.ts
- validation.ts

❌ AVOID:
- FormatDate.ts
- formatDate.ts
```

### Pages & API Routes

**App Router:**
```
✅ CORRECT:
- app/login/page.tsx
- app/dashboard/page.tsx
- app/users/[id]/page.tsx
- app/api/auth/route.ts
- app/api/users/[id]/route.ts
```

**Pages Router:**
```
✅ CORRECT:
- pages/login.tsx
- pages/dashboard.tsx
- pages/users/[id].tsx
- pages/api/auth.ts
- pages/api/users/[id].ts
```

## Casing Conventions

### Components & Classes
```typescript
// ✅ PascalCase
export const LoginForm: React.FC = () => {};
export class ApiClient {}
export interface UserProfile {}
export type AuthStatus = "idle" | "loading";
```

### Functions & Variables
```typescript
// ✅ camelCase
const handleSubmit = () => {};
const isAuthenticated = true;
const userPreferences = {};
```

### Constants
```typescript
// ✅ SCREAMING_SNAKE_CASE for global constants
export const API_BASE_URL = "https://api.example.com";
export const MAX_RETRY_ATTEMPTS = 3;

// ✅ camelCase for local constants
const defaultOptions = { timeout: 5000 };
```

### Enums
```typescript
// ✅ PascalCase for enum name, PascalCase for values
export enum UserRole {
  Admin = "admin",
  User = "user",
  Guest = "guest"
}

// ✅ Alternative: const assertion (preferred)
export const UserRole = {
  Admin: "admin",
  User: "user",
  Guest: "guest"
} as const;
```

## Code Quality Standards

### ESLint Configuration
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "error",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Development Standards

- **Use TypeScript strictly** - No `any` without justification
- **Prefer functional components** with hooks
- **Use custom hooks** for business logic
- **Keep components small** - Single responsibility
- **Use meaningful names** - Self-documenting code
- **Handle errors gracefully** - Try-catch, error boundaries
- **Optimize performance** - useMemo, useCallback when needed

### Error Handling
```typescript
// Global error boundary - app/error.tsx
"use client";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### API Route Standards
```typescript
// app/api/users/route.ts
export async function GET(request: Request) {
  try {
    const users = await fetchUsers();
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
```

### Performance Guidelines

#### Image Optimization
```typescript
// ✅ Use Next.js Image component
import Image from "next/image";

<Image
  src="/profile-pic.jpg"
  alt="Profile"
  width={200}
  height={200}
  priority={isAboveFold}
/>;
```

#### Memoization
```typescript
// ✅ Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ✅ Memoize callback functions
const handleClick = useCallback(() => {
  onAction(id);
}, [onAction, id]);
```