import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useFetch } from '../../shared/hooks/useFetch.js';
import { postApi } from '../../entities/post/api/postApi.js';
import { PostCard } from '../../entities/post/ui/PostCard.jsx';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [input, setInput] = useState(q);

  const { data, isLoading } = useFetch(() => (q ? postApi.search(q) : Promise.resolve(null)), [q]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams(input ? { q: input } : {});
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
        <input
          type="text"
          placeholder="Search posts and people"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-w-0 flex-1 rounded-full border border-hairline px-4 py-2 outline-none focus:border-ink"
        />
        <button
          type="submit"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-black"
        >
          Search
        </button>
      </form>

      {isLoading && <p className="text-ink-light">Searching...</p>}

      {data && (
        <>
          {data.users?.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-3 text-sm font-medium text-ink-light">People</h2>
              <div className="flex flex-col gap-2">
                {data.users.map((user) => (
                  <Link
                    key={user._id}
                    to={`/profile/${user._id}`}
                    className="flex items-center gap-3 rounded p-2 hover:bg-gray-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-faint text-xs font-semibold text-white">
                      {user.name?.[0]?.toUpperCase()}
                    </span>
                    <span className="font-medium text-ink">{user.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="mb-3 text-sm font-medium text-ink-light">Posts</h2>
            {data.posts.length === 0 ? (
              <p className="text-ink-light">No posts found.</p>
            ) : (
              data.posts.map((post) => <PostCard key={post._id} post={post} />)
            )}
          </section>
        </>
      )}
    </main>
  );
}
