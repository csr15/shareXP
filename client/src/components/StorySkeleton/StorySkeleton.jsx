import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

import "./StorySkeleton.css";

export default function StorySkeleton() {
  return (
    <>
      <div className="xp-story-skull-web my-2">
        <div className="xp-skull_layout">
          <div className="xp-skull">
            <div className="my-2">
              <Skeleton width={150} height={35} />
            </div>
            <div className="my-1">
              <Skeleton width={300} height={20} count={2} className="my-1" />
            </div>
          </div>
          <div className="xp-skull ">
            <Skeleton width={150} height={150} />
          </div>
        </div>
      </div>
      <div className="xp-story-skull-mobile my-2 mx-auto">
        <div className="xp-skull_layout-mobile">
          <div className="xp-skull">
            <div className="my-2">
              <Skeleton width={150} height={25} />
            </div>
            <div className="my-1">
              <Skeleton width={200} height={15} className="my-1" />
            </div>
          </div>
          <div className="xp-skull ">
            <Skeleton width={100} height={100} />
          </div>
        </div>
      </div>
    </>
  );
}
