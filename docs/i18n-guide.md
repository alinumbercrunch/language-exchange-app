# Internationalization (i18n) Guide

## Directory Structure

```
locales/
├── en/                          # English translations
│   ├── common.json              # Common translations used across app
│   ├── auth.json                # Authentication pages
│   ├── dashboard.json           # Dashboard specific translations
│   ├── errors.json              # Error messages
│   ├── navigation.json          # Navigation items
│   └── validation.json          # Form validation messages
├── es/                          # Spanish translations
│   ├── common.json
│   ├── auth.json
│   ├── dashboard.json
│   ├── errors.json
│   ├── navigation.json
│   └── validation.json
├── fr/                          # French translations
│   ├── common.json
│   ├── auth.json
│   └── dashboard.json
├── ja/                          # Japanese translations
│   ├── common.json
│   ├── auth.json
│   └── dashboard.json
└── index.ts                     # Export configuration
```

## Translation Files Structure

### Common Translations example

```json
// locales/en/common.json
{
  "actions": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "create": "Create",
    "update": "Update",
    "submit": "Submit",
    "loading": "Loading...",
    "retry": "Retry",
    "close": "Close",
    "back": "Back",
    "next": "Next",
    "previous": "Previous",
    "search": "Search",
    "filter": "Filter",
    "sort": "Sort",
    "export": "Export",
    "import": "Import"
  },
  "status": {
    "success": "Success",
    "error": "Error",
    "warning": "Warning",
    "info": "Information",
    "pending": "Pending",
    "approved": "Approved",
    "rejected": "Rejected",
    "active": "Active",
    "inactive": "Inactive"
  },
  "time": {
    "now": "Now",
    "today": "Today",
    "yesterday": "Yesterday",
    "tomorrow": "Tomorrow",
    "thisWeek": "This week",
    "lastWeek": "Last week",
    "thisMonth": "This month",
    "lastMonth": "Last month",
    "thisYear": "This year",
    "lastYear": "Last year"
  },
  "units": {
    "seconds": "seconds",
    "minutes": "minutes",
    "hours": "hours",
    "days": "days",
    "weeks": "weeks",
    "months": "months",
    "years": "years"
  }
}
```

## Usage in Components

### Basic Usage

```typescript
// components/LoginForm.tsx
import { useTranslations } from "next-intl";

export const LoginForm: React.FC = () => {
  const t = useTranslations("auth.login");
  const tCommon = useTranslations("common.actions");
  const tErrors = useTranslations("errors.validation");

  return (
    <form>
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>

      <label>{t("email")}</label>
      <input type="email" placeholder={t("emailPlaceholder")} required />

      <label>{t("password")}</label>
      <input type="password" placeholder={t("passwordPlaceholder")} required />

      <button type="submit">{tCommon("submit")}</button>

      <a href="/forgot-password">{t("forgotPassword")}</a>
    </form>
  );
};
```

### Server Component Usage

```typescript
// app/[locale]/dashboard/page.tsx
import { getTranslations } from "next-intl/server";

interface DashboardPageProps {
  params: { locale: string };
}

export default async function DashboardPage({
  params: { locale }
}: DashboardPageProps) {
  const t = await getTranslations("dashboard");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("welcomeMessage")}</p>

      <div className="grid grid-cols-3 gap-4">
        <div className="card">
          <h3>{t("stats.totalUsers")}</h3>
          <span>1,234</span>
        </div>
        <div className="card">
          <h3>{t("stats.activeProjects")}</h3>
          <span>56</span>
        </div>
        <div className="card">
          <h3>{t("stats.revenue")}</h3>
          <span>$78,900</span>
        </div>
      </div>
    </div>
  );
}

// Generate metadata with translations
export async function generateMetadata({
  params: { locale }
}: DashboardPageProps) {
  const t = await getTranslations({ locale, namespace: "dashboard" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription")
  };
}
```

## Advanced Translation Patterns

### Pluralization

```json
// locales/en/common.json
{
  "itemCount": {
    "zero": "No items",
    "one": "{{count}} item",
    "other": "{{count}} items"
  },
  "timeAgo": {
    "justNow": "Just now",
    "minutesAgo": {
      "one": "{{count}} minute ago",
      "other": "{{count}} minutes ago"
    },
    "hoursAgo": {
      "one": "{{count}} hour ago",
      "other": "{{count}} hours ago"
    },
    "daysAgo": {
      "one": "{{count}} day ago",
      "other": "{{count}} days ago"
    }
  }
}
```

```typescript
// Usage with pluralization
const t = useTranslations('common');

// Automatic pluralization based on count
<span>{t('itemCount', { count: items.length })}</span>

// Time ago with nested pluralization
<span>{t('timeAgo.minutesAgo', { count: minutesAgo })}</span>
```

### Conditional Translations

```json
// locales/en/dashboard.json
{
  "userStatus": {
    "online": "{{name}} is currently online",
    "offline": "{{name}} was last seen {{time}}",
    "away": "{{name}} is away"
  },
  "subscription": {
    "active": {
      "title": "Pro Subscription",
      "description": "Your subscription is active until {{date}}"
    },
    "expired": {
      "title": "Subscription Expired",
      "description": "Your subscription expired on {{date}}. Renew now!"
    },
    "trial": {
      "title": "Free Trial",
      "description": "{{days}} days left in your trial"
    }
  }
}
```

