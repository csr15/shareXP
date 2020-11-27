import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";

import "./TagStories.css";
import * as actions from "../../store";
import Story from "../Story/Story";
import { config } from "../../utilities/constants/constants";
import Popup from "../Popup/Popup";
import { useHistory, useParams } from "react-router";
import StorySkeleton from "../StorySkeleton/StorySkeleton";
import Skeleton from "react-loading-skeleton";
import LazyLoad from "react-lazyload";

export default function TagStories(props) {
  const [didFollowed, setDidFollowed] = useState(false);
  const [didUnFollowed, setDidUnFollowed] = useState(false);
  const [isErrorOnUnFollow, setIsErrorOnUnFollow] = useState(false);
  const [isErrorOnFollow, setIsErrorOnFollow] = useState(false);

  const history = useHistory();
  const { tagName } = useParams();

  //mapStateToProps;
  const state = useSelector((state) => {
    return {
      tagStories: state.search.tagStories,
      tagName: state.search.tagName,
      userDetails: state.profile.userDetails,
      authState: state.auth.authState,
    };
  });

  //mapDispatchToProps
  const dispatch = useDispatch();
  const mapDispatchToProps = {
    fetchUserDetails: () => dispatch(actions.profileHandler()),
    fetchTagStoriesHandler: (tagName) =>
      dispatch(actions.fetchTagStories(tagName)),
  };

  useEffect(() => {
    mapDispatchToProps.fetchTagStoriesHandler(tagName);
    sessionStorage.setItem("currentTag", tagName);

    if (state.userDetails === "") {
      mapDispatchToProps.fetchUserDetails();
    }
  }, [state.userDetails]);

  const followTagHandler = async () => {
    try {
      await Axios.post(
        `${config.server_url}/profile/followTag/${localStorage.getItem("uid")}`,
        {
          tagName: state.tagName,
        }
      );

      setDidFollowed(true);
      setDidUnFollowed(false);
    } catch (error) {
      setIsErrorOnFollow(true);

      (async () => {
        setTimeout(() => {
          setIsErrorOnFollow(false);
        }, 3000);
      })();
    }
  };

  const unFollowTagHandler = async () => {
    try {
      await Axios.post(
        `${config.server_url}/profile/unFollowTag/${localStorage.getItem(
          "uid"
        )}`,
        {
          tagName: state.tagName,
        },
        {
          withCredentials: true,
        }
      );
      setDidUnFollowed(true);
      setDidFollowed(false);
    } catch (error) {
      setIsErrorOnUnFollow(true);

      (async () => {
        setTimeout(() => {
          setIsErrorOnUnFollow(false);
        }, 3000);
      })();
    }
  };

  let followButton = "";
  let followButtonHandler;

  if (state.userDetails) {
    if (
      state.userDetails.following.includes(`${props.match.params.tagName}`) &&
      !didUnFollowed
    ) {
      followButton = <span>Unfollow</span>;
      followButtonHandler = unFollowTagHandler;
    } else if (didFollowed && !didUnFollowed) {
      followButton = <span>Unfollow</span>;
      followButtonHandler = unFollowTagHandler;
    } else if (didUnFollowed) {
      followButton = <span>Follow</span>;
      followButtonHandler = followTagHandler;
    } else {
      followButton = <span>Follow</span>;
      followButtonHandler = followTagHandler;
    }
  } else {
    followButton = (
      <span className="xp-tag_loader">
        <i className="bx bx-loader-alt bx-spin"></i>Loading...!
      </span>
    );
  }

  const Loading = () => (
    <div className="loading">
      <h5>Loading..!</h5>
    </div>
  );

  return (
    <div className="xp-tag__stories">
      {state.tagStories ? (
        <React.Fragment>
          <div className="xp-tag__stories-details">
            <h1>#{state.tagName}</h1>
            {state.authState ? (
              <button
                className="btn xp-btn-follow"
                onClick={followButtonHandler}
              >
                {followButton}
              </button>
            ) : (
              <button className="btn xp-btn-follow" disabled={!state.authState}>
                Follow
              </button>
            )}
          </div>
          {state.tagStories.map((el, index) => {
            return (
              <LazyLoad key={el._id} once={true} placeholder={<Loading />}>
                <Story
                  key={index}
                  data={el}
                  onClick={() =>
                    history.push(`/viewstory/${el._id}/${el.uid}`)
                  }
                />
              </LazyLoad>
            );
          })}
        </React.Fragment>
      ) : (
        <>
          <div className="d-flex justify-content-between my-auto  flex-wrap mb-5">
            <Skeleton width={100} height={20} />
            <Skeleton
              width={150}
              height={40}
              style={{ borderRadius: "50px" }}
            />
          </div>
          <StorySkeleton />
          <StorySkeleton />
        </>
      )}
      {isErrorOnFollow && (
        <Popup
          type="alert-danger"
          text={`👀Problem on following ${state.tagName} `}
        />
      )}
      {isErrorOnUnFollow && (
        <Popup
          type="alert-danger"
          text={`👀Problem Unfollowing ${state.tagName} `}
        />
      )}
    </div>
  );
}
