export interface User {
  _id?: string;
  name: string;
  phone: string;
  password: string;
  role: 'farmer' | 'consumer' | 'admin';
  createdAt: Date;
  verified?: boolean;
  verifiedAt?: Date | null;
}

export interface UserResponse {
  id: string;
  name: string;
  phone: string;
  role: 'farmer' | 'consumer' | 'admin';
  verified?: boolean;
}
