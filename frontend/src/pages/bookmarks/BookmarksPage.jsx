import { useFetch } from '../../shared/hooks/useFetch.js';
import { userApi } from '../../entities/user/api/userApi.js';
import { PostCard } from '../../entities/post/ui/PostCard.jsx';

export function BookmarksPage() {
  const { data: posts, isLoading } = useFetch(() => userApi.bookmarks(), []);

  if (isLoading) return <main className="mx-auto max-w-2xl px-4 py-12 text-ink-light">Loading your reading list...</main>;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="border-b border-hairline pb-4 font-serif text-2xl font-bold text-ink">Reading list</h1>
      {posts.length === 0 ? (
        <p className="py-8 text-ink-light">You haven't saved any posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </main>
  );
}
