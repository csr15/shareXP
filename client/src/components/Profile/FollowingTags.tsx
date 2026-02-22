import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { unFollowTag } from '../../store/slices/profile.slice';
import { UserDetails } from '../../types/auth.types';

interface FollowingTagsProps {
  userDetails: UserDetails | null;
}

const FollowingTags: React.FC<FollowingTagsProps> = ({ userDetails }) => {
  const dispatch = useAppDispatch();

  if (!userDetails) return <p className="text-center m-3">Loading...</p>;

  if (userDetails.following.length === 0) {
    return <p className="text-center m-4">You are not following any tags yet.</p>;
  }

  return (
    <div className="xp-following-tags">
      {userDetails.following.map((tag) => (
        <div key={tag} className="xp-following-tag-item d-flex align-items-center justify-content-between my-2">
          <p className="my-auto">{tag}</p>
          <button className="xp-btn-secondary" onClick={() => dispatch(unFollowTag(tag))}>
            Unfollow
          </button>
        </div>
      ))}
    </div>
  );
};

export default FollowingTags;
