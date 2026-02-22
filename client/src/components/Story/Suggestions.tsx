import React from 'react';
import { config } from '../../utils/constants';
import './Suggestions.scss';

interface SuggestionsProps {
  title: string;
  img?: string;
  clickHandler: () => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({ title, img, clickHandler }) => {
  return (
    <div className="col-md-4" onClick={clickHandler}>
      <div className="xp-sugg-card">
        <div className="row">
          <div className="col-md-12">
            <div className="xp-sugg-img">
              {img && <img src={img} alt={config.imgAlt} />}
            </div>
            <div className="col-md-12 xp-sugg-title">
              <h6>{title}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
