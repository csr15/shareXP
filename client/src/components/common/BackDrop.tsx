import React from 'react';
import './BackDrop.css';

interface BackDropProps {
  clickHandler?: () => void;
}

const BackDrop: React.FC<BackDropProps> = ({ clickHandler }) => {
  return <div className="xp-backdrop" onClick={clickHandler} />;
};

export default BackDrop;
