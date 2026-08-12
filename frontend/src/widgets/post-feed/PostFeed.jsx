import { useEffect, useMemo, useState } from 'react';
import { useFetch } from '../../shared/hooks/useFetch.js';
import { postApi } from '../../entities/post/api/postApi.js';
import { PostCard } from '../../entities/post/ui/PostCard.jsx';

const VISIBLE_POSTS = 5;
const CHANGE_INTERVAL = 5000;

export function PostFeed({ mode = 'foryou', tag }) {
  const { data, error, isLoading } = useFetch(
    () => (mode === 'featured' ? postApi.top(20) : postApi.list({ tag })),
    [mode, tag]
  );

  const posts = Array.isArray(data) ? data : data?.posts;

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setStartIndex(0);
  }, [posts]);

  useEffect(() => {
    if (!posts || posts.length <= VISIBLE_POSTS) return;

    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % posts.length);
    }, CHANGE_INTERVAL);

    return () => clearInterval(timer);
  }, [posts]);

  const visiblePosts = useMemo(() => {
    if (!posts) return [];

    if (posts.length <= VISIBLE_POSTS) return posts;

    return Array.from({ length: VISIBLE_POSTS }, (_, i) => {
      return posts[(startIndex + i) % posts.length];
    });
  }, [posts, startIndex]);

  if (isLoading) {
    return (
      <div className="space-y-5 py-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              animate-pulse
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              shadow-sm
            "
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>

              <div className="flex-1">
                <div className="mb-2 h-3 w-32 rounded bg-gray-200"></div>
                <div className="h-2 w-20 rounded bg-gray-100"></div>
              </div>
            </div>

            <div className="mb-4 h-6 w-4/5 rounded bg-gray-200"></div>

            <div className="space-y-2">
              <div className="h-3 rounded bg-gray-100"></div>
              <div className="h-3 rounded bg-gray-100"></div>
              <div className="h-3 w-3/4 rounded bg-gray-100"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-100
          bg-red-50
          p-10
          text-center
          shadow-sm
        "
      >
        <div className="mb-3 text-5xl">⚠️</div>

        <h2 className="text-xl font-bold text-red-700">
          Failed to load posts
        </h2>

        <p className="mt-2 text-gray-600">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  if (!posts) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-emerald-100
          bg-white
          p-12
          text-center
          shadow-sm
        "
      >
        <div className="mb-4 text-6xl">
          📖
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          No stories yet
        </h2>

        <p className="mt-3 text-gray-600">
          Be the first to publish a story on OpenPages.
        </p>
      </div>
    );
  }

  return (
    <section
      className="
        space-y-6
        pb-10
      "
    >
      {visiblePosts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
        />
      ))}
    </section>
  );
}