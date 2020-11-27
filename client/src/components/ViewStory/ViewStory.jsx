import Axios from "axios";
import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { useHistory, useParams } from "react-router";
import LazyLoad from "react-lazyload";
import { useDispatch, useSelector } from "react-redux";

import avatar from "../../Assets/icons/xp-avatar.svg";
import "./ViewStory.css";
import { config } from "../../utilities/constants/constants";
import Comments from "../../components/Comments/Comments";
import Popup from "../../components/Popup/Popup";
import * as actions from "../../store";

const ViewStory = () => {
  const [author, setAuthor] = useState("");
  const [story, setStory] = useState("");
  const [storyError, setStoryError] = useState(false);
  const [isStoryLiking, setIsStoryLiking] = useState(false);
  const [isErrorOnStoryLike, setIsErrorOnStoryLike] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const { storyID, authorID } = useParams();
  const history = useHistory();

  //mapDispatchToProps
  const dispatch = useDispatch();

  //mapStateToProps
  const state = useSelector((state) => {
    return {
      authState: state.auth.authState,
      userDetails: state.profile.userDetails,
    };
  });

  //Fething story from server
  React.useEffect(() => {
    document.body.style.backgroundColor = "#F5F5F5";

    (async () => {
      try {
        const storyData = await Promise.all([
          Axios.get(`${config.server_url}/storyData/${storyID}`),
          Axios.get(`${config.server_url}/author/${authorID}`),
        ]);
        setStory(storyData[0].data);
        setAuthor(storyData[1].data[0]);
      } catch (error) {
        setStoryError(true);

        setTimeout(() => {
          setStoryError(false);
        }, 3000);
      }
    })();

    //clenup function
    return function cleanUp() {
      document.body.style.backgroundColor = "#FFFFFF";
      dispatch(actions.updateViewHandler(storyID));
    };
  }, []);

  //Like a story
  const likeStoryHandler = async () => {
    if (state.authState) {
      setIsStoryLiking(true);
      try {
        const { data } = await Axios.post(
          `${config.server_url}/profile/likeStory`,
          {
            storyId: story._id,
            uid: localStorage.getItem("uid"),
            authorId: author._id,
            userName: state.userDetails.userName,
            storyTitle: story.title,
          }
        );

        setStory(data);
        setIsStoryLiking(false);
      } catch (error) {
        setIsErrorOnStoryLike(true);
      }
    } else {
      localStorage.setItem(
        "likedStory",
        `/view-story/mostPopular/${story._id}`
      );

      history.push("/auth");
    }
  };

  //Unlike a story
  const unLikeStoryHandler = async () => {
    setIsStoryLiking(true);
    try {
      const { data } = await Axios.post(
        `${config.server_url}/profile/unLikeStory/${
          story._id
        }/${localStorage.getItem("uid")}/${author._id}`
      );

      setStory(data);
      setIsStoryLiking(false);
    } catch (error) {
      setIsErrorOnStoryLike(true);

      setTimeout(() => {
        setIsErrorOnStoryLike(false);
      }, 3000);
    }
  };

  //Story Component
  const StoryStruct = ({ title, dateCreated, views, tags, img, content }) => (
    <div className="xp-view-first_layer">
      <div className="xp-view-header">
        <h1>{title}</h1>
        <div className="xp-view-header_details">
          <h6>
            <span>
              {((text) => {
                text = text.trim();
                const totalWords =
                  text.length > 0 ? text.split(/\s+/).length : 0;
                const totalMinutes = totalWords / 200;
                return Math.floor(totalMinutes);
              })(content)}{" "}
            </span>
            mins read
          </h6>
          <span className="spacer"></span>
          <h6>
            <span>{moment(dateCreated).fromNow()}</span>
          </h6>
          <span className="spacer"></span>
          <h6>
            <span>{views}</span> Views
          </h6>
        </div>
        <div className="xp-view-header_tags">
          {tags.map((tag, index) => {
            return <p key={index}>{tag}</p>;
          })}
        </div>
      </div>
      <div className="xp-view-img text-center">
        {img && (
          <LazyLoad once={true} placeholder={"Loading"} height={100}>
            <img
              src={img}
              alt={`${config.imgAlt} | ${title} | ${tags.map(
                (story) => story
              )}`}
              className="img-responsive"
            />
          </LazyLoad>
        )}
      </div>
      <div className="xp-view-content">{ReactHtmlParser(content)}</div>
    </div>
  );

  //Loading skeleton for story component
  const StorySkeleton = () => (
    <div className="xp-viewstory-loader">
      <div className="d-block my-3">
        <Skeleton width={700} height={60} />
      </div>
      <div className="d-flex flex-start">
        <Skeleton width={100} height={35} count={3} className="mx-1 my-1" />
      </div>
      <div className="d-block my-3">
        <Skeleton width={600} height={20} count={5} className="my-2 d-block" />
      </div>
    </div>
  );

  const UserSkeleton = () => (
    <div className="xp-user-skull text-center">
      <div className="d-block">
        <Skeleton
          width={80}
          height={80}
          circle={true}
          className="xp-skull-img"
        />
      </div>
      <div className="d-block">
        <Skeleton width={200} height={20} className="xp-sull-text" />
      </div>
    </div>
  );

  const CommentSkull = () => (
    <div className="xp-skull-comment">
      <Skeleton width={60} height={60} circle={true} />
      <div className="xp-skull-comment-body">
        <Skeleton width={200} height={15} className="my-1" />
        <Skeleton width={150} height={15} className="my-1" />
      </div>
    </div>
  );

  //Add comment
  const commentHandler = async (commentText) => {
    try {
      const { data } = await Axios.post(
        `${config.server_url}/publish/comment/${story._id}`,
        {
          comment: {
            userName: state.userDetails.userName,
            uid: state.userDetails._id,
            comment: commentText,
            commentedAt: new Date(),
            avatar: state.userDetails.avatar,
          },
          notification: {
            storyId: story._id,
            uid: localStorage.getItem("uid"),
            authorId: author._id,
            userName: author.userName,
            storyTitle: story.title,
          },
        },
        { withCredentials: true }
      );

      setStory(data);
    } catch (error) {
      setStoryError(true);

      setTimeout(() => {
        setStoryError(false);
      }, 3000);
    }
  };

  //share story
  const shareStoryHandler = () => {
    navigator.clipboard.writeText(
      `https://sharexp.netlify.app/viewstory/${story._id}/${author._id}`
    );
    setLinkCopied(true);

    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  };
  //Return component
  return (
    <div className="xp-view">
      {story ? (
        <StoryStruct
          title={story.story.title}
          dateCreated={story.createdAt}
          views={story.views}
          likes={story.likes}
          tags={story.story.tags}
          img={story.story.img}
          content={story.story.content}
        />
      ) : (
        <StorySkeleton />
      )}

      {/* User details and story reaction */}
      <div className="xp-view-footer">
        {author ? (
          <div className="xp-view-footer_user text-center">
            <img
              src={author.avatar ? author.avatar : avatar}
              alt={config.imgAlt}
            />
            <h5>
              @{author.userName}
              <span>AUTHOR</span>
            </h5>
          </div>
        ) : (
          <UserSkeleton />
        )}

        {/* Like */}
        {story && (
          <div className="xp-view-footer_reactions text-center">
            <div>
              {(() => {
                if (isStoryLiking) {
                  return <i className="bx bx-loader-alt bx-spin"></i>;
                } else {
                  if (story.likes.includes(localStorage.getItem("uid"))) {
                    return (
                      <i
                        className="bx bxs-like"
                        style={{ color: "#8e27f6" }}
                        onClick={unLikeStoryHandler}
                      ></i>
                    );
                  } else {
                    return (
                      <i className="bx bxs-like" onClick={likeStoryHandler}></i>
                    );
                  }
                }
              })()}
              <h6>{story.likes.length}</h6>
            </div>
            <div>
              <i className="bx bxs-share" onClick={shareStoryHandler}></i>
              <h6>share</h6>
            </div>
          </div>
        )}

        {/* Comment component */}
        {story ? (
          <div className="xp-view-comments">
            <Comments
              comments={story.comments}
              addCommentHandler={commentHandler}
            />
          </div>
        ) : (
          <>
            <CommentSkull />
            <CommentSkull />
            <CommentSkull />
          </>
        )}

        {/* contact author */}
        <div className="xp-contact-author">
          <h6>Contact author</h6>
          <div className="xp-view-footer_user-contact">
            {author.facebook && (
              <a
                href={author.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bxl-facebook bx-md"></i>
              </a>
            )}
            {author.linkedIn && (
              <a
                href={author.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bxl-linkedin bx-md"></i>
              </a>
            )}
            {author.link && (
              <a href={author.link} target="_blank" rel="noopener noreferrer">
                <i className="bx bx-link-external bx-md"></i>
              </a>
            )}
            <a
              href={`mailto:${author.mail}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bx-envelope"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {isErrorOnStoryLike && (
        <Popup
          type="alert-danger"
          text="Something went wrong on updating like!"
        />
      )}

      {storyError && (
        <Popup
          type="alert-danger"
          text="Something went wrong on getting story"
        />
      )}

      {linkCopied && (
        <Popup type="alert-success" text="Link copied to your clipboard" />
      )}
    </div>
  );
};

export default ViewStory;
