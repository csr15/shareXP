import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

import "./StorySkeleton.css";

export default function StorySkeleton() {
  return (
    <>
      <div className="xp-story-skull-web my-2">
        <div className="xp-skull_layout">
          <div className="xp-skull ">
            <Skeleton width={150} height={150} />
          </div>
          <div className="xp-skull">
            <div className="my-2">
              <Skeleton width={150} height={35} />
            </div>
            <div className="my-1">
              <Skeleton width={300} height={20} count={2} className="my-1" />
            </div>
          </div>
        </div>
      </div>
      <div className="xp-story-skull-mobile my-3">
        <div className="d-block my-2">
          <Skeleton width={300} height={150} />
        </div>
        <div className="d-block">
          <Skeleton
            width={250}
            height={30}
            style={{ borderRadius: "50px" }}
            className="my-2"
          />
        </div>
        <div className="d-block">
          <Skeleton
            width={200}
            height={15}
            style={{ borderRadius: "50px" }}
            className="my-2 d-block"
            count={2}
          />
        </div>
      </div>
    </>
  );
}
