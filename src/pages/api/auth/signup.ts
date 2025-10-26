import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { hashPassword, generateToken, sanitizeUser } from '@/lib/auth';
import { User } from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, phone, password, role } = req.body;

    // Validation
    if (!name || !phone || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Phone number must be 10 digits' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    if (role !== 'farmer' && role !== 'consumer' && role !== 'admin') {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Connect to database
    const client = await clientPromise;
    const db = client.db('agriconnect');
    const usersCollection = db.collection<User>('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ phone });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this phone number already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser: User = {
      name: name.trim(),
      phone,
      password: hashedPassword,
      role,
      createdAt: new Date(),
      verified: role === 'admin' ? true : false, // Admins are auto-verified, others need verification
    };

    const result = await usersCollection.insertOne(newUser);
    newUser._id = result.insertedId.toString();

    // Generate token
    const token = generateToken(newUser);

    // Return user data and token
    return res.status(201).json({
      message: 'User created successfully',
      user: sanitizeUser(newUser),
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
