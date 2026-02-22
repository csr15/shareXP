import React from 'react';

interface PopupProps {
  type: string;
  text: string;
}

const Popup: React.FC<PopupProps> = ({ type, text }) => {
  return (
    <div className="alert-popup">
      <p className={`alert ${type}`} role="alert" style={{ fontWeight: 600 }}>
        {text}
      </p>
    </div>
  );
};

export default Popup;
