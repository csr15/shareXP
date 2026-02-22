import React from "react";

export default function Logout({logoutHandler}) {
  return (
    <div className="xp-profile-action text-center">
      <div className="xp-profile-logout">
        <p>Logout from shareXP</p>
        <button className="btn xp-btn-secondary" onClick={logoutHandler}>logout</button>
      </div>
    </div>
  );
}
