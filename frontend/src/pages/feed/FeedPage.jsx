import { useFetch } from '../../shared/hooks/useFetch.js';
import { postApi } from '../../entities/post/api/postApi.js';
import { PostCard } from '../../entities/post/ui/PostCard.jsx';

export function FeedPage() {
  const { data, error, isLoading } = useFetch(() => postApi.feed({}), []);

  if (isLoading) return <main className="mx-auto max-w-2xl px-4 py-12 text-ink-light">Loading your feed...</main>;
  if (error) return <main className="mx-auto max-w-2xl px-4 py-12 text-ink-light">Failed to load feed.</main>;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="border-b border-hairline pb-4 font-serif text-2xl font-bold text-ink">Your feed</h1>
      {data.posts.length === 0 ? (
        <p className="py-8 text-ink-light">Follow some writers to see their posts here.</p>
      ) : (
        data.posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </main>
  );
}
