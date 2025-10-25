import { useState, useEffect } from "react"
import { useRouter } from "next/router";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  farmer: string;
  location: string;
  rating: number;
  image: string;
  inStock: boolean;
  organic: boolean;
}

export default function ConsumerDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [showCart, setShowCart] = useState(false);

  const products: Product[] = [
    { id: 1, name: "Fresh Tomatoes", category: "Vegetables", price: 40, unit: "kg", farmer: "Rajesh Kumar", location: "Punjab", rating: 4.8, image: "🍅", inStock: true, organic: true },
    { id: 2, name: "Organic Rice", category: "Grains", price: 60, unit: "kg", farmer: "Priya Sharma", location: "Haryana", rating: 4.9, image: "🌾", inStock: true, organic: true },
    { id: 3, name: "Fresh Milk", category: "Dairy", price: 55, unit: "liter", farmer: "Amit Patel", location: "Gujarat", rating: 4.7, image: "🥛", inStock: true, organic: false },
    { id: 4, name: "Green Apples", category: "Fruits", price: 120, unit: "kg", farmer: "Sunita Devi", location: "Himachal", rating: 4.9, image: "🍏", inStock: true, organic: true },
    { id: 5, name: "Fresh Spinach", category: "Vegetables", price: 30, unit: "kg", farmer: "Ramesh Singh", location: "UP", rating: 4.6, image: "🥬", inStock: true, organic: true },
    { id: 6, name: "Wheat Flour", category: "Grains", price: 45, unit: "kg", farmer: "Lakshmi Reddy", location: "Karnataka", rating: 4.8, image: "🌾", inStock: true, organic: false },
    { id: 7, name: "Fresh Eggs", category: "Dairy", price: 80, unit: "dozen", farmer: "Vijay Kumar", location: "Tamil Nadu", rating: 4.7, image: "🥚", inStock: true, organic: true },
    { id: 8, name: "Bananas", category: "Fruits", price: 50, unit: "dozen", farmer: "Meena Kumari", location: "Kerala", rating: 4.8, image: "🍌", inStock: true, organic: false },
  ];

  const categories = ["All", "Vegetables", "Fruits", "Grains", "Dairy"];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const product = products.find(p => p.id === parseInt(id));
      return sum + (product ? product.price * qty : 0);
    }, 0);
  };

  const router = useRouter();

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      const cartItems = Object.entries(cart).map(([id, qty]) => {
        const product = products.find(p => p.id === parseInt(id));
        return product ? {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: qty,
          unit: product.unit,
          image: product.image
        } : null;
      }).filter(item => item !== null);
      localStorage.setItem('agriconnect:cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('agriconnect:cart');
    }
  }, [cart, products]);

  const handleCheckout = () => {
    if (getTotalItems() === 0) {
      alert('Your cart is empty!');
      return;
    }
    router.push('/checkout');
  };

  return (
    <div className="py-8 sm:py-12 md:py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 font-poppins">
            Fresh Marketplace
          </h1>
          <p className="text-gray-300">Discover quality products from local farmers</p>
        </div>
        <button
          onClick={() => setShowCart(!showCart)}
          className="relative bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Cart ({getTotalItems()})
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products or farmers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-white/20 bg-slate-800/50 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
          />
          <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-green-600 text-white shadow-2xl shadow-green-500/50'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl hover:shadow-green-500/30 transition-all duration-300 overflow-hidden border border-white/10 hover:scale-105"
          >
            <div className="p-6">
              <div className="text-6xl mb-4 text-center">{product.image}</div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg text-white">{product.name}</h3>
                {product.organic && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                    Organic
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 mb-2">by {product.farmer}</p>
              <p className="text-xs text-gray-400 mb-3">📍 {product.location}</p>
              <div className="flex items-center mb-3">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-green-400">₹{product.price}</span>
                <span className="text-sm text-gray-400">/{product.unit}</span>
              </div>
              {cart[product.id] ? (
                <div className="flex items-center justify-between bg-green-600/20 rounded-lg p-2">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="font-semibold text-white">{cart[product.id]}</span>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end" onClick={() => setShowCart(false)}>
          <div
            className="bg-slate-900 w-full max-w-md h-full overflow-y-auto p-6 shadow-2xl border-l border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {Object.keys(cart).length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {Object.entries(cart).map(([id, qty]) => {
                    const product = products.find(p => p.id === parseInt(id));
                    if (!product) return null;
                    return (
                      <div key={id} className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-lg border border-white/10">
                        <div className="text-3xl">{product.image}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{product.name}</h3>
                          <p className="text-sm text-gray-400">₹{product.price}/{product.unit}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="w-6 h-6 bg-green-600 text-white rounded flex items-center justify-center hover:bg-green-700 font-bold"
                          >
                            -
                          </button>
                          <span className="font-semibold text-white">{qty}</span>
                          <button
                            onClick={() => addToCart(product.id)}
                            className="w-6 h-6 bg-green-600 text-white rounded flex items-center justify-center hover:bg-green-700 font-bold"
                          >
                            +
                          </button>
                        </div>
                        <div className="font-semibold text-green-400">
                          ₹{product.price * qty}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-white/10 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold mb-2 text-white">
                    <span>Total Items:</span>
                    <span>{getTotalItems()}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-green-400">
                    <span>Total:</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold text-lg shadow-2xl shadow-green-500/50 hover:scale-105"
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
