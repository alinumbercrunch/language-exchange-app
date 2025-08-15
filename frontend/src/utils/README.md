# Frontend Utilities Documentation

This document describes the utility functions and helpers available in the frontend application.

## Overview

The utilities are organized into several categories to provide common functionality across the application:

- **API Utilities**: HTTP client and request handling
- **Form Utilities**: Form data manipulation and helpers
- **Validation Utilities**: Input validation functions
- **Storage Utilities**: Browser localStorage management
- **Styling Utilities**: CSS class manipulation and common styles
- **Logging Utilities**: Centralized logging system

## Usage

Import utilities from the main utils barrel export:

```typescript
import { api, validateEmail, classNames, logger } from '../utils';
```

## API Utilities (`apiClient.ts`)

### `api`
Enhanced fetch wrapper with error handling and type safety.

```typescript
// GET request
const users = await api.get<User[]>('/api/users');

// POST request
const newUser = await api.post<User>('/api/users', userData);

// Other methods: put, patch, delete
```

### Features
- Automatic error handling with `AppError`
- Type safety with generic support
- Consistent API response format
- Validation error parsing

## Form Utilities (`formHelpers.ts`)

### `setNestedValue`
Safely updates nested object properties in form data.

```typescript
const updatedData = setNestedValue(
  formData,
  'profileOptions.age',
  25
);
```

## Validation Utilities (`validation.ts`)

Provides common validation functions with consistent error messages.

### Available Validators
- `validateEmail(email: string)` - Email format validation
- `validatePassword(password: string, requirements?)` - Password strength validation
- `validateRequired(value: string, fieldName: string)` - Required field validation
- `validateUsername(username: string)` - Username format validation
- `validateAge(age: number)` - Age range validation

### Usage Example
```typescript
const emailValidation = validateEmail(email);
if (!emailValidation.isValid) {
  setError(emailValidation.error);
}
```

## Storage Utilities (`localStorage.ts`)

Safe localStorage operations with TypeScript support.

### Functions
- `getStorageItem<T>(key: string, defaultValue: T)` - Get item with type safety
- `setStorageItem<T>(key: string, value: T)` - Set item with JSON serialization
- `removeStorageItem(key: string)` - Remove item
- `tokenStorage` - Pre-configured token management

### Usage Example
```typescript
// Store user preferences
setStorageItem('user_preferences', { theme: 'dark' });

// Get user preferences
const preferences = getStorageItem('user_preferences', { theme: 'light' });

// Token management
tokenStorage.set('jwt_token');
const token = tokenStorage.get();
```

## Styling Utilities (`classNames.ts`)

CSS class manipulation and common style patterns.

### `classNames(...classes)`
Conditionally join class names, filtering out falsy values.

```typescript
const buttonClass = classNames(
  'btn',
  isActive && 'btn-active',
  disabled && 'btn-disabled'
);
```

### `conditionalClasses(baseClasses, conditionalClasses)`
Apply conditional classes based on boolean conditions.

```typescript
const className = conditionalClasses('btn', {
  'btn-primary': isPrimary,
  'btn-loading': isLoading
});
```

### Common Style Constants
- `commonStyles` - Pre-defined Tailwind CSS class sets
- `sizeStyles` - Size variants for different components
- `loadingClasses(isLoading)` - Loading state styles

### Usage Example
```typescript
<button className={classNames(
  commonStyles.buttonBase,
  commonStyles.buttonPrimary,
  sizeStyles.button.md,
  loadingClasses(isLoading)
)}>
  Click me
</button>
```

## Logging Utilities (`logger.ts`)

Centralized logging system with context and level support.

### Main Logger
```typescript
logger.error('Something went wrong', error);
logger.warn('This is a warning');
logger.info('Information message');
logger.debug('Debug information', debugData);
```

### Contextual Loggers
```typescript
loggers.api.error('API request failed', error);
loggers.auth.info('User logged in');
loggers.ui.debug('Component rendered', componentData);
```

### Performance Logging
```typescript
// Time synchronous operations
const result = performanceLogger.time('expensive-operation', () => {
  return expensiveCalculation();
});

// Time asynchronous operations
const data = await performanceLogger.timeAsync('api-call', () => {
  return api.get('/data');
});
```

## Type Definitions (`ui-components.ts`)

Shared TypeScript interfaces for common component patterns:

- `WithChildren` - Components that accept children
- `WithClassName` - Components that accept className
- `FormFieldProps` - Common form field properties
- `ButtonVariant` - Button style variants
- `ComponentSize` - Standard component sizes
- `LoadingState` - Loading state interface
- `AsyncResult<T>` - Async operation result

## Best Practices

1. **Import from index**: Always import from the main utils index for consistency
2. **Type safety**: Use TypeScript interfaces and generics where available
3. **Error handling**: Use the built-in error handling in API utilities
4. **Consistent styling**: Use common styles and utilities for UI consistency
5. **Logging**: Use contextual loggers for better debugging
6. **Validation**: Use validation utilities instead of inline validation logic

## Examples

### Complete Form Validation
```typescript
import { validateEmail, validatePassword, validateRequired } from '../utils';

function validateForm(data: FormData) {
  const errors: Record<string, string> = {};

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }

  const passwordValidation = validatePassword(data.password, {
    minLength: 8,
    requireUppercase: true
  });
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error!;
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
```

### API Request with Error Handling
```typescript
import { api, loggers } from '../utils';

async function createUser(userData: UserData) {
  try {
    const user = await api.post<User>('/api/users', userData);
    loggers.api.info('User created successfully');
    return user;
  } catch (error) {
    loggers.api.error('Failed to create user', error);
    throw error; // Re-throw to let component handle
  }
}
```

### Component with Utility Classes
```typescript
import { classNames, commonStyles, sizeStyles } from '../utils';

function CustomButton({ variant, size, isLoading, className, children }) {
  return (
    <button
      className={classNames(
        commonStyles.buttonBase,
        variant === 'primary' ? commonStyles.buttonPrimary : commonStyles.buttonSecondary,
        sizeStyles.button[size],
        isLoading && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={isLoading}
    >
      {children}
    </button>
  );
}
```
