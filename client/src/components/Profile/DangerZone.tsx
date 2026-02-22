import React from 'react';

interface DangerZoneProps {
  onClick: () => void;
}

const DangerZone: React.FC<DangerZoneProps> = ({ onClick }) => {
  return (
    <div className="xp-danger-zone text-center my-4">
      <h4>Danger Zone</h4>
      <p>Once you delete your account, there is no going back. Please be certain.</p>
      <button className="btn btn-danger" onClick={onClick}>
        Delete my account
      </button>
    </div>
  );
};

export default DangerZone;
