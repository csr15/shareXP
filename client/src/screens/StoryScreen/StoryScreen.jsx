import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import LazyLoad from "react-lazyload";

import "./StoryScreen.css";
import Categories from "../../components/Categories/Categories";
import Story from "../../components/Story/Story";
import * as actions from "../../store";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AlsoLike from "../../components/AlsoLike/AlsoLike";
import StorySkeleton from "../../components/StorySkeleton/StorySkeleton";
import Skeleton from "react-loading-skeleton";
export default function StoryScreen() {
  const [filter, setFilter] = useState("Most Popular");

  //mapStateToProps
  const state = useSelector((state) => {
    return {
      followingStories: state.user.followingStories,
      topStories: state.user.topStories,
      latestStories: state.user.latestStories,
      isErrorOnFollowingStories: state.user.isErrorOnFollowingStories,
      isErrorOnTopStories: state.user.isErrorOnTopStories,
      isErrorOnLatestStories: state.user.isErrorOnLatestStories,
      authState: state.auth.authState,
      notifications: state.profile.notifications,
      userDetails: state.profile.userDetails,
    };
  });

  //mapDispatchToProps
  const dispatch = useDispatch();
  const mapDispatchToProps = {
    fetchFollowingStories: () => dispatch(actions.followingTagStories()),
    topStories: () => dispatch(actions.topTagStories()),
    latestStories: () => dispatch(actions.latestStories()),
    fetchProfileDetails: () => dispatch(actions.profileHandler()),
    notificationsHandler: () => dispatch(actions.getNotifications()),
  };

  useEffect(() => {
    if (filter === "Following" && state.followingStories === "") {
      if (state.followingStories === "") {
        mapDispatchToProps.fetchFollowingStories();
      }
    }
    if (filter === "Most Popular" && state.topStories === "") {
      if (state.topStories === "") {
        mapDispatchToProps.topStories();
      }
    }
    if (filter === "Latest" && state.latestStories === "") {
      if (state.latestStories === "") {
        mapDispatchToProps.latestStories();
      }
    }
    if (state.notifications === "" && localStorage.getItem("uid")) {
      mapDispatchToProps.notificationsHandler();
    }
  }, [filter]);

  const history = useHistory();
  let storySection = "";

  const Loader = () => (
    <>
      <StorySkeleton />
      <StorySkeleton />
      <StorySkeleton />
    </>
  );

  const Loading = () => (
    <div className="loading">
      <h4>Loading</h4>
    </div>
  );

  if (filter === "Following") {
    if (state.authState) {
      if (state.followingStories) {
        if (state.followingStories.length !== 0) {
          storySection = state.followingStories.map((el, index) => {
            return (
              <LazyLoad key={el._id} once={true} placeholder={<Loading />}>
                <Story
                  key={el._id}
                  data={el}
                  onClick={() => history.push(`/viewstory/${el._id}/${el.uid}`)}
                />
              </LazyLoad>
            );
          });
        } else {
          storySection = (
            <div className="text-center xp-no_tags_followed">
              <h4>
                You are not following any tags <span>😕</span>{" "}
              </h4>
              <Link to="/search">
                {" "}
                <button className="xp-btn-primary my-2 ">Follow Tags</button>
              </Link>
            </div>
          );
        }
      } else {
        storySection = <Loader />;
      }
    } else {
      storySection = (
        <div className="xp-story-login">
          <h3>Login to view following tag's Story</h3>
          <button
            className="xp-btn-primary"
            onClick={() => history.push("/auth")}
          >
            Login
          </button>
        </div>
      );
    }
  } else if (filter === "Most Popular") {
    if (state.topStories) {
      storySection = state.topStories.map((el) => {
        return (
          <LazyLoad key={el._id} once={true} placeholder={<Loading />}>
            <Story
              data={el}
              onClick={() => history.push(`/viewstory/${el._id}/${el.uid}`)}
            />
          </LazyLoad>
        );
      });
    } else {
      storySection = <Loader />;
    }
  } else if (filter === "Latest") {
    if (state.latestStories) {
      storySection = state.latestStories.map((el, index) => {
        return (
          <LazyLoad key={el._id} once={true} placeholder={<Loading />}>
            <Story
              key={el._id}
              data={el}
              onClick={() => history.push(`/viewstory/${el._id}/${el.uid}`)}
            />
          </LazyLoad>
        );
      });
    } else {
      storySection = <Loader />;
    }
  }
  return (
    <div className="xp-story_screen">
      <div className="row">
        <div className="col-md-8">
          <div className="xp-story_screen-title">
            <h4>
              Stories{" "}
              {state.userDetails && (
                <span>
                  for{" "}
                  <span className="highlight">
                    @{state.userDetails.userName}
                  </span>
                </span>
              )}
            </h4>
            <div className="xp-split"></div>
            <div className="xp-btn-story_screen-filter">
              <div className="dropdown">
                <button
                  className="xp-btn-dropdown xp-btn-secondary"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                >
                  <span>{filter}</span>
                  <i className="bx bxs-down-arrow ml-2"></i>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <p
                    className="mx-4 my-2"
                    onClick={() => setFilter("Following")}
                  >
                    Following
                  </p>
                  <p
                    className="mx-4 my-2"
                    onClick={() => setFilter("Most Popular")}
                  >
                    Most Popular
                  </p>
                  <p className="mx-4 my-2" onClick={() => setFilter("Latest")}>
                    Latest
                  </p>
                </div>
              </div>
            </div>
          </div>
          {storySection}
        </div>
        <div className="col-md-4">
          <div className="popular-tags">
            <h4>Popular tags on XP</h4>
            <Categories />
          </div>
          <div className="also_like_section">
            <h4>Top stories on XP</h4>
            {state.topStories ? (
              state.topStories.slice(0, 5).map((story, index) => {
                return (
                  <AlsoLike key={index} story={story} indexValue={index} />
                );
              })
            ) : (
              <>
                <Skeleton width={230} height={90} className="d-block my-2" />
                <Skeleton width={230} height={90} className="d-block my-2" />
                <Skeleton width={230} height={90} className="d-block my-2" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
