import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postApi } from '../../../entities/post/api/postApi.js';

export function PostEditor({ initialPost = null }) {
  const isEditing = Boolean(initialPost);
  const [title, setTitle] = useState(initialPost?.title || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [tags, setTags] = useState(initialPost?.tags?.join(', ') || '');
  const [coverImage, setCoverImage] = useState(initialPost?.coverImage || '');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const buildPayload = (status) => ({
    title,
    content,
    coverImage,
    status,
    tags: tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
  });

  const handleSave = async (status) => {
    setError('');
    setIsSubmitting(true);
    try {
      const payload = buildPayload(status);
      const post = isEditing
        ? await postApi.update(initialPost._id, payload)
        : await postApi.create(payload);
      navigate(`/posts/${post.slug}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Cover image URL (optional)"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="min-w-0 flex-1 border-none text-sm text-ink-light outline-none placeholder:text-ink-faint"
        />
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => handleSave('draft')}
            disabled={isSubmitting}
            className="rounded-full border border-hairline px-4 py-1.5 text-sm font-medium text-ink-light hover:border-ink hover:text-ink disabled:opacity-50"
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={() => handleSave('published')}
            disabled={isSubmitting}
            className="rounded-full bg-green-700 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-800 disabled:opacity-50"
          >
            Publish
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border-none font-serif text-2xl font-bold text-ink outline-none placeholder:text-ink-faint sm:text-4xl"
      />

      <textarea
        placeholder="Tell your story..."
        rows={16}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mt-6 w-full resize-none border-none font-serif text-xl leading-relaxed text-ink outline-none placeholder:text-ink-faint"
      />

      <input
        type="text"
        placeholder="Add tags separated by commas..."
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="mt-4 w-full border-t border-hairline pt-4 text-sm text-ink outline-none placeholder:text-ink-faint"
      />

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
