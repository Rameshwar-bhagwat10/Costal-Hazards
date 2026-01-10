export interface Route {
  label: string
  path: string
  description?: string
}

export const PUBLIC_ROUTES: Route[] = [
  { label: 'Home', path: '/home', description: 'Dashboard overview' },
  { label: 'Safety Map', path: '/map', description: 'View hazard locations' },
  { label: 'Report Feed', path: '/report-feed', description: 'Community hazard intelligence' },
]

export const AUTH_ROUTES: Route[] = [
  { label: 'Report Hazard', path: '/report', description: 'Submit a hazard report' },
  { label: 'Analytics', path: '/analytics', description: 'View trends and statistics' },
]

export const PROTECTED_PATHS = ['/report', '/analytics']

export const isProtectedPath = (path: string): boolean => {
  return PROTECTED_PATHS.some(p => path.startsWith(p))
}
