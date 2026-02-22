import React from "react";

export default function DangerZone({ onClick }) {
  return (
    <div className="xp-profile-action text-center">
      <div className="xp-profile-danger_zone">
        <p>
          I want to quit <span>shareXP</span>{" "}
        </p>
        <button className="btn xp-btn-danger" onClick={onClick}>
          Delete my account
        </button>
      </div>
    </div>
  );
}
