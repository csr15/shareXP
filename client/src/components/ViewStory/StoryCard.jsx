import React, { useState, useEffect } from "react";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import Skeleton from "react-loading-skeleton";

import { config } from "../../utilities/constants/constants";
import viewImg from "../../Assets/icons/xp-view.svg";
import saluteImg from "../../Assets/icons/xp-like.svg";
import Comments from "../Comments/Comments";
import Popup from "../Popup/Popup";
import UserCard from "./UserCard/UserCard";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const StoryCard = React.memo(({ storyData }) => {
  const [openComment, setOpenComment] = useState(false);
  const [didStoryLiked, setDidStoryLiked] = useState(false);
  const [didStoryUnLiked, setDidStoryUnLiked] = useState(false);
  const [isErrorOnStoryLike, setIsErrorOnStoryLike] = useState(false);
  const [isStoryLiking, setIsStoryLiking] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [author, setAuthor] = useState("");
  const [isAuthorError, setIsAuthorError] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (storyData && author === "") {
        localStorage.setItem("storyID", storyData._id);
        document.title = `xp | ${storyData.story.title}`;
        try {
          const { data } = await Axios.get(
            `${config.server_url}/author/${storyData.uid}`
          );

          setAuthor(data[0]);
        } catch (error) {
          setIsAuthorError(true);

          setTimeout(() => {
            setIsAuthorError(false);
          }, 3000);
        }
      }
    }

    fetchData();
  }, [storyData]);

  const authState = useSelector((state) => state.auth.authState);
  const userDetails = useSelector((state) => state.profile.userDetails);
  const history = useHistory();
  //Like button config
  const likeStoryHandler = async (storyId) => {
    if (authState) {
      setIsStoryLiking(true);
      try {
        await Axios.post(`${config.server_url}/profile/likeStory`, {
          storyId: storyId,
          uid: localStorage.getItem("uid"),
          authorId: author._id,
          userName: userDetails.userName,
          storyTitle: storyData.story.title,
        });
        setDidStoryLiked(true);
        setDidStoryUnLiked(false);
        setIsStoryLiking(false);
      } catch (error) {
        setIsErrorOnStoryLike(true);
      }
    } else {
      localStorage.setItem(
        "likedStory",
        `/view-story/mostPopular/${storyData._id}`
      );

      history.push("/auth");
    }
  };

  //unlike button config
  const unLikeStoryHandler = async (storyId) => {
    setIsStoryLiking(true);
    try {
      await Axios.post(
        `${
          config.server_url
        }/profile/unLikeStory/${storyId}/${localStorage.getItem("uid")}/${
          author._id
        }`
      );

      setDidStoryUnLiked(true);
      setDidStoryLiked(false);
      setIsStoryLiking(false);
    } catch (error) {
      setIsErrorOnStoryLike(true);

      await setTimeout(() => {
        setIsErrorOnStoryLike(false);
      }, 3000);
    }
  };
  let likeButton = {};
  let likeText = "";
  let storyLikeHandler = "";

  if (storyData) {
    if (
      storyData.likes.includes(localStorage.getItem("uid")) &&
      !didStoryUnLiked
    ) {
      likeButton = { borderColor: "#8e27f6", opacity: 1, color: "#8e27f6" };
      likeText = "Unlike";
      storyLikeHandler = unLikeStoryHandler.bind(this, storyData._id);
    } else if (didStoryLiked && !didStoryUnLiked) {
      likeButton = { borderColor: "#8e27f6", opacity: 1, color: "#8e27f6" };
      likeText = "Unlike";
      storyLikeHandler = unLikeStoryHandler.bind(this, storyData._id);
    } else if (didStoryUnLiked) {
      likeButton = { borderColor: "#000", opacity: 0.6, color: "#000" };
      likeText = "Like";
      storyLikeHandler = likeStoryHandler.bind(this, storyData._id);
    } else {
      likeButton = { borderColor: "#000", opacity: 0.6, color: "#000" };
      likeText = "Like";
      storyLikeHandler = likeStoryHandler.bind(this, storyData._id);
    }
  }

  const shareStoryHandler = () => {
    navigator.clipboard.writeText(
      `https://sharexp.netlify.app/sharedStory/${storyData._id}`
    );
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  };
  return (
    <div className="xp-viewstory">
      {storyData ? (
        <div className="row">
          <div className="col-md-9 xp-viewstory-card">
            <div className="xp-viewstory-title">
              <h1 className="my-auto">{storyData.story.title}</h1>
            </div>
            <div className="xp-viewstory-details">
              <p className="xp-viewstory-read_time">
                <span>
                  {((text) => {
                    text = text.trim();
                    const totalWords =
                      text.length > 0 ? text.split(/\s+/).length : 0;
                    const totalMinutes = totalWords / 200;
                    return Math.floor(totalMinutes);
                  })(storyData.story.content)}
                </span>{" "}
                mins read
              </p>
              <p className="xp-viewstory-date_created">
                <span>{moment(storyData.createdAt).fromNow()}</span>
              </p>
            </div>
            {storyData.story.img && (
              <div className="xp-viewstory-img">
                <img
                  src={storyData.story.img}
                  alt={`${config.imgAlt} | ${storyData.story.title}`}
                />
              </div>
            )}
            <div className="xp-viewstory-content-start text-center">
              <h6>
                <span>get motivated</span>
              </h6>
            </div>
            <div className="xp-viewstory-content">
              {ReactHtmlParser(storyData.story.content)}
            </div>
            <div className="xp-viewstory-total-reactions">
              <div className="xp-viewstory-img">
                <span className="xp-helper">
                  <span className="badge badge-primary">{`${storyData.likes.length} Total Likes`}</span>
                </span>
                <img
                  src={saluteImg}
                  className="img-responsive my-auto"
                  alt={config.imgAlt}
                />
                <span className="my-auto">{storyData.likes.length}</span>
              </div>
              <div className="xp-viewstory-img">
                <span className="xp-helper">
                  <span className="badge badge-primary">{` ${storyData.views} Total Views`}</span>
                </span>
                <img
                  src={viewImg}
                  className="img-responsive my-auto"
                  alt={config.imgAlt}
                />
                <span className="my-auto">{storyData.views}</span>
              </div>
            </div>
            <div className="xp-viewstory-comments">
              <Comments
                storyData={storyData}
                doOpenComment={openComment}
                author={author}
                setDoOpenCommentProp={() => setOpenComment(false)}
              />
            </div>
          </div>
          <div className="col-md-3 xp-viewstory-user text-center">
            {author ? (
              <UserCard data={author} />
            ) : (
              <>
                <div className="m-1">
                  <Skeleton circle={true} height={50} width={50} />
                </div>
                <div className="m-1">
                  <Skeleton height={20} width={150} />
                </div>
                <div className="m-1">
                  <Skeleton height={20} width={100} />
                </div>
              </>
            )}
            <div className="xp-viewstory-categories">
              <div className="xp-categories-list">
                {storyData.story.tags.map((tag, index) => {
                  return (
                    <p
                      key={index}
                      onClick={() =>
                        history.push(`/tagStories/${tag.substr(1)}`)
                      }
                    >
                      {tag}
                    </p>
                  );
                })}
              </div>
              <div className="xp-viewstory-categories-title">
                <p>Tags</p>
              </div>
            </div>
            <div className="xp-viewstory-reaction">
              <div
                className="xp-viewstory-icon"
                style={likeButton}
                onClick={storyLikeHandler}
              >
                {isStoryLiking ? (
                  <i className="bx bx-loader-alt bx-spin"></i>
                ) : (
                  <React.Fragment>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={likeButton.color}
                      viewBox="0 0 30.849 30.849"
                    >
                      <path
                        id="Icon_metro-power"
                        data-name="Icon metro-power"
                        d="M14.139,1.928,2.571,17.352H14.139L6.427,32.777,33.419,13.5H17.995L29.563,1.928Z"
                        transform="translate(-2.571 -1.928)"
                      />
                    </svg>
                    <span>{likeText}</span>
                  </React.Fragment>
                )}
              </div>
              <div className="xp-viewstory-icon" onClick={shareStoryHandler}>
                <i className="bx bxs-share bx-md"></i>
                <span>Share</span>
              </div>
            </div>
            <div className="xp-viewstory-mobile-reaction">
              <div
                className="xp-viewstory-icon"
                style={likeButton}
                onClick={storyLikeHandler}
              >
                {isStoryLiking ? (
                  <i className="bx bx-loader-alt bx-spin"></i>
                ) : (
                  <React.Fragment>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={likeButton.color}
                      viewBox="0 0 30.849 30.849"
                    >
                      <path
                        id="Icon_metro-power"
                        data-name="Icon metro-power"
                        d="M14.139,1.928,2.571,17.352H14.139L6.427,32.777,33.419,13.5H17.995L29.563,1.928Z"
                        transform="translate(-2.571 -1.928)"
                      />
                    </svg>
                  </React.Fragment>
                )}
              </div>
              <div className="xp-viewstory-icon" onClick={shareStoryHandler}>
                <i className="bx bxs-share bx-md"></i>
              </div>
              <div className="xp-viewstory-mobile-comment">
                <i
                  className="bx bxs-comment bx-md"
                  onClick={() => setOpenComment(true)}
                ></i>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="xp-viewstory-loader">
          <div className="row">
            <div className="col-md-9  my-4">
              <h1>
                <Skeleton height={60} width={300} />
              </h1>
              <p className="d-block">
                <Skeleton
                  height={25}
                  width={500}
                  count={5}
                  style={{ marginTop: "10px" }}
                />
              </p>
            </div>
            <div className="col-md-3 text-center d-flex flex-column  my-4">
              <div className="m-1">
                <Skeleton circle={true} height={50} width={50} />
              </div>
              <div className="m-1">
                <Skeleton height={20} width={150} />
              </div>
              <div className="m-1">
                <Skeleton height={20} width={100} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/*
        Alerts
      */}
      {isErrorOnStoryLike && (
        <Popup type="alert-danger" text="Problem on updating like" />
      )}

      {isAuthorError && (
        <Popup type="alert-danger" text="Problem on getting author details" />
      )}

      {linkCopied && (
        <Popup type="alert-success" text="Link copied to your clipboard" />
      )}
    </div>
  );
});

export default StoryCard;
