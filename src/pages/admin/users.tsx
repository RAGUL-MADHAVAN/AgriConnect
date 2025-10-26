import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  phone: string;
  role: string;
  verified: boolean;
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string; phone: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in and is admin
    const userData = localStorage.getItem('agriconnect:user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === 'admin') {
        setCurrentUser(user);
        loadUsers();
      }
    }
  }, []);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem('agriconnect:token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('/api/admin/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        console.error('Failed to load users');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading users:', error);
      setLoading(false);
    }
  };

  const toggleVerification = async (userId: string) => {
    try {
      const token = localStorage.getItem('agriconnect:token');
      const user = users.find(u => u.id === userId);
      
      if (!user || !token) return;

      const response = await fetch('/api/auth/verify-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          userId, 
          verified: !user.verified 
        })
      });

      if (response.ok) {
        // Update local state immediately
        setUsers(users.map(u => 
          u.id === userId ? { ...u, verified: !u.verified } : u
        ));
        
        const newStatus = !user.verified ? 'verified' : 'unverified';
        alert(`User ${newStatus} successfully!`);
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update verification status');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/10 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-white mb-4">Admin Access Required</h1>
          <p className="text-gray-300 mb-6">
            You must be logged in as an admin to access this page.
          </p>
          <Link
            href="/auth/login"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 font-poppins">
          User Management
        </h1>
        <p className="text-gray-300">Verify and manage user accounts</p>
      </div>

      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                      No users found. Sign up to see users here.
                    </td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr key={user.id} className="hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-white font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{user.phone}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'farmer' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {user.verified ? (
                          <span className="flex items-center gap-1 text-green-400">
                            <span>✓</span> Verified
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-yellow-400">
                            <span>⏳</span> Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleVerification(user.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            user.verified
                              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                              : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          }`}
                        >
                          {user.verified ? 'Unverify' : 'Verify'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-xl p-6">
        <h3 className="text-green-400 font-semibold mb-2">✅ Live Database</h3>
        <p className="text-gray-300 text-sm">
          Connected to MongoDB. All user data and verification changes are saved to the database in real-time.
        </p>
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/profile"
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >
          Go to Profile
        </Link>
      </div>
    </div>
  );
}
