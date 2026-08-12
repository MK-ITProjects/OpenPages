import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../../shared/hooks/useFetch.js';
import { postApi } from '../../entities/post/api/postApi.js';
import { ClapButton } from '../../features/like-post/ui/ClapButton.jsx';
import { BookmarkButton } from '../../features/bookmark-post/ui/BookmarkButton.jsx';
import { FollowButton } from '../../features/follow-user/ui/FollowButton.jsx';
import { useAuth } from '../../entities/user/model/AuthContext.jsx';
import { CommentSection } from '../../widgets/comment-section/CommentSection.jsx';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function PostDetailPage() {
  const { slug } = useParams();
  const { user } = useAuth();

  const {
    data: post,
    error,
    isLoading,
  } = useFetch(() => postApi.get(slug), [slug]);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 text-center text-gray-500">
        Loading article...
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 text-center text-red-500">
        Article not found.
      </main>
    );
  }

  const isAuthor =
    user &&
    String(user.id) === String(post.author._id);

  return (
    <main className="min-h-screen bg-[#faf9f7] py-12">

      <article className="mx-auto max-w-4xl rounded-3xl bg-white shadow-sm border border-gray-200 overflow-hidden">

        {/* Cover */}

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-[420px] w-full object-cover"
          />
        )}

        <div className="px-8 py-10 md:px-14">

          {/* Tag */}

          {post.tags?.[0] && (
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              #{post.tags[0]}
            </span>
          )}

          {/* Title */}

          <h1 className="mt-5 font-serif text-4xl font-black leading-tight text-gray-900 md:text-5xl">
            {post.title}
          </h1>

          {/* Author */}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-b border-gray-200 pb-8">

            <div className="flex items-center gap-4">

              <Link
                to={`/profile/${post.author._id}`}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-lg font-bold text-white shadow"
              >
                {post.author.name?.[0]?.toUpperCase()}
              </Link>

              <div>

                <div className="flex items-center gap-3">

                  <Link
                    to={`/profile/${post.author._id}`}
                    className="font-semibold text-gray-900 hover:text-emerald-600"
                  >
                    {post.author.name}
                  </Link>

                  <FollowButton profileUser={post.author} />

                </div>

               

              </div>

            </div>

            {isAuthor && (
              <Link
                to={`/write/${post.slug}`}
                className="rounded-full border border-emerald-600 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
              >
                Edit Article
              </Link>
            )}

          </div>

          {/* Actions */}

          <div className="my-8 flex items-center gap-4">
            <ClapButton post={post} />
            <BookmarkButton post={post} />
          </div>

          {/* Article */}

          <div className="prose prose-lg max-w-none leading-loose text-gray-800">

            {post.content.split('\n').map((paragraph, index) => (
              <p
                key={index}
                className="mb-7 text-[18px] leading-9"
              >
                {paragraph}
              </p>
            ))}

          </div>

          {/* Tags */}

          {post.tags?.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-3">

              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                >
                  #{tag}
                </span>
              ))}

            </div>
          )}

          {/* Bottom Actions */}

          <div className="mt-12 flex items-center gap-4 border-y border-gray-200 py-6">

            <ClapButton post={post} />

            <BookmarkButton post={post} />

          </div>

          {/* Comments */}

          <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6">

            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Discussion
            </h2>

            <CommentSection postId={post._id} />

          </div>

        </div>

      </article>

    </main>
  );
}