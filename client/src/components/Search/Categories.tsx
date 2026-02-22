import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTopTags } from '../../store/slices/search.slice';
import './Categories.scss';

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const topTags = useAppSelector((s) => s.search.topTags);

  useEffect(() => {
    if (!topTags) {
      dispatch(fetchTopTags());
    }
  }, [topTags, dispatch]);

  return (
    <div className="xp-categories">
      <div className="xp-categories-list">
        {topTags ? (
          topTags.map((tag) => (
            <p key={tag._id} onClick={() => navigate(`/tagStories/${tag._id.substr(1)}`)}>
              {tag._id}
            </p>
          ))
        ) : (
          <>
            <Skeleton width={70} height={20} style={{ margin: '3px' }} count={5} />
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;
