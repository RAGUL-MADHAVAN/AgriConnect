import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { verifyPassword, generateToken, sanitizeUser } from '@/lib/auth';
import { User } from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { phone, password, role } = req.body;

    // Validation
    if (!phone || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }

    // Connect to database
    const client = await clientPromise;
    const db = client.db('agriconnect');
    const usersCollection = db.collection<User>('users');

    // Find user
    const user = await usersCollection.findOne({ phone, role });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials or role' });
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user as User);

    // Return user data and token
    return res.status(200).json({
      message: 'Login successful',
      user: sanitizeUser(user as User),
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
