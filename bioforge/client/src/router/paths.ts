export const PATHS = {
  root: "/",
  design: "/biocard",
  dashboard: {
    root: "/dashboard",
  },
  auth: {
    login: "/login",
    register: "/register",
  },
  admin: {
    users: "/admin/users",
  },
  simulation: "/simulation", // Phase 2
  lims: "/lims", // Phase 3
} as const;
