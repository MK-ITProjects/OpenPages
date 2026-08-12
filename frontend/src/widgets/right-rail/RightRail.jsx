import { Link } from 'react-router-dom';
import { useFetch } from '../../shared/hooks/useFetch.js';
import { postApi } from '../../entities/post/api/postApi.js';
import { userApi } from '../../entities/user/api/userApi.js';
import { FollowButton } from '../../features/follow-user/ui/FollowButton.jsx';
import { useAuth } from '../../entities/user/model/AuthContext.jsx';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function RightRail() {
  const { user } = useAuth();

  const { data: topPosts } = useFetch(() => postApi.top(4), []);

  const { data: tags } = useFetch(() => postApi.popularTags(), []);

  const { data: suggestions } = useFetch(
    () => userApi.suggestions(user?.id, 4),
    [user?.id]
  );

  return (
    <aside
      className="
      sticky
      top-16
      hidden
      h-[calc(100vh-4rem)]
      w-80
      shrink-0
      overflow-y-auto
      bg-[#f8fcf9]
      px-3
      py-6
      xl:flex
      xl:flex-col
      xl:gap-6
    "
    >
      {/* Staff Picks */}

      <section
        className="
        rounded-2xl
        border
        border-emerald-100
        bg-white
        p-5
        shadow-sm
      "
      >
        <h2 className="mb-5 text-lg font-bold text-gray-900">
         Staff Picks
        </h2>

        <div className="space-y-5">
          {topPosts?.length ? (
            topPosts.map((post) => (
              <Link
                key={post._id}
                to={`/posts/${post.slug}`}
                className="
                block
                rounded-xl
                p-3
                transition-all
                duration-300
                hover:bg-emerald-50
              "
              >
                <div className="flex items-center gap-3">
                  <span
                    className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-emerald-500
                    to-green-700
                    text-xs
                    font-bold
                    text-white
                  "
                  >
                    {post.author.name?.[0]?.toUpperCase()}
                  </span>

                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {post.author.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                </div>

                <h3
                  className="
                  mt-3
                  font-serif
                  text-lg
                  font-bold
                  leading-snug
                  text-gray-900
                  transition
                  hover:text-emerald-700
                "
                >
                  {post.title}
                </h3>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">
              No stories yet.
            </p>
          )}
        </div>

        <Link
          to="/search"
          className="
          mt-5
          inline-block
          text-sm
          font-medium
          text-emerald-700
          hover:underline
        "
        >
          View all →
        </Link>
      </section>

      {/* Topics */}

      {tags?.length > 0 && (
        <section
          className="
          rounded-2xl
          border
          border-emerald-100
          bg-white
          p-5
          shadow-sm
        "
        >
          <h2 className="mb-5 text-lg font-bold text-gray-900">
            📚 Recommended Topics
          </h2>

          <div className="flex flex-wrap gap-2">
            {tags.map(({ tag }) => (
              <Link
                key={tag}
                to={`/?tag=${tag}`}
                className="
                rounded-full
                bg-emerald-50
                px-4
                py-2
                text-sm
                font-medium
                text-emerald-700
                transition
                duration-300
                hover:bg-emerald-100
              "
              >
                #{tag}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Follow */}

      {user && suggestions?.length > 0 && (
        <section
          className="
          rounded-2xl
          border
          border-emerald-100
          bg-white
          p-5
          shadow-sm
        "
        >
          <h2 className="mb-5 text-lg font-bold text-gray-900">
             Who to Follow
          </h2>

          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion._id}
                className="
                flex
                items-center
                justify-between
                gap-3
              "
              >
                <Link
                  to={`/profile/${suggestion._id}`}
                  className="
                  flex
                  min-w-0
                  items-center
                  gap-3
                "
                >
                  <span
                    className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-emerald-500
                    to-green-700
                    text-sm
                    font-bold
                    text-white
                  "
                  >
                    {suggestion.name?.[0]?.toUpperCase()}
                  </span>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-800">
                      {suggestion.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      Writer
                    </p>
                  </div>
                </Link>

                <FollowButton profileUser={suggestion} />
              </div>
            ))}
          </div>
        </section>
      )}
    </aside>
  );
}