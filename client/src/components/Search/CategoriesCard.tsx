import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoriesCard.scss';

interface CategoriesCardProps {
  tagTitle: string;
}

const CategoriesCard: React.FC<CategoriesCardProps> = ({ tagTitle }) => {
  const navigate = useNavigate();

  return (
    <div
      className="col-md-3 col-12"
      onClick={() => navigate(`/tagStories/${tagTitle.startsWith('#') ? tagTitle.substr(1) : tagTitle}`)}
    >
      <div className="xp-search-categories-card">
        <h5>{tagTitle}</h5>
      </div>
    </div>
  );
};

export default CategoriesCard;
