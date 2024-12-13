export interface AuthUser {
  id: string;
  handle: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  error: string | null;
}

export interface AuthCredentials {
  userId: string;
  password: string;
}