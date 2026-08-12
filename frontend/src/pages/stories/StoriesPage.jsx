import { Link } from 'react-router-dom';
import { useFetch } from '../../shared/hooks/useFetch.js';
import { postApi } from '../../entities/post/api/postApi.js';
import { useAuth } from '../../entities/user/model/AuthContext.jsx';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function StoriesPage() {
  const { user } = useAuth();
  const { data, isLoading } = useFetch(async () => {
    const [published, drafts] = await Promise.all([postApi.list({ author: user.id }), postApi.drafts()]);
    return [...drafts, ...published.posts].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [user.id]);

  if (isLoading) return <main className="py-12 text-ink-light">Loading your stories...</main>;

  return (
    <main className="py-10">
      <h1 className="border-b border-hairline pb-4 font-serif text-2xl font-bold text-ink">Your stories</h1>

      {data.length === 0 ? (
        <p className="py-8 text-ink-light">
          You haven't written anything yet.{' '}
          <Link to="/write" className="text-green-700 hover:underline">
            Start writing
          </Link>
          .
        </p>
      ) : (
        <div className="divide-y divide-hairline">
          {data.map((post) => (
            <div key={post._id} className="flex items-center justify-between py-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {post.status === 'draft' && (
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-ink-light">Draft</span>
                  )}
                  <Link to={post.status === 'published' ? `/posts/${post.slug}` : `/write/${post.slug}`}>
                    <h2 className="font-serif text-lg font-bold text-ink hover:underline">{post.title || 'Untitled'}</h2>
                  </Link>
                </div>
                <p className="mt-1 text-sm text-ink-faint">
                  {post.status === 'draft' ? 'Last edited' : 'Published'} {formatDate(post.updatedAt)} ·{' '}
                  {post.claps?.length || 0} claps
                </p>
              </div>
              <Link to={`/write/${post.slug}`} className="shrink-0 text-sm text-ink-light hover:text-ink">
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
