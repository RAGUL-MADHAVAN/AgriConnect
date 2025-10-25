import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('agriconnect:user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditData({
        name: parsedUser.name,
        phone: parsedUser.phone,
      });
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  const handleSave = () => {
    const updatedUser = { ...user, ...editData };
    localStorage.setItem('agriconnect:user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    // In production, call API to update user
  };

  const handleLogout = () => {
    localStorage.removeItem('agriconnect:user');
    localStorage.removeItem('agriconnect:token');
    router.push('/auth/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 font-poppins">
            My Profile
          </h1>
          <p className="text-gray-300">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10">
              {/* Profile Header */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.role === 'farmer' ? 'bg-green-500/20 text-green-400' : 
                      user.role === 'consumer' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    {user.verified ? (
                      <span className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                        <span>✓</span> Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                        <span>⏳</span> Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-white/20 bg-slate-700/50 text-white rounded-lg focus:border-green-500 focus:outline-none"
                    />
                  ) : (
                    <p className="text-lg text-white">{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-white/20 bg-slate-700/50 text-white rounded-lg focus:border-green-500 focus:outline-none"
                    />
                  ) : (
                    <p className="text-lg text-white">{user.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                  <p className="text-lg text-white capitalize">{user.role}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Member Since</label>
                  <p className="text-lg text-white">{new Date().toLocaleDateString()}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-slate-700 text-white py-3 rounded-xl hover:bg-slate-600 transition-colors font-semibold"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                {user.role === 'farmer' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Products</span>
                      <span className="font-semibold text-white">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Sales</span>
                      <span className="font-semibold text-green-400">₹45,600</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Orders</span>
                      <span className="font-semibold text-white">28</span>
                    </div>
                  </>
                )}
                {user.role === 'consumer' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Orders</span>
                      <span className="font-semibold text-white">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Spent</span>
                      <span className="font-semibold text-green-400">₹12,340</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Reviews</span>
                      <span className="font-semibold text-white">8</span>
                    </div>
                  </>
                )}
                {user.role === 'admin' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Users</span>
                      <span className="font-semibold text-white">152</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Verified</span>
                      <span className="font-semibold text-green-400">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Pending</span>
                      <span className="font-semibold text-yellow-400">63</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href={user.role === 'admin' ? '/admin/users' : `/${user.role}`}
                  className="block w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold text-center"
                >
                  Go to Dashboard
                </Link>
                {user.role !== 'admin' && (
                  <Link
                    href="/support"
                    className="block w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-center"
                  >
                    Contact Support
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-colors font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-lg font-bold text-white mb-2">🔒 Account Security</h3>
              <p className="text-sm text-gray-300 mb-4">
                Keep your account secure by using a strong password
              </p>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
