import { useState } from "react";

interface Review {
  id: number;
  name: string;
  role: "Farmer" | "Consumer";
  rating: number;
  date: string;
  title: string;
  content: string;
  avatar: string;
  verified: boolean;
  helpful: number;
}

export default function Reviews() {
  const [filter, setFilter] = useState<"all" | "farmers" | "consumers">("all");
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "helpful">("recent");
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    role: "Farmer" as "Farmer" | "Consumer",
    rating: 5,
    title: "",
    content: ""
  });

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Farmer",
      rating: 5,
      date: "2024-10-20",
      title: "Excellent platform for farmers!",
      content: "AgriConnect has transformed my business. I can now sell directly to consumers without middlemen taking huge cuts. My income has increased by 40% in just 3 months. The platform is easy to use and customer support is fantastic!",
      avatar: "👨‍🌾",
      verified: true,
      helpful: 45
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Consumer",
      rating: 5,
      date: "2024-10-18",
      title: "Fresh produce at great prices",
      content: "I love buying from local farmers through AgriConnect. The vegetables are always fresh, and I know exactly where my food comes from. The prices are fair, and I feel good supporting local agriculture.",
      avatar: "👩",
      verified: true,
      helpful: 38
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Farmer",
      rating: 4,
      date: "2024-10-15",
      title: "Great concept, minor improvements needed",
      content: "Overall, I'm very satisfied with AgriConnect. It's helped me reach more customers and manage my inventory better. Would love to see more analytics features in the future.",
      avatar: "👨",
      verified: true,
      helpful: 29
    },
    {
      id: 4,
      name: "Sunita Devi",
      role: "Consumer",
      rating: 5,
      date: "2024-10-12",
      title: "Supporting local farmers made easy",
      content: "This platform makes it so convenient to support local farmers. The ordering process is smooth, delivery is prompt, and the quality is consistently excellent. Highly recommend!",
      avatar: "👩‍🦰",
      verified: true,
      helpful: 52
    },
    {
      id: 5,
      name: "Ramesh Singh",
      role: "Farmer",
      rating: 5,
      date: "2024-10-10",
      title: "Best decision for my farm",
      content: "Joining AgriConnect was the best decision I made for my farm. Direct customer relationships, fair pricing, and a platform that actually cares about farmers. Thank you!",
      avatar: "👨‍🌾",
      verified: true,
      helpful: 41
    },
    {
      id: 6,
      name: "Meena Kumari",
      role: "Consumer",
      rating: 4,
      date: "2024-10-08",
      title: "Quality products, good service",
      content: "I've been using AgriConnect for two months now. The produce quality is excellent and I appreciate knowing the farmers personally. Sometimes delivery takes a bit longer, but overall very satisfied.",
      avatar: "👩",
      verified: true,
      helpful: 23
    }
  ]);

  const filteredReviews = reviews.filter(review => {
    if (filter === "all") return true;
    return filter === "farmers" ? review.role === "Farmer" : review.role === "Consumer";
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "helpful") return b.helpful - a.helpful;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: reviews.length + 1,
      name: newReview.name,
      role: newReview.role,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      title: newReview.title,
      content: newReview.content,
      avatar: newReview.role === "Farmer" ? "👨‍🌾" : "👤",
      verified: false,
      helpful: 0
    };
    setReviews([review, ...reviews]);
    setNewReview({ name: "", role: "Farmer", rating: 5, title: "", content: "" });
    setShowWriteReview(false);
  };

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  return (
    <div className="py-8 sm:py-12 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 font-poppins">
          Community Reviews
        </h1>
        <p className="text-gray-300">Real experiences from our farmers and consumers</p>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/10">
          <div className="text-center">
            <div className="text-5xl font-bold text-green-400 mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map(star => (
                <span key={star} className={`text-2xl ${star <= averageRating ? 'text-yellow-500' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-300">Based on {reviews.length} reviews</p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/10 lg:col-span-2">
          <h3 className="font-semibold text-white mb-4">Rating Distribution</h3>
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-medium w-8 text-white">{rating}★</span>
                <div className="flex-1 bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-300 w-12 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2">
          {[
            { id: "all", label: "All Reviews" },
            { id: "farmers", label: "Farmers" },
            { id: "consumers", label: "Consumers" }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as "all" | "farmers" | "consumers")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                filter === f.id
                  ? 'bg-green-600 text-white shadow-2xl shadow-green-500/50'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "rating" | "helpful")}
            className="px-4 py-2 border-2 border-white/20 bg-slate-800/50 text-white rounded-lg focus:border-green-500 focus:outline-none"
          >
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Write Review Button */}
      <button
        onClick={() => setShowWriteReview(true)}
        className="w-full sm:w-auto mb-8 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 flex items-center justify-center gap-2"
      >
        <span>✍️</span>
        <span>Write a Review</span>
      </button>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map(review => (
          <div
            key={review.id}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 border border-white/10"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{review.avatar}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{review.name}</span>
                    {review.verified && (
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">{review.role}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex mb-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={`text-lg ${star <= review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-400">{review.date}</div>
              </div>
            </div>

            <h3 className="font-semibold text-lg text-white mb-2">{review.title}</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">{review.content}</p>

            <div className="flex items-center gap-4 pt-4 border-t">
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors">
                <span>👍</span>
                <span>Helpful ({review.helpful})</span>
              </button>
              <button className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowWriteReview(false)}>
          <div
            className="bg-slate-900 rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Write a Review</h2>
            <form className="space-y-4" onSubmit={handleSubmitReview}>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                <input type="text" required value={newReview.name} onChange={(e) => setNewReview({...newReview, name: e.target.value})} className="w-full px-4 py-2 border-2 border-white/20 bg-slate-800/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">You are a</label>
                <select value={newReview.role} onChange={(e) => setNewReview({...newReview, role: e.target.value as "Farmer" | "Consumer"})} className="w-full px-4 py-2 border-2 border-white/20 bg-slate-800/50 text-white rounded-lg focus:border-green-500 focus:outline-none">
                  <option>Farmer</option>
                  <option>Consumer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className={`text-4xl transition-colors ${star <= newReview.rating ? 'text-yellow-500' : 'text-gray-600 hover:text-yellow-500'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Review Title</label>
                <input type="text" required value={newReview.title} onChange={(e) => setNewReview({...newReview, title: e.target.value})} className="w-full px-4 py-2 border-2 border-white/20 bg-slate-800/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none" placeholder="Summarize your experience" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Review</label>
                <textarea
                  rows={5}
                  required
                  value={newReview.content}
                  onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-white/20 bg-slate-800/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none resize-none"
                  placeholder="Share your experience with AgriConnect..."
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowWriteReview(false)}
                  className="flex-1 px-6 py-3 border-2 border-white/20 text-gray-300 rounded-xl hover:bg-slate-800/50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium shadow-2xl shadow-green-500/50"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
