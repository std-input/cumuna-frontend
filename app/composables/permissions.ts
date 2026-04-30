type PermissionKey =
  | "service_delete"
  | "service_active"
  | "lookings_delete"
  | "lookings_active"
  | "admin_access"
  | "modify_categories"
  | "modify_locations"
  | "modify_rates"
  | "create_rate_code"
  | "add_plan"

type Permissions = {
  perms: Partial<Record<PermissionKey, boolean>>
}

type RoleKey = "user" | "moderator" | "admin"
type RoleList = Record<RoleKey, Permissions>

const roles: RoleList = {
  user: {
    perms: {},
  },
  moderator: {
    perms: {
      service_delete: true,
      service_active: true,
      lookings_delete: true,
      lookings_active: true,
      admin_access: true,
    },
  },
  admin: {
    perms: {
      service_delete: true,
      service_active: true,
      lookings_delete: true,
      lookings_active: true,
      admin_access: true,
      modify_categories: true,
      modify_locations: true,
      modify_rates: true,
      create_rate_code: true,
      add_plan: true,
    },
  },
}

export const usePermissions = () => {
  const hasPermission = (role: string, permission: PermissionKey) => {
    console.log(role, permission)
    const rolePermissions = roles[role as RoleKey]
    if (!rolePermissions) return false
    return !!rolePermissions.perms[permission]
  }

  // Helper when you only want to validate role string.
  const isValidRole = (role: string) => role in roles

  return {
    hasPermission,
    isValidRole,
  }
}
