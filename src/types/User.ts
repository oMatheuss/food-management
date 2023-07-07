export interface User {
  id: number;
  email: string;
  name: string;
  username: string;
  role: 'user' | 'admin';
  token: string;
  bio: string | null;
  avatar: string | null;
}
