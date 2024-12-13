import { User } from './user';

export interface ApiError {
  error: string;
}

export interface ApiResponse {
  message: string;
}

export interface AuthResponse extends ApiResponse {
  user: User;
}