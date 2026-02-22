import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTopTags } from '../../store/slices/search.slice';
import { searchApi } from '../../api/search.api';
import CategoriesCard from './CategoriesCard';
import { TagResult } from '../../types/story.types';
import './Search.scss';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TagResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useAppDispatch();
  const topTags = useAppSelector((s) => s.search.topTags);

  useEffect(() => {
    if (!topTags) {
      dispatch(fetchTopTags());
    }
  }, [topTags, dispatch]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const { data } = await searchApi.search(searchQuery.startsWith('#') ? searchQuery : `#${searchQuery}`);
      setSearchResults(data);
    } catch {
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="xp-search">
      <div className="xp-search-title">
        <h4>Search Tags</h4>
      </div>
      <div className="xp-search-input">
        <input
          type="text"
          placeholder="Search tags eg: #technology"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          autoComplete="off"
        />
        {searchQuery && <i className="bx bx-x" onClick={clearSearch} />}
        <button className="xp-btn-primary" onClick={handleSearch} disabled={isSearching}>
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="xp-search-results">
          <h5>Search Results</h5>
          <div className="row">
            {searchResults.map((tag) => (
              <CategoriesCard key={tag._id} tagTitle={tag._id} />
            ))}
          </div>
        </div>
      )}

      <div className="xp-search-categories">
        <h5>Popular Tags</h5>
        <div className="row">
          {topTags ? (
            topTags.map((tag) => <CategoriesCard key={tag._id} tagTitle={tag._id} />)
          ) : (
            <>
              <Skeleton width={200} height={120} count={4} className="m-2" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
