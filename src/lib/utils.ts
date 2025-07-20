export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
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
export function formatDate(date: Date, locale = 'en-US', options?: Intl.DateTimeFormatOptions): string {
  return date.toLocaleDateString(locale, options ?? {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
