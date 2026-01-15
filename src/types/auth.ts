// User roles in the system
export type UserRole = "admin" | "teacher";

// What login form sends
export type LoginInput = {
  email: string;
  password: string;
};

// User object after authentication
export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

// What login returns
export type AuthSession = {
  user: AuthUser;
  accessToken: string;
};
