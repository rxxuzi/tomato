export interface Post {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  reposts: number;
  isLiked: boolean;
  isReposted: boolean;
}

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
}