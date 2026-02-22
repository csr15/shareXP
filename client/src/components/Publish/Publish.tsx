import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { publishStory, updateStory } from '../../store/slices/story.slice';
import { storyApi } from '../../api/story.api';
import Popup from '../common/Popup';
import BackDrop from '../common/BackDrop';
import { StoryContent } from '../../types/story.types';
import './Publish.scss';

const Publish: React.FC = () => {
  const [story, setStory] = useState<StoryContent>({ title: '', content: '', tags: [], img: '' });
  const [tagInput, setTagInput] = useState('');
  const [fieldsNotFilled, setFieldsNotFilled] = useState(false);
  const [storyError, setStoryError] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { storyId } = useParams<{ storyId: string }>();

  const publishedStory = useAppSelector((s) => s.story.publishedStory);
  const userDetails = useAppSelector((s) => s.profile.userDetails);
  const authState = useAppSelector((s) => s.auth.authState);
  const didStoryUpdated = useAppSelector((s) => s.story.didStoryUpdated);
  const errorOnPublishing = useAppSelector((s) => s.story.errorOnPublishing);

  useEffect(() => {
    if (publishedStory !== '' || didStoryUpdated) {
      navigate('/profile');
    }
  }, [publishedStory, didStoryUpdated, navigate]);

  useEffect(() => {
    if (storyId) {
      (async () => {
        try {
          const { data } = await storyApi.getById(storyId);
          setStory(data.story);
        } catch {
          setStoryError(true);
          setTimeout(() => setStoryError(false), 3000);
        }
      })();
    }
  }, [storyId]);

  const publishContent = () => {
    if (!story.title || !story.content || story.tags.length === 0) {
      setFieldsNotFilled(true);
      setTimeout(() => setFieldsNotFilled(false), 3000);
      return;
    }
    setLoader(true);
    dispatch(publishStory({
      uid: localStorage.getItem('uid') || '',
      userName: userDetails?.userName || '',
      story,
    }));
  };

  const updateContent = () => {
    if (!storyId) return;
    setLoader(true);
    dispatch(updateStory({ storyId, story }));
  };

  const onSetTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.replace('#', '').trim();
      if (tag) {
        setStory({ ...story, tags: [...story.tags, `#${tag}`] });
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setStory({ ...story, tags: story.tags.filter((t) => t !== tag) });
  };

  return (
    <div className="xp-publish">
      <div className="xp-publish-title"><h5>Let's motivate</h5></div>
      <div className="row">
        <div className="col-md-12">
          <div className="xp-publish-editor">
            <div className="xp-editor-story-title">
              <input
                type="text"
                placeholder="Title, eg: How I...?"
                autoComplete="off"
                value={story.title}
                onChange={(e) => setStory({ ...story, title: e.target.value })}
              />
            </div>
            <div className="xp-publish-editor-hint_text"><p>Your <span>story</span> content here</p></div>
            <div className="xp-publish-editor-layout">
              <textarea
                style={{ width: '100%', minHeight: '300px', padding: '16px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit', fontSize: '14px' }}
                placeholder="Write your experience here..."
                value={story.content}
                onChange={(e) => setStory({ ...story, content: e.target.value })}
              />
            </div>
          </div>
          {story.tags.length > 0 && (
            <div className="xp-publish-all-tags">
              {story.tags.map((el, index) => (
                <p className="xp-publish-all_tags" key={index}>
                  {el} <i className="bx bx-x" onClick={() => removeTag(el)} />
                </p>
              ))}
            </div>
          )}
          <div className="xp-editor-tags-image">
            <div className="xp-editor-tags">
              <h6>Add Tags <span>Tap enter, space or , to add tag</span></h6>
              <input
                type="text"
                autoComplete="off"
                placeholder="#sports, #technology"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={onSetTags}
              />
            </div>
          </div>
        </div>
        {authState && (
          <div className="col-md-12 text-center d-block xp-publish-button my-2">
            {storyId ? (
              <button className="xp-btn-primary" onClick={updateContent} disabled={loader}>
                {loader ? 'Updating...' : 'Update'}
              </button>
            ) : (
              <button className="xp-btn-primary" onClick={publishContent} disabled={loader}>
                {loader ? 'Publishing...' : 'Publish'}
              </button>
            )}
          </div>
        )}
      </div>

      {fieldsNotFilled && <Popup type="alert-warning" text="Please fill all the fields to publish" />}
      {storyError && <Popup type="alert-danger" text="Something went wrong on editing" />}
      {errorOnPublishing && <Popup type="alert-danger" text="Something went wrong on updating story" />}

      {!authState && (
        <>
          <BackDrop />
          <div className="xp-publish-login text-center">
            <h2>You are one step away!</h2>
            <h4>Login to publish a story</h4>
            <Link to="/auth"><button className="xp-btn-primary">Login</button></Link>
            <p className="xp-cennter">or</p>
            <Link to="/"><button className="xp-btn-secondary">Read stories</button></Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Publish;
