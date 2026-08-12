import { useEffect, useState } from "react";
import { postApi } from "../../entities/post/api/postApi.js";

export function StatsPage() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    latestPost: "-",
  });

useEffect(() => {
  async function load() {
    try {
      const data = await postApi.userStats();

      setStats({
        totalPosts: data.totalPosts,
        latestPost: data.latestPost,
      });
    } catch (err) {
      console.log(err);
    }
  }

  load();
}, []);

  return (
    <main className="py-10">
      <h1 className="border-b border-hairline pb-4 font-serif text-3xl font-bold text-ink">
        Statistics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

        {/* Total Blogs */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h3 className="text-sm uppercase tracking-wider text-gray-500">
            Total Blogs
          </h3>

          <p className="mt-4 text-5xl font-bold text-gray-900">
            {stats.totalPosts}
          </p>
        </div>

        {/* Latest Blog */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h3 className="text-sm uppercase tracking-wider text-gray-500">
            Latest Blog
          </h3>

          <p className="mt-4 text-2xl font-semibold text-gray-900 leading-relaxed">
            {stats.latestPost}
          </p>
        </div>

      </div>
    </main>
  );
}