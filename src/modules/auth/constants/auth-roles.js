export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  USER: 'user',
}

export const PERMISSIONS = {
  USERS_READ: 'users:read',
  USERS_WRITE: 'users:write',
  DASHBOARD_ACCESS: 'dashboard:access',
  CONTENT_READ: 'content:read',
  CONTENT_WRITE: 'content:write',
  SETTINGS_ACCESS: 'settings:access',
}

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.EDITOR]: [
    PERMISSIONS.DASHBOARD_ACCESS,
    PERMISSIONS.CONTENT_READ,
    PERMISSIONS.CONTENT_WRITE,
  ],
  [ROLES.USER]: [
    PERMISSIONS.DASHBOARD_ACCESS,
    PERMISSIONS.CONTENT_READ,
  ],
}
