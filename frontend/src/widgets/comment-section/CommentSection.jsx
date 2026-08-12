import { useState } from 'react';
import { useFetch } from '../../shared/hooks/useFetch.js';
import { commentApi } from '../../entities/comment/api/commentApi.js';
import { useAuth } from '../../entities/user/model/AuthContext.jsx';

export function CommentSection({ postId }) {
  const { user } = useAuth();
  const { data: comments, isLoading } = useFetch(() => commentApi.list(postId), [postId]);
  const [text, setText] = useState('');
  const [items, setItems] = useState(null);

  const list = items ?? comments;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    const comment = await commentApi.create(postId, text);
    setItems([comment, ...(list || [])]);
    setText('');
  };

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-lg font-semibold text-ink">Responses ({list?.length || 0})</h2>

      {user && (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            placeholder="What are your thoughts?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full resize-none border-b border-hairline py-2 font-serif text-base outline-none focus:border-ink"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white hover:bg-black"
            >
              Respond
            </button>
          </div>
        </form>
      )}

      {isLoading && <p className="text-ink-light">Loading responses...</p>}

      <div className="divide-y divide-hairline">
        {list?.map((comment) => (
          <div key={comment._id} className="py-4">
            <div className="mb-1 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-faint text-[10px] font-semibold text-white">
                {comment.author?.name?.[0]?.toUpperCase()}
              </span>
              <strong className="text-sm text-ink">{comment.author?.name}</strong>
            </div>
            <p className="font-serif text-ink">{comment.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
