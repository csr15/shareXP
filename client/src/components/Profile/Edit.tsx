import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { updateProfile } from '../../store/slices/profile.slice';
import { profileApi } from '../../api/profile.api';
import Popup from '../common/Popup';
import { UserDetails } from '../../types/auth.types';

interface EditProps {
  userDetails: UserDetails | null;
}

const Edit: React.FC<EditProps> = ({ userDetails }) => {
  const [description, setDescription] = useState('');
  const [workingStatus, setWorkingStatus] = useState('');
  const [socialLinks, setSocialLinks] = useState({ facebook: '', linkedIn: '', link: '' });
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarError, setAvatarError] = useState(false);
  const [isAvatarDeleted, setIsAvatarDeleted] = useState(false);
  const [deletingAvatar, setDeletingAvatar] = useState(false);

  const dispatch = useAppDispatch();

  if (!userDetails) return <p className="text-center m-3">Loading...</p>;

  const saveProfile = () => {
    dispatch(updateProfile({
      description: description || userDetails.description,
      socialLinks: {
        facebook: socialLinks.facebook || userDetails.facebook,
        linkedIn: socialLinks.linkedIn || userDetails.linkedIn,
        link: socialLinks.link || userDetails.link,
      },
      workingStatus: workingStatus || userDetails.workingStatus,
      avatar: avatarUrl || userDetails.avatar,
    }));
  };

  const deleteAvatar = async () => {
    setDeletingAvatar(true);
    try {
      await profileApi.deleteAvatar(localStorage.getItem('uid') || '');
      setIsAvatarDeleted(true);
      setDeletingAvatar(false);
    } catch {
      setAvatarError(true);
      setDeletingAvatar(false);
      setTimeout(() => setAvatarError(false), 3000);
    }
  };

  return (
    <div className="xp-profile-details">
      <div className="xp-profile-description">
        <h6>Summary</h6>
        <textarea
          placeholder="Describe about you"
          value={description || userDetails.description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="xp-profile-status">
        <h6>Working status</h6>
        <input
          type="text"
          placeholder="eg: Student"
          autoComplete="off"
          value={workingStatus || userDetails.workingStatus}
          onChange={(e) => setWorkingStatus(e.target.value)}
        />
      </div>
      <div className="xp-profile-social_media">
        <h6>Social Links</h6>
        <input type="text" placeholder="Facebook URL" value={socialLinks.facebook || userDetails.facebook} onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })} />
        <input type="text" placeholder="LinkedIn URL" value={socialLinks.linkedIn || userDetails.linkedIn} onChange={(e) => setSocialLinks({ ...socialLinks, linkedIn: e.target.value })} />
        <input type="text" placeholder="Website URL" value={socialLinks.link || userDetails.link} onChange={(e) => setSocialLinks({ ...socialLinks, link: e.target.value })} />
      </div>
      <div className="xp-profile-avatar">
        <h6>Avatar URL</h6>
        <input type="text" placeholder="Enter avatar image URL" value={avatarUrl || userDetails.avatar} onChange={(e) => setAvatarUrl(e.target.value)} />
        <button className="xp-btn-secondary mt-2" onClick={deleteAvatar} disabled={!userDetails.avatar || deletingAvatar}>
          {deletingAvatar ? 'Deleting...' : 'Delete Avatar'}
        </button>
      </div>
      <div className="d-flex mt-3 justify-content-center">
        <button className="xp-btn-secondary mx-2" onClick={() => { setDescription(''); setWorkingStatus(''); setSocialLinks({ facebook: '', linkedIn: '', link: '' }); setAvatarUrl(''); }}>
          Cancel
        </button>
        <button className="xp-btn-primary mx-2" onClick={saveProfile}>Save</button>
      </div>
      {avatarError && <Popup type="alert-danger" text="Something went wrong, please try again later" />}
      {isAvatarDeleted && <Popup type="alert-success" text="Avatar deleted" />}
    </div>
  );
};

export default Edit;
