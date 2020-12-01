import React from "react";
import Skeleton from "react-loading-skeleton";

import "./VTScreenSkeleton.css";

const VTScreenSkeleton = () => {
  return (
    <div className="xp-vt-skull">
      <div className="xp-vt-header">
        <Skeleton width={150} height={30} />
        <Skeleton width={80} height={30} />
      </div>
      <div className="xp-vt-img">
        <Skeleton width={500} height={200} />
      </div>
      <div className="xp-vt-tags">
        <Skeleton
          width={100}
          height={30}
          count={3}
          style={{ margin: "5px 10px" }}
        />
      </div>
      <div className="xp-vt-content">
        <Skeleton width={500} height={50} className="d-block my-3" />
        <Skeleton width={300} height={30} count={2} className="d-block my-2" />
      </div>
    </div>
  );
};

export default VTScreenSkeleton;
