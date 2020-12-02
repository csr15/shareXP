import React from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store";

export default function FollowingTags({ userDetails }) {
  const unFollowedTag = useSelector((state) => {
    return state.profile.unfollowedTag;
  });

  const dispatch = useDispatch();
  const unFollowTagHandler = (tagName) => {
    dispatch(actions.unFollowTagHandler(tagName));
  };

  return (
    <div className="xp-profile-action text-center">
      <div className="xp-profile-following_tags">
        {userDetails.following.length <= 0 ? (
          <p>You are not following any tags</p>
        ) : (
          userDetails.following.map((el, index) => {
            return (
              <div className="xp-following-card" key={index}>
                <h5>#{el}</h5>
                <button
                  className="btn xp-btn-danger"
                  onClick={unFollowTagHandler.bind(this, el)}
                  disabled={
                    unFollowedTag.length > 0 && unFollowedTag.includes(el)
                  }
                  style={
                    unFollowedTag.length > 0
                      ? unFollowedTag.includes(el)
                        ? { cursor: "not-allowed" }
                        : { cursor: "pointer" }
                      : null
                  }
                >
                  {unFollowedTag.includes(el) ? "Unfollowed" : "UnFollow"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
