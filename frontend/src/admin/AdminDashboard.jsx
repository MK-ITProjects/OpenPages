import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
  users: 0,
  posts: 0,
  comments: 0,
  draftPosts: 0,
});

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    loadDashboard();
  }, []);

  const cardData = [
  { label: "Total Blogs", value: stats.posts },
  { label: "Total Users", value: stats.users },
  { label: "Total Comments", value: stats.comments },
  { label: "Draft Blogs", value: stats.draftPosts },
];

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50/50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">OpenPages Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time overview of your platform metrics.</p>
      </div>

      {/* Grid: 1 column on mobile, exactly 2 columns on tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardData.map((card, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200/80 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-gray-300/80 transition-all duration-200"
          >
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              {card.label}
            </p>
            
            <div className="flex items-baseline justify-between mt-3">
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                {card.value.toLocaleString()}
              </h2>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
