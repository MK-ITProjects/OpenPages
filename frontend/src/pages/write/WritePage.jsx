import { useParams } from 'react-router-dom';
import { useFetch } from '../../shared/hooks/useFetch.js';
import { postApi } from '../../entities/post/api/postApi.js';
import { PostEditor } from '../../features/write-post/ui/PostEditor.jsx';

export function WritePage() {
  const { slug } = useParams();
  const { data: post, isLoading } = useFetch(() => (slug ? postApi.get(slug) : Promise.resolve(null)), [slug]);

  if (slug && isLoading) return <main className="mx-auto max-w-2xl px-4 py-10 text-ink-light">Loading...</main>;

  return (
    <main>
      <PostEditor initialPost={post} />
    </main>
  );
}
