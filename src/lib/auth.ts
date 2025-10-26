import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserResponse } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user._id,
      phone: user.phone,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): { id: string; phone: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; phone: string; role: string };
  } catch {
    return null;
  }
}

export function sanitizeUser(user: User): UserResponse {
  return {
    id: user._id as string,
    name: user.name,
    phone: user.phone,
    role: user.role,
    verified: user.verified || false,
  };
}
