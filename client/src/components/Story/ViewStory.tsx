import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { config } from '../../utils/constants';
import { storyApi } from '../../api/story.api';
import { profileApi } from '../../api/profile.api';
import { updateView } from '../../store/slices/profile.slice';
import Comments from './Comments';
import './ViewStory.scss';
import Popup from '../common/Popup';
import { Story as StoryType } from '../../types/story.types';
import { UserDetails } from '../../types/auth.types';

const ViewStory: React.FC = () => {
  const [author, setAuthor] = useState<UserDetails | null>(null);
  const [story, setStory] = useState<StoryType | null>(null);
  const [storyError, setStoryError] = useState(false);
  const [isStoryLiking, setIsStoryLiking] = useState(false);
  const [isErrorOnLike, setIsErrorOnLike] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [commentLoader, setCommentLoader] = useState(false);

  const { storyID, authorID } = useParams<{ storyID: string; authorID: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authState = useAppSelector((s) => s.auth.authState);
  const userDetails = useAppSelector((s) => s.profile.userDetails);

  useEffect(() => {
    if (!storyID || !authorID) return;

    (async () => {
      try {
        const [storyRes, authorRes] = await Promise.all([
          storyApi.getById(storyID),
          storyApi.getAuthor(authorID),
        ]);
        setStory(storyRes.data);
        setAuthor(authorRes.data[0]);
        document.title = storyRes.data.story.title;
      } catch {
        setStoryError(true);
        setTimeout(() => setStoryError(false), 3000);
      }
    })();

    return () => {
      dispatch(updateView(storyID));
    };
  }, [storyID, authorID, dispatch]);

  const likeHandler = async () => {
    if (!story || !author) return;
    if (!authState) {
      localStorage.setItem('likedStory', `/viewstory/${story._id}/${story.uid}`);
      navigate('/auth');
      return;
    }
    setIsStoryLiking(true);
    try {
      const { data } = await profileApi.likeStory({
        storyId: story._id,
        uid: localStorage.getItem('uid') || '',
        authorId: author._id || '',
        userName: userDetails?.userName || '',
        storyTitle: story.story.title,
      });
      setStory(data);
    } catch {
      setIsErrorOnLike(true);
    }
    setIsStoryLiking(false);
  };

  const unlikeHandler = async () => {
    if (!story || !author) return;
    setIsStoryLiking(true);
    try {
      const { data } = await profileApi.unlikeStory(
        story._id,
        localStorage.getItem('uid') || '',
        author._id || '',
      );
      setStory(data);
    } catch {
      setIsErrorOnLike(true);
      setTimeout(() => setIsErrorOnLike(false), 3000);
    }
    setIsStoryLiking(false);
  };

  const commentHandler = async (commentText: string) => {
    if (!story || !author || !userDetails) return;
    setCommentLoader(true);
    try {
      const { data } = await storyApi.addComment(
        story._id,
        {
          userName: userDetails.userName,
          uid: userDetails._id || '',
          comment: commentText,
          commentedAt: new Date().toISOString(),
          avatar: userDetails.avatar,
        },
        {
          storyId: story._id,
          uid: localStorage.getItem('uid') || '',
          authorId: author._id || '',
          userName: userDetails.userName,
          storyTitle: story.story.title,
        },
      );
      setStory(data);
    } catch {
      setStoryError(true);
      setTimeout(() => setStoryError(false), 3000);
    }
    setCommentLoader(false);
  };

  const shareHandler = () => {
    if (!story || !author) return;
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const uid = localStorage.getItem('uid');

  return (
    <div className="xp-view">
      {story ? (
        <div className="xp-view-first_layer">
          <div className="xp-view-header">
            <h1>{story.story.title}</h1>
            <div className="xp-view-header_details">
              <h6><span>{Math.floor(story.story.content.trim().split(/\s+/).length / 200)}</span> mins read</h6>
              <span className="spacer" />
              <h6><span>{moment(story.createdAt).fromNow()}</span></h6>
              <span className="spacer" />
              <h6><span>{story.views}</span> Views</h6>
            </div>
            <div className="xp-view-header_tags">
              {story.story.tags.map((tag, i) => (
                <p key={i} onClick={() => navigate(`/tagStories/${tag.substr(1)}`)}>{tag}</p>
              ))}
            </div>
          </div>
          {story.story.img && (
            <div className="xp-view-img text-center">
              <img src={story.story.img} alt={config.imgAlt} className="img-responsive" />
            </div>
          )}
          <div className="xp-view-content" dangerouslySetInnerHTML={{ __html: story.story.content }} />
        </div>
      ) : (
        <div className="xp-viewstory-loader">
          <Skeleton width={700} height={60} />
          <Skeleton width={100} height={35} count={3} className="mx-1 my-1" />
          <Skeleton width={300} height={300} className="my-2" />
          <Skeleton width={600} height={20} count={5} className="my-2 d-block" />
        </div>
      )}

      <div className="xp-view-footer">
        {author ? (
          <div className="xp-view-footer_user text-center">
            {author.avatar && <img src={author.avatar} alt={config.imgAlt} />}
            <h5>@{author.userName}<span>AUTHOR</span></h5>
          </div>
        ) : (
          <div className="text-center"><Skeleton width={80} height={80} circle /></div>
        )}

        {story && (
          <div className="xp-view-footer_reactions text-center">
            <div>
              {isStoryLiking ? (
                <i className="bx bx-loader-alt bx-spin" />
              ) : story.likes.includes(uid || '') ? (
                <i className="bx bxs-like" style={{ color: '#8e27f6' }} onClick={unlikeHandler} />
              ) : (
                <i className="bx bxs-like" onClick={likeHandler} />
              )}
              <h6>{story.likes.length}</h6>
            </div>
            <div onClick={shareHandler}>
              <i className="bx bxs-share" />
              <h6>share</h6>
            </div>
          </div>
        )}

        {story && (
          <div className="xp-view-comments">
            <Comments
              comments={story.comments}
              addCommentHandler={commentHandler}
              loader={commentLoader}
            />
          </div>
        )}

        {author && (
          <div className="xp-contact-author">
            <h6>Contact author</h6>
            <div className="xp-view-footer_user-contact">
              {author.facebook && <a href={author.facebook} target="_blank" rel="noopener noreferrer"><i className="bx bxl-facebook bx-md" /></a>}
              {author.linkedIn && <a href={author.linkedIn} target="_blank" rel="noopener noreferrer"><i className="bx bxl-linkedin bx-md" /></a>}
              {author.link && <a href={author.link} target="_blank" rel="noopener noreferrer"><i className="bx bx-link-external bx-md" /></a>}
            </div>
          </div>
        )}
      </div>

      {isErrorOnLike && <Popup type="alert-danger" text="Something went wrong on updating like!" />}
      {storyError && <Popup type="alert-danger" text="Something went wrong on getting story" />}
      {linkCopied && <Popup type="alert-success" text="Link copied to your clipboard" />}
    </div>
  );
};

export default ViewStory;
