import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Verify admin token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    // Connect to database
    const client = await clientPromise;
    const db = client.db('agriconnect');
    const usersCollection = db.collection('users');

    // Get all users
    const users = await usersCollection.find({}).toArray();

    // Format users for response
    const formattedUsers = users.map(user => ({
      id: user._id.toString(),
      name: user.name,
      phone: user.phone,
      role: user.role,
      verified: user.verified || false,
      createdAt: user.createdAt,
    }));

    return res.status(200).json({ users: formattedUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
