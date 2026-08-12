import { useState } from 'react';
import { postApi } from '../../../entities/post/api/postApi.js';
import { useAuth } from '../../../entities/user/model/AuthContext.jsx';

export function ClapButton({ post }) {
  const { user } = useAuth();
  const [claps, setClaps] = useState(post.claps || []);
  const hasClapped = user && claps.some((id) => String(id) === String(user.id));

  const handleClick = async () => {
    if (!user) return;
    const updated = await postApi.clap(post.slug);
    setClaps(updated.claps);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!user}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
        hasClapped
          ? 'border-ink bg-ink text-white'
          : 'border-hairline text-ink-light hover:border-ink hover:text-ink'
      }`}
    >
      <span>👏</span>
      <span>{claps.length}</span>
    </button>
  );
}
