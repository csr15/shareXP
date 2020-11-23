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
import { Notifications } from "../../components/Notifications/Notifications";
const Wrapper = styled.section`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #f2f2f2;
`;
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
    if (filter === "Following") {
      if (state.followingStories === "") {
        mapDispatchToProps.fetchFollowingStories();
      }
    }
    if (filter === "Most Popular") {
      if (state.topStories === "") {
        mapDispatchToProps.topStories();
      }
    }
    if (filter === "Latest") {
      if (state.latestStories === "") {
        mapDispatchToProps.latestStories();
      }
    }
    if (state.notifications === "") {
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
      <h5>Loading</h5>
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
                  onClick={() =>
                    history.push(`/view-story/following/${el._id}`)
                  }
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
        <Wrapper>
          <h3>Login to view following tag's Story</h3>
          <button
            className="xp-btn-primary"
            onClick={() => history.push("/auth")}
          >
            Login
          </button>
        </Wrapper>
      );
    }
  } else if (filter === "Most Popular") {
    if (state.topStories) {
      storySection = state.topStories.map((el) => {
        return (
          <LazyLoad key={el._id} once={true} placeholder={<Loading />}>
            <Story
              data={el}
              onClick={() => history.push(`/view-story/mostPopular/${el._id}`)}
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
              onClick={() => history.push(`/view-story/latest/${el._id}`)}
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
            <h4>Stories</h4>
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
          <Categories />
          <div className="also_like_section">
            <h5>Some stories you may like</h5>
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
