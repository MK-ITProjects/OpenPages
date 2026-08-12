import { Link } from 'react-router-dom';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function PostCard({ post }) {
  return (
    <article
      className="
      group
      overflow-hidden
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-emerald-200
      hover:shadow-xl
    "
    >
      {/* Author */}

      <div className="mb-5 flex items-center gap-3">
        <Link
          to={`/profile/${post.author?._id}`}
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-emerald-500
          to-green-700
          text-sm
          font-bold
          text-white
          shadow-md
          transition-transform
          duration-300
          group-hover:scale-105
        "
        >
          {post.author?.name?.[0]?.toUpperCase()}
        </Link>

        <div className="min-w-0">
          <Link
            to={`/profile/${post.author?._id}`}
            className="
            font-semibold
            text-gray-800
            transition
            hover:text-emerald-700
          "
          >
            {post.author?.name}
          </Link>

          <div className="mt-1 text-xs text-gray-500">
            Published on {formatDate(post.createdAt)}
          </div>
        </div>
      </div>

      {/* Main Content */}

      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <Link to={`/posts/${post.slug}`}>
            <h2
              className="
              font-serif
              text-2xl
              font-bold
              leading-tight
              tracking-tight
              text-gray-900
              transition
              duration-300
              group-hover:text-emerald-700
            "
            >
              {post.title}
            </h2>

            <p
              className="
              mt-4
              line-clamp-3
              text-[15px]
              leading-7
              text-gray-600
            "
            >
              {post.content?.slice(0, 180)}...
            </p>
          </Link>

          {/* Footer */}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {post.tags?.map((tag, index) => (
              <span
                key={index}
                className="
                rounded-full
                bg-emerald-50
                px-3
                py-1
                text-xs
                font-semibold
                text-emerald-700
                transition
                hover:bg-emerald-100
              "
              >
                #{tag}
              </span>
            ))}

            

            <div className="ml-auto flex items-center gap-2">
              <span
                className="
                rounded-full
                bg-orange-50
                px-3
                py-1
                text-sm
                font-medium
                text-orange-600
              "
              >
                👏 {post.claps?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Cover Image */}

        {post.coverImage && (
          <Link
            to={`/posts/${post.slug}`}
            className="hidden shrink-0 sm:block"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="
              h-36
              w-36
              rounded-2xl
              object-cover
              shadow-md
              transition-all
              duration-500
              group-hover:scale-105
              group-hover:shadow-xl"
            />
          </Link>
        )}
      </div>
    </article>
  );
}