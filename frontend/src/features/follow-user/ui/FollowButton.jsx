import { useState } from 'react';
import { userApi } from '../../../entities/user/api/userApi.js';
import { useAuth } from '../../../entities/user/model/AuthContext.jsx';

export function FollowButton({ profileUser, initiallyFollowing = false }) {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(initiallyFollowing);

  if (!user || user.id === String(profileUser._id)) return null;

  const handleClick = async () => {
    const result = await userApi.follow(profileUser._id);
    setIsFollowing(result.isFollowing);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        isFollowing
          ? 'border border-hairline text-ink hover:border-red-200 hover:bg-red-50 hover:text-red-600'
          : 'bg-ink text-white hover:bg-black'
      }`}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
}
