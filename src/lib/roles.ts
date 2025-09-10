

export type Permission = 
  | 'view-dashboard'
  | 'manage-courses'
  | 'view-courses'
  | 'manage-appointments'
  | 'view-appointments'
  | 'access-library'
  | 'view-analytics'
  | 'manage-users'
  | 'view-audit-logs'
  | 'manage-settings'
  | 'manage-availability'

export const permissionLabels: Record<Permission, string> = {
    'view-dashboard': 'View Dashboard',
    'manage-courses': 'Manage Courses',
    'view-courses': 'View Courses',
    'manage-appointments': 'Manage Appointments',
    'view-appointments': 'View Appointments',
    'access-library': 'Access Library',
    'view-analytics': 'View Analytics',
    'manage-users': 'Manage Users',
    'view-audit-logs': 'View Audit Logs',
    'manage-settings': 'Manage Settings',
    'manage-availability': 'Manage Availability',
}

export type Role = {
  id: string
  name: string
  permissions: Permission[]
}

export const defaultRoles: Role[] = [
  {
    id: 'admin',
    name: 'Super Admin',
    permissions: [
      'view-dashboard',
      'manage-courses',
      'manage-appointments',
      'access-library',
      'view-analytics',
      'manage-users',
      'view-audit-logs',
      'manage-settings',
      'manage-availability',
    ],
  },
  {
    id: 'faculty',
    name: 'Faculty',
    permissions: [
      'view-dashboard',
      'manage-courses',
      'manage-appointments',
      'access-library',
      'manage-availability',
    ],
  },
  {
    id: 'student',
    name: 'Student',
    permissions: ['view-dashboard', 'view-courses', 'view-appointments', 'access-library'],
  },
]
