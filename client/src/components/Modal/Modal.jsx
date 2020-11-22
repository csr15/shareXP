import React from "react";

import "./Modal.css";
import BackDrop from "../BackDrop/BackDrop";

export default function Modal(props) {
  let modal = "";
  if (props.type === "progress") {
    modal = (
      <div className="xp-modal-progress">
        {props.uploadingToDB ? (
          <h6>
            Your story is publishing ! <i className="bx bxs-rocket"></i>
          </h6>
        ) : (
          <React.Fragment>
            <h6>Uploading Image</h6>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${props.progress}%` }}
              ></div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  } else {
    modal = (
      <React.Fragment>
        <h6>{props.text}</h6>
        <div className="xp-modal-buttons">
          <button className="btn btn-secondary" onClick={props.secHandler}>
            cancel
          </button>
          <button className="btn btn-primary" onClick={props.priHandler}>
            {props.pri}
          </button>
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <BackDrop />
      <div className="xp-modal">{modal}</div>
    </React.Fragment>
  );
}
