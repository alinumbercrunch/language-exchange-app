/**
 * Utility functions for safe localStorage operations with TypeScript support
 */

/**
 * Keys used in localStorage for type safety
 */
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_PREFERENCES: 'user_preferences',
  FORM_DRAFT: 'form_draft',
  THEME: 'theme'
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;

/**
 * Safely get an item from localStorage with JSON parsing
 * 
 * @param key - The storage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns The parsed value or default value
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Failed to get item "${key}" from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Safely set an item in localStorage with JSON stringification
 * 
 * @param key - The storage key
 * @param value - The value to store
 * @returns Success boolean
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Failed to set item "${key}" in localStorage:`, error);
    return false;
  }
}

/**
 * Safely remove an item from localStorage
 * 
 * @param key - The storage key to remove
 * @returns Success boolean
 */
export function removeStorageItem(key: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove item "${key}" from localStorage:`, error);
    return false;
  }
}

/**
 * Clear all items from localStorage
 * 
 * @returns Success boolean
 */
export function clearStorage(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.warn('Failed to clear localStorage:', error);
    return false;
  }
}

/**
 * Check if localStorage is available
 * 
 * @returns Boolean indicating localStorage availability
 */
export function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Token-specific storage utilities
 */
export const tokenStorage = {
  get: (): string | null => getStorageItem(STORAGE_KEYS.USER_TOKEN, null),
  set: (token: string): boolean => setStorageItem(STORAGE_KEYS.USER_TOKEN, token),
  remove: (): boolean => removeStorageItem(STORAGE_KEYS.USER_TOKEN),
  exists: (): boolean => getStorageItem(STORAGE_KEYS.USER_TOKEN, null) !== null
};
