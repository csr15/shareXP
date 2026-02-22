import React from 'react';
import BackDrop from './BackDrop';
import './Modal.scss';

interface ModalProps {
  type?: string;
  text?: string;
  pri?: string;
  progress?: number;
  uploadingToDB?: boolean;
  secHandler?: () => void;
  priHandler?: () => void;
  backDropHandler?: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  let modal: React.ReactNode;

  if (props.type === 'progress') {
    modal = (
      <div className="xp-modal-progress">
        {props.uploadingToDB ? (
          <h6>
            Your story is publishing! <i className="bx bxs-rocket" />
          </h6>
        ) : (
          <>
            <h6>Uploading Image</h6>
            <div className="progress">
              <div className="progress-bar" style={{ width: `${props.progress}%` }} />
            </div>
          </>
        )}
      </div>
    );
  } else if (props.type === 'loader') {
    modal = (
      <h6>
        Your story is publishing! <i className="bx bxs-rocket" />
      </h6>
    );
  } else {
    modal = (
      <>
        <h6>{props.text}</h6>
        <div className="xp-modal-buttons">
          <button className="btn btn-secondary" onClick={props.secHandler}>
            cancel
          </button>
          <button className="btn btn-primary" onClick={props.priHandler}>
            {props.pri}
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <BackDrop clickHandler={props.backDropHandler} />
      <div className="xp-modal">{modal}</div>
    </>
  );
};

export default Modal;