```typescript
// Component with conditional translations
const UserStatusBadge: React.FC<{ user: User }> = ({ user }) => {
  const t = useTranslations("dashboard.userStatus");

  const getStatusText = () => {
    switch (user.status) {
      case "online":
        return t("online", { name: user.name });
      case "offline":
        return t("offline", {
          name: user.name,
          time: user.lastSeen.toLocaleDateString()
        });
      case "away":
        return t("away", { name: user.name });
      default:
        return "";
    }
  };

  return <span className={`status-${user.status}`}>{getStatusText()}</span>;
};
```

### Form Validation Messages

```json
// locales/en/validation.json
{
  "field": {
    "required": "{{field}} is required",
    "email": "Please enter a valid email address",
    "minLength": "{{field}} must be at least {{min}} characters",
    "maxLength": "{{field}} cannot exceed {{max}} characters",
    "pattern": "{{field}} format is invalid"
  },
  "password": {
    "tooShort": "Password must be at least {{min}} characters long",
    "noUppercase": "Password must contain at least one uppercase letter",
    "noLowercase": "Password must contain at least one lowercase letter",
    "noNumber": "Password must contain at least one number",
    "noSpecialChar": "Password must contain at least one special character"
  }
}
```

```typescript
// Custom validation hook with i18n
import { useTranslations } from "next-intl";

export const useFormValidation = () => {
  const t = useTranslations("validation");

  const validateEmail = (email: string): string | null => {
    if (!email) return t("field.required", { field: "Email" });
    if (!/\S+@\S+\.\S+/.test(email)) return t("field.email");
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (!password) return t("field.required", { field: "Password" });
    if (password.length < 8) return t("password.tooShort", { min: 8 });
    if (!/[A-Z]/.test(password)) return t("password.noUppercase");
    if (!/[a-z]/.test(password)) return t("password.noLowercase");
    if (!/\d/.test(password)) return t("password.noNumber");
    return null;
  };

  return { validateEmail, validatePassword };
};
```

## Language Switching

### Language Switcher Component

```typescript
// components/LanguageSwitcher.tsx
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ja", name: "日本語", flag: "🇯🇵" }
];

export const LanguageSwitcher: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // Replace the current locale in the pathname
      const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPathname);
    });
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        disabled={isPending}
        className="appearance-none bg-white border rounded px-3 py-2"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      {isPending && <span className="loader">Switching...</span>}
    </div>
  );
};
```

### Dropdown Language Switcher

```typescript
// components/LanguageDropdown.tsx
"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export const LanguageDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "es", name: "Spanish", nativeName: "Español" },
    { code: "fr", name: "French", nativeName: "Français" },
    { code: "ja", name: "Japanese", nativeName: "日本語" }
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale);

  const switchLanguage = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100"
      >
        <span>{currentLanguage?.nativeName}</span>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => switchLanguage(language.code)}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                locale === language.code ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <div>
                <div className="font-medium">{language.nativeName}</div>
                <div className="text-sm text-gray-500">{language.name}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
```

## Best Practices

### 1. Key Naming Conventions

```json
{
  "auth": {
    "login": {
      "title": "Sign In",
      "submitButton": "Sign In"
    }
  }
}
```

**Guidelines:**

- Use nested objects for organization
- Use camelCase for keys
- Be descriptive but concise
- Group related translations together

### 2. Handling Missing Translations

```typescript
// components/SafeTranslation.tsx
import { useTranslations } from "next-intl";

interface SafeTranslationProps {
  namespace: string;
  key: string;
  fallback?: string;
  values?: Record<string, any>;
}

export const SafeTranslation: React.FC<SafeTranslationProps> = ({
  namespace,
  key,
  fallback,
  values
}) => {
  const t = useTranslations(namespace);

  try {
    return <>{t(key, values)}</>;
  } catch (error) {
    console.warn(`Missing translation: ${namespace}.${key}`);
    return <>{fallback || key}</>;
  }
};
```

### 3. Type-Safe Translations

```typescript
// types/translations.ts
export interface Translations {
  common: {
    actions: {
      save: string;
      cancel: string;
      delete: string;
    };
  };
  auth: {
    login: {
      title: string;
      email: string;
      password: string;
    };
  };
}

// hooks/useTypedTranslations.ts
import { useTranslations } from "next-intl";

export const useTypedTranslations = <T extends keyof Translations>(
  namespace: T
) => {
  return useTranslations(namespace) as any; // Type assertion for now
};
```

### 4. RTL Language Support

```css
/* globals.css */
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] .ml-4 {
  margin-left: 0;
  margin-right: 1rem;
}

[dir="rtl"] .mr-4 {
  margin-right: 0;
  margin-left: 1rem;
}
```

```typescript
// utils/rtl.ts
export const isRTL = (locale: string): boolean => {
  const rtlLanguages = ["ar", "he", "fa", "ur"];
  return rtlLanguages.includes(locale);
};

// Usage in component
const locale = useLocale();
const isRightToLeft = isRTL(locale);

return <div dir={isRightToLeft ? "rtl" : "ltr"}>{/* Content */}</div>;
```
