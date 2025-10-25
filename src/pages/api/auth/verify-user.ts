import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId, verified } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const client = await clientPromise;
    const db = client.db('agriconnect');
    const usersCollection = db.collection('users');

    const { ObjectId } = require('mongodb');
    
    // Update user verification status
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          verified: verified,
          verifiedAt: verified ? new Date() : null
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: `User ${verified ? 'verified' : 'unverified'} successfully`,
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
