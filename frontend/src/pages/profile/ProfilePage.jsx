import { useParams } from 'react-router-dom';
import { useFetch } from '../../shared/hooks/useFetch.js';
import { userApi } from '../../entities/user/api/userApi.js';
import { postApi } from '../../entities/post/api/postApi.js';
import { PostCard } from '../../entities/post/ui/PostCard.jsx';
import { FollowButton } from '../../features/follow-user/ui/FollowButton.jsx';
import { useAuth } from '../../entities/user/model/AuthContext.jsx';

export function ProfilePage() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const { data: profileUser, isLoading: isLoadingUser } = useFetch(() => userApi.get(id), [id]);
  const { data: followers } = useFetch(() => userApi.followers(id), [id]);
  const { data: postsResult, isLoading: isLoadingPosts } = useFetch(
    () => postApi.list({ author: id }),
    [id]
  );

  if (isLoadingUser) return <main className="mx-auto max-w-2xl px-4 py-12 text-ink-light">Loading...</main>;

  const initiallyFollowing = Boolean(
    currentUser && followers?.some((follower) => String(follower._id) === String(currentUser.id))
  );

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-faint text-xl font-semibold text-white">
            {profileUser.name?.[0]?.toUpperCase()}
          </span>
          <div>
            <h1 className="font-serif text-2xl font-bold text-ink">{profileUser.name}</h1>
            {profileUser.bio && <p className="mt-1 text-ink-light">{profileUser.bio}</p>}
            <p className="mt-1 text-sm text-ink-faint">{followers?.length || 0} followers</p>
          </div>
        </div>
        <FollowButton profileUser={profileUser} initiallyFollowing={initiallyFollowing} />
      </div>

      <h2 className="border-b border-hairline pb-3 text-sm font-medium text-ink-light">Posts</h2>
      {isLoadingPosts ? (
        <p className="py-8 text-ink-light">Loading posts...</p>
      ) : postsResult?.posts?.length ? (
        postsResult.posts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <p className="py-8 text-ink-light">No published posts yet.</p>
      )}
    </main>
  );
}
