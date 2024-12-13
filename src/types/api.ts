// Auth Types
export interface SignUpRequest {
  user_id: string;
  password: string;
}

export interface SignInRequest {
  user_id: string;
  password: string;
}

// Profile Types
export interface Profile {
  name: string;
  created_at: string;
  description: string;
}

export interface UpdateProfileRequest {
  name?: string;
  description?: string;
}

// Post Types
export interface Post {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
}

export interface CreatePostRequest {
  content: string;
}