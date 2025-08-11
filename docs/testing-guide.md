# Testing Strategy & Guidelines

## Directory Structure

```
src/
├── components/
│   └── LoginForm/
│       ├── LoginForm.tsx
│       ├── LoginForm.test.tsx      # Unit tests
│       └── LoginForm.stories.tsx   # Storybook stories
├── hooks/
│   └── useAuth/
│       ├── useAuth.ts
│       └── useAuth.test.ts
├── utils/
│   └── validation/
│       ├── validation.ts
│       └── validation.test.ts
└── __tests__/
    ├── integration/               # Integration tests
    ├── e2e/                      # End-to-end tests
    └── setup.ts                  # Test setup
```

## Test File Naming

```
✅ CORRECT:
- Component.test.tsx       (Unit tests)
- Component.spec.tsx       (Alternative)
- Component.stories.tsx    (Storybook)
- integration.test.ts      (Integration)
- e2e.test.ts             (E2E)

❌ AVOID:
- Component.tests.tsx
- test-component.tsx
- ComponentTest.tsx
```

## When to Write Tests

### ✅ ALWAYS Test

**Utility Functions**
- Pure functions, calculations, validations
- Data transformations, formatters
- Business logic functions

**Custom Hooks**
- State management logic
- API calls and data fetching
- Complex business logic

**API Functions**
- Data fetching functions
- Request/response transformations
- Error handling logic

**Critical User Flows**
- Authentication processes
- Payment/checkout flows
- Data submission forms
- User registration/onboarding

### ✅ OFTEN Test

**Component Behavior**
- User interactions (clicks, form submissions)
- Conditional rendering based on props/state
- Error states and loading states
- Accessibility features

**Form Validation**
- Input validation rules
- Error message display
- Form submission handling

**Complex Components**
- Multi-step forms or wizards
- Data tables with sorting/filtering
- Interactive dashboards

### ⚠️ CONSIDER Testing

**Simple Components**
- Basic presentational components
- Simple UI elements without logic
- Third-party component wrappers

### ❌ DON'T Test

**Trivial Functions**
- Simple getters, basic formatters
- Direct property access
- Constants and configuration

**Third-Party Libraries**
- Already tested by maintainers
- Focus on integration points instead

**Implementation Details**
- Internal component state
- Private methods or functions
- CSS styles or layout

## Testing Patterns

### Component Testing

```typescript
// LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  const mockOnSuccess = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders all form elements", () => {
      render(<LoginForm onSuccess={mockOnSuccess} />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /sign in/i })
      ).toBeInTheDocument();
    });

    it("renders optional remember me checkbox when enabled", () => {
      render(<LoginForm onSuccess={mockOnSuccess} showRememberMe />);

      expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("updates input values when user types", async () => {
      render(<LoginForm onSuccess={mockOnSuccess} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");

      expect(emailInput).toHaveValue("test@example.com");
      expect(passwordInput).toHaveValue("password123");
    });

    it("calls onSuccess when form is submitted with valid data", async () => {
      render(<LoginForm onSuccess={mockOnSuccess} />);

      await user.type(screen.getByLabelText(/email/i), "test@example.com");
      await user.type(screen.getByLabelText(/password/i), "password123");
      await user.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalledWith(
          expect.objectContaining({
            email: "test@example.com"
          })
        );
      });
    });
  });

  describe("Validation", () => {
    it("shows error message for invalid email", async () => {
      render(<LoginForm onSuccess={mockOnSuccess} />);

      await user.type(screen.getByLabelText(/email/i), "invalid-email");
      await user.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      });
    });

    it("shows error message when password is too short", async () => {
      render(<LoginForm onSuccess={mockOnSuccess} />);

      await user.type(screen.getByLabelText(/email/i), "test@example.com");
      await user.type(screen.getByLabelText(/password/i), "123");
      await user.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/password must be at least/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe("Loading States", () => {
    it("disables submit button while loading", async () => {
      render(<LoginForm onSuccess={mockOnSuccess} />);

      const submitButton = screen.getByRole("button", { name: /sign in/i });

      await user.type(screen.getByLabelText(/email/i), "test@example.com");
      await user.type(screen.getByLabelText(/password/i), "password123");
      await user.click(submitButton);

      expect(submitButton).toBeDisabled();
    });
  });
});
```

### Hook Testing

```typescript
// useAuth.test.ts
import { renderHook, act } from "@testing-library/react";
import { useAuth } from "./useAuth";

// Mock the API
jest.mock("../api/auth", () => ({
  login: jest.fn(),
  logout: jest.fn(),
  getCurrentUser: jest.fn()
}));

describe("useAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with null user and not authenticated", () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it("successfully logs in user", async () => {
    const mockUser = { id: "1", email: "test@example.com" };
    const mockLogin = require("../api/auth").login;
    mockLogin.mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({
        email: "test@example.com",
        password: "password123"
      });
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123"
    });
  });

  it("handles login error", async () => {
    const mockLogin = require("../api/auth").login;
    mockLogin.mockRejectedValue(new Error("Invalid credentials"));

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({
        email: "test@example.com",
        password: "wrong-password"
      });
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBe("Invalid credentials");
  });
});
```

### Utility Function Testing

```typescript
// validation.test.ts
import {
  isValidEmail,
  isValidPassword,
  validateLoginForm
} from "./validation";

describe("Validation Utils", () => {
  describe("isValidEmail", () => {
    it("returns true for valid email addresses", () => {
      const validEmails = [
        "test@example.com",
        "user.name@domain.co.uk",
        "user+tag@example.org"
      ];

      validEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(true);
      });
    });

    it("returns false for invalid email addresses", () => {
      const invalidEmails = [
        "invalid-email",
        "@example.com",
        "user@",
        "",
        "user@domain",
        "user name@example.com"
      ];

      invalidEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(false);
      });
    });
  });

  describe("isValidPassword", () => {
    it("returns true for passwords meeting requirements", () => {
      const validPasswords = [
        "password123",
        "mySecurePassword!",
        "12345678"
      ];

      validPasswords.forEach(password => {
        expect(isValidPassword(password)).toBe(true);
      });
    });

    it("returns false for passwords too short", () => {
      const shortPasswords = ["123", "pass", ""];

      shortPasswords.forEach(password => {
        expect(isValidPassword(password)).toBe(false);
      });
    });
  });

  describe("validateLoginForm", () => {
    it("returns no errors for valid form data", () => {
      const validData = {
        email: "test@example.com",
        password: "password123"
      };

      const errors = validateLoginForm(validData);
      expect(errors).toEqual({});
    });

    it("returns errors for invalid form data", () => {
      const invalidData = {
        email: "invalid-email",
        password: "123"
      };

      const errors = validateLoginForm(invalidData);
      expect(errors.email).toBeTruthy();
      expect(errors.password).toBeTruthy();
    });
  });
});
```

## Test Setup & Configuration

### Jest Configuration

```typescript
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.stories.{ts,tsx}",
    "!src/**/*.d.ts"
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
```

### Test Setup File

```typescript
// src/__tests__/setup.ts
import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
    push: jest.fn(),
    replace: jest.fn()
  })
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} />;
  }
}));
```