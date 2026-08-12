import { useSearchParams } from 'react-router-dom';
import { PostFeed } from '../../widgets/post-feed/PostFeed.jsx';

const TABS = [
  { key: 'foryou', label: 'For You' },
  { key: 'featured', label: 'Featured' },
];

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tag = searchParams.get('tag') || '';
  const tab = tag ? 'foryou' : searchParams.get('tab') || 'foryou';

  const selectTab = (key) => {
    const next = new URLSearchParams();

    if (key !== 'foryou') {
      next.set('tab', key);
    }

    setSearchParams(next);
  };

  return (
    <main
className="
min-h-screen
w-full
bg-[#fbfdfb]
py-8
pl-6
pr-6
"
>
      <h1 className="sr-only">
        OpenPages Feed
      </h1>

      {/* Page Heading */}

      <div className="mb-8">
        <h2
          className="
          font-serif
          text-4xl
          font-bold
          tracking-tight
          text-gray-900
        "
        >
          Discover Stories
        </h2>

        <p
          className="
          mt-2
          text-gray-600
        "
        >
          Read inspiring articles, tutorials, and ideas from the OpenPages
          community.
        </p>
      </div>

      {/* Tabs */}

      <div
        className="
        mb-8
        flex
        items-center
        gap-8
        border-b
        border-emerald-100
      "
      >
        {tag ? (
          <span
            className="
            relative
            pb-4
            text-sm
            font-semibold
            capitalize
            text-emerald-700
            after:absolute
            after:bottom-0
            after:left-0
            after:h-[3px]
            after:w-full
            after:rounded-full
            after:bg-emerald-600
          "
          >
            #{tag}
          </span>
        ) : (
          TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => selectTab(key)}
              className={`
                relative
                pb-4
                text-sm
                font-semibold
                tracking-wide
                transition-all
                duration-300

                ${
                  tab === key
                    ? 'text-emerald-700 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-emerald-600'
                    : 'text-gray-500 hover:text-emerald-600'
                }
              `}
            >
              {label}
            </button>
          ))
        )}
      </div>

      {/* Feed */}

      <section
        className="
        space-y-6
      "
      >
        <PostFeed
          mode={tag ? 'foryou' : tab}
          tag={tag}
        />
      </section>
    </main>
  );
}