/**
 * Resolves static asset paths (like images in /public) with Vite base URL support.
 * Ensures assets resolve correctly on GitHub Pages (e.g., /-C-Taxi-/)
 * as well as on custom root domains (e.g., https://www.ctaxicab.com).
 */
export function assetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
