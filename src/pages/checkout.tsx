import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
}

export default function Checkout() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  useEffect(() => {
    // Load user
    const userData = localStorage.getItem('agriconnect:user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData(prev => ({
        ...prev,
        name: parsedUser.name,
        phone: parsedUser.phone
      }));
    } else {
      router.push('/auth/login');
      return;
    }

    // Load cart from localStorage
    const cart = localStorage.getItem('agriconnect:cart');
    if (cart) {
      const cartData = JSON.parse(cart);
      setCartItems(cartData);
    } else {
      router.push('/consumer');
    }
  }, [router]);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save order (in production, send to API)
    const order = {
      id: Date.now(),
      items: cartItems,
      total: calculateTotal(),
      customerInfo: formData,
      date: new Date().toISOString(),
      status: 'pending'
    };

    // Save to localStorage (demo)
    const orders = JSON.parse(localStorage.getItem('agriconnect:orders') || '[]');
    orders.push(order);
    localStorage.setItem('agriconnect:orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('agriconnect:cart');
    
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="max-w-md w-full text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold text-white mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-300 mb-2">Order ID: #{Date.now().toString().slice(-6)}</p>
            <p className="text-gray-400 mb-6">
              Your order has been placed successfully. You will receive a confirmation shortly.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
              <p className="text-green-400 font-semibold">Total Amount: ₹{calculateTotal()}</p>
              <p className="text-sm text-gray-300 mt-1">Payment Method: {formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/consumer"
                className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold text-center"
              >
                Continue Shopping
              </Link>
              <Link
                href="/profile"
                className="flex-1 bg-slate-700 text-white py-3 rounded-xl hover:bg-slate-600 transition-colors font-semibold text-center"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
          <Link
            href="/consumer"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 font-poppins">
            Checkout
          </h1>
          <p className="text-gray-300">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Delivery Information */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Delivery Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-white/20 bg-slate-700/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-white/20 bg-slate-700/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none"
                      placeholder="1234567890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Delivery Address</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-white/20 bg-slate-700/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none resize-none"
                      placeholder="Street address, apartment, etc."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-white/20 bg-slate-700/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Pincode</label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-white/20 bg-slate-700/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none"
                        placeholder="400001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg border border-white/10 cursor-pointer hover:bg-slate-700/50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="w-4 h-4 text-green-600"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-white">Cash on Delivery</div>
                      <div className="text-sm text-gray-400">Pay when you receive</div>
                    </div>
                    <span className="text-2xl">💵</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg border border-white/10 cursor-pointer hover:bg-slate-700/50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={formData.paymentMethod === 'online'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="w-4 h-4 text-green-600"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-white">Online Payment</div>
                      <div className="text-sm text-gray-400">UPI, Card, Net Banking</div>
                    </div>
                    <span className="text-2xl">💳</span>
                  </label>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-all duration-300 font-bold text-lg shadow-2xl shadow-green-500/50 hover:scale-105"
              >
                Place Order - ₹{calculateTotal()}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/10 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-white text-sm">{item.name}</div>
                      <div className="text-xs text-gray-400">{item.quantity} × ₹{item.price}/{item.unit}</div>
                    </div>
                    <div className="font-bold text-green-400">₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Delivery Fee</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-green-400">₹{calculateTotal()}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <span>🔒</span>
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
