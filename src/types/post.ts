import { User } from './user';

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