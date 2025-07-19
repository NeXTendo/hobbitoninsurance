// src/lib/utils.ts

/**
 * ClassNames helper function.
 * Accepts multiple class names (strings, falsy values),
 * filters out falsy values and joins them into a single string.
 * Useful for conditional tailwind className composition.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Optional: A debounce function useful for limiting how often
 * a function can be called (e.g., scroll, input events).
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Optional: A utility to format dates to a readable string
 * Example usage: formatDate(new Date())
 */
export function formatDate(date: Date, locale = 'en-US', options?: Intl.DateTimeFormatOptions): string {
  return date.toLocaleDateString(locale, options ?? {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
