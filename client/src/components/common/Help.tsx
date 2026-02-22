import React from 'react';
import { Link } from 'react-router-dom';
import './Help.scss';

const Help: React.FC = () => {
  return (
    <div className="xp-help">
      <div className="xp-help-header">
        <div className="container">
          <h1>
            welcome to
            <br />
            <span>shareXP</span>
          </h1>
        </div>
      </div>
      <div className="xp-help-container">
        <div className="xp-help-what">
          <h4>What is shareXP</h4>
          <p>
            shareXP is used to share your experience with others on how you succeed. It can be any
            experience that might help other people who are struggling towards success!
          </p>
        </div>
        <div className="xp-help-FAQ">
          <h4>FAQ's</h4>
          <details>
            <summary>How to share a story?</summary>
            <div className="xp-help-content">
              <ol>
                <li>Click <Link to="/publish">Share experience</Link> button on navbar</li>
                <li>On title field type the title of your story</li>
                <li>On content field type your content (experience)</li>
                <li>On Add Tags field type your tags</li>
                <li>Choose a display image or leave it</li>
                <li>Then tap Share button to share your story</li>
              </ol>
            </div>
          </details>
          <details>
            <summary>How to search and follow a tag?</summary>
            <div className="xp-help-content">
              <ol>
                <li>Click <Link to="/search">Search</Link> button on navbar</li>
                <li>Type a tag on search field and tap Search</li>
                <li>Tap the tag card to view stories</li>
                <li>Follow/unfollow by tapping the Follow button</li>
              </ol>
            </div>
          </details>
          <details>
            <summary>How to create an account/login?</summary>
            <div className="xp-help-content">
              <ol>
                <li>Go to <Link to="/auth">Authentication</Link> page</li>
                <li>Choose to login or create an account</li>
                <li>Username must be unique</li>
                <li>Fill all fields and submit</li>
              </ol>
            </div>
          </details>
        </div>
      </div>
      <div className="xp-footer text-center">
        <h6>
          shareXP, Made with <i className="bx bxs-heart bx-burst" /> by{' '}
          <a href="https://ragulcs.netlify.app" target="_blank" rel="noopener noreferrer">
            <span>Ragul CS</span>
          </a>
        </h6>
      </div>
    </div>
  );
};

export default Help;
