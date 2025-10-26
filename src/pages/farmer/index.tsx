import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  sold: number;
  revenue: number;
  image: string;
}

interface Order {
  id: number;
  customer: string;
  product: string;
  quantity: number;
  total: number;
  status: "pending" | "completed" | "shipped";
  date: string;
}

interface User {
  name: string;
  role: string;
  phone: string;
  verified?: boolean;
}

interface Tab {
  id: "overview" | "products" | "orders";
}

interface ProductForm {
  name: string;
  category: string;
  price: string;
  unit: string;
  stock: string;
}

export default function FarmerDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<Tab["id"]>("overview");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<ProductForm>({
    name: "",
    category: "Vegetables",
    price: "",
    unit: "kg",
    stock: ""
  });

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('agriconnect:user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleDeleteProduct = (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      unit: product.unit,
      stock: product.stock.toString()
    });
    setShowAddProduct(true);
  };
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Fresh Tomatoes", category: "Vegetables", price: 40, unit: "kg", stock: 150, sold: 320, revenue: 12800, image: "🍅" },
    { id: 2, name: "Organic Rice", category: "Grains", price: 60, unit: "kg", stock: 200, sold: 450, revenue: 27000, image: "🌾" },
    { id: 3, name: "Green Apples", category: "Fruits", price: 120, unit: "kg", stock: 80, sold: 180, revenue: 21600, image: "🍏" },
  ]);

  const [orders] = useState<Order[]>([
    { id: 1, customer: "Priya Sharma", product: "Fresh Tomatoes", quantity: 5, total: 200, status: "pending", date: "2024-10-24" },
    { id: 2, customer: "Amit Patel", product: "Organic Rice", quantity: 10, total: 600, status: "shipped", date: "2024-10-23" },
    { id: 3, customer: "Sunita Devi", product: "Green Apples", quantity: 3, total: 360, status: "completed", date: "2024-10-22" },
    { id: 4, customer: "Ramesh Singh", product: "Fresh Tomatoes", quantity: 8, total: 320, status: "shipped", date: "2024-10-21" },
  ]);

  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;

  const stats = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: "💰", color: "bg-green-100 text-green-700" },
    { label: "Total Products", value: totalProducts, icon: "📦", color: "bg-blue-100 text-blue-700" },
    { label: "Total Orders", value: totalOrders, icon: "🛒", color: "bg-purple-100 text-purple-700" },
    { label: "Pending Orders", value: pendingOrders, icon: "⏳", color: "bg-orange-100 text-orange-700" },
  ];

  return (
    <div className="py-8 sm:py-12 md:py-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-poppins">
            Farmer Dashboard
          </h1>
          {user && (
            user.verified ? (
              <span className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold border border-green-500/50">
                <span>✓</span> Verified
              </span>
            ) : (
              <span className="flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/50">
                <span>⏳</span> Pending Verification
              </span>
            )
          )}
        </div>
        <p className="text-gray-300">Manage your products, orders, and track your performance</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { id: "overview", label: "Overview", icon: "📊" },
          { id: "products", label: "Products", icon: "🌾" },
          { id: "orders", label: "Orders", icon: "📦" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-green-600 text-white shadow-2xl shadow-green-500/50'
                : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-white/10'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:scale-105 border border-white/10"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.color} text-2xl mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setActiveTab("products");
                  setShowAddProduct(true);
                }}
                className="flex items-center gap-3 p-4 bg-brandGreen/10 rounded-lg hover:bg-brandGreen/20 transition-colors"
              >
                <span className="text-2xl">➕</span>
                <span className="font-medium text-white">Add Product</span>
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className="flex items-center gap-3 p-4 bg-brandBlue/10 rounded-lg hover:bg-brandBlue/20 transition-colors"
              >
                <span className="text-2xl">📋</span>
                <span className="font-medium text-white">View Orders</span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-purple-900/30 rounded-lg hover:bg-purple-800/40 transition-colors border border-purple-500/30">
                <span className="text-2xl">📊</span>
                <span className="font-medium text-white">View Analytics</span>
              </button>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {orders.slice(0, 3).map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-white/10">
                  <div className="flex-1">
                    <div className="font-semibold text-white">{order.customer}</div>
                    <div className="text-sm text-gray-400">{order.product} × {order.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-400">₹{order.total}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "completed" ? "bg-green-100 text-green-700" :
                      order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                      "bg-orange-100 text-orange-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">Your Products</h2>
            <button
              onClick={() => setShowAddProduct(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 flex items-center gap-2"
            >
              <span>➕</span>
              <span>Add Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl hover:shadow-green-500/20 transition-all duration-300 overflow-hidden border border-white/10"
              >
                <div className="p-6">
                  <div className="text-6xl mb-4 text-center">{product.image}</div>
                  <h3 className="font-semibold text-lg text-white mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{product.category}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Price:</span>
                      <span className="font-semibold text-green-400">₹{product.price}/{product.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brandGray">Stock:</span>
                      <span className="font-semibold">{product.stock} {product.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brandGray">Sold:</span>
                      <span className="font-semibold">{product.sold} {product.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Revenue:</span>
                      <span className="font-semibold text-green-400">₹{product.revenue.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">All Orders</h2>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-brandDark">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-brandDark">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-brandDark">Quantity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-brandDark">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-brandDark">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-brandDark">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-white">#{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-brandGray">{order.product}</td>
                      <td className="px-6 py-4 text-sm text-brandGray">{order.quantity}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-400">₹{order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          order.status === "completed" ? "bg-green-100 text-green-700" :
                          order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                          "bg-orange-100 text-orange-700"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-brandGray">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddProduct(false)}>
          <div
            className="bg-slate-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              if (editingProduct) {
                // Update existing product
                setProducts(products.map(p => 
                  p.id === editingProduct.id 
                    ? {
                        ...p,
                        name: newProduct.name,
                        category: newProduct.category,
                        price: parseFloat(newProduct.price) || 0,
                        unit: newProduct.unit,
                        stock: parseInt(newProduct.stock) || 0,
                      }
                    : p
                ));
              } else {
                // Add new product
                const product: Product = {
                  id: products.length + 1,
                  name: newProduct.name,
                  category: newProduct.category,
                  price: parseFloat(newProduct.price) || 0,
                  unit: newProduct.unit,
                  stock: parseInt(newProduct.stock) || 0,
                  sold: 0,
                  revenue: 0,
                  image: newProduct.category === "Vegetables" ? "🥬" : newProduct.category === "Fruits" ? "🍎" : newProduct.category === "Grains" ? "🌾" : "🥛"
                };
                setProducts([...products, product]);
              }
              setNewProduct({ name: "", category: "Vegetables", price: "", unit: "kg", stock: "" });
              setEditingProduct(null);
              setShowAddProduct(false);
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
                <input type="text" required value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-2 border-2 border-white/20 bg-slate-800/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none" placeholder="e.g., Fresh Tomatoes" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-4 py-2 border-2 border-white/20 bg-slate-800/50 text-white rounded-lg focus:border-green-500 focus:outline-none">
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Grains</option>
                  <option>Dairy</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                  <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-4 py-2 border-2 border-white/20 bg-slate-800/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none" placeholder="40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Unit</label>
                  <input type="text" value={newProduct.unit} onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})} className="w-full px-4 py-2 border-2 border-white/20 bg-slate-800/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none" placeholder="kg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Stock</label>
                <input type="number" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} className="w-full px-4 py-2 border-2 border-white/20 bg-slate-800/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none" placeholder="100" />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProduct(false);
                    setEditingProduct(null);
                    setNewProduct({ name: "", category: "Vegetables", price: "", unit: "kg", stock: "" });
                  }}
                  className="flex-1 px-6 py-3 border-2 border-white/20 text-gray-300 rounded-xl hover:bg-slate-800/50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium shadow-2xl shadow-green-500/50"
                >
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
