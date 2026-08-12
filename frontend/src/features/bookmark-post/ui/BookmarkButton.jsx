import { useState } from 'react';
import { postApi } from '../../../entities/post/api/postApi.js';
import { useAuth } from '../../../entities/user/model/AuthContext.jsx';

export function BookmarkButton({ post }) {
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!user) return null;

  const handleClick = async () => {
    const result = await postApi.bookmark(post.slug);
    setIsBookmarked(result.isBookmarked);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full border border-hairline p-1.5 text-ink-light hover:border-ink hover:text-ink"
      title={isBookmarked ? 'Remove from reading list' : 'Save to reading list'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">
        <path d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1Z" />
      </svg>
    </button>
  );
}
