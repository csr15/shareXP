import React from "react";
import Skeleton from "react-loading-skeleton";

import "./StorySkeleton.css"

export default function StorySkeleton() {
  return (
    <div className="xp-story-skull my-2">
      <div className="xp-skull_layout">
        <div className="xp-skull ">
          <Skeleton width={150} height={150} />
        </div>
        <div className="xp-skull">
          <div className="my-2">
            <Skeleton width={150} height={35} />
          </div>
          <div className="my-1">
            <Skeleton width={300} height={20} />
          </div>
          <div className="my-1">
            <Skeleton width={300} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
