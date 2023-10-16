export const UserRole = {
  User: 1,
  Admin: 2,
} as const

export type IUserRole = (typeof UserRole)[keyof typeof UserRole]

export const UserRoleText = {
  [UserRole.User]: 'User',
  [UserRole.Admin]: 'Admin',
} as const
