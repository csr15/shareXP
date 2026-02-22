import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";

import Navigation from "../components/Navigation/Navigation";
import StoryScreen from "../screens/StoryScreen/StoryScreen";
import Publish from "../components/Publish/Publish";
import Profile from "../components/Profile/Profile";
import Search from "../components/Search/Search";
import Auth from "../components/Auth/Auth";
import TagStories from "../components/TagStories/TagStories";
import Help from "../components/Help/Help";
import ViewStory from "../components/ViewStory/ViewStory";

export default function Home() {
  const authState = useSelector((state) => state.auth.authState);
  return (
    <div className="xp-home">
      <div className="container-fluid">
        <Navigation />
      </div>
      <div className="container">
        <Switch>
          <Route path="/" exact component={StoryScreen} />
          <Route path="/search" exact component={Search} />
          <Route
            path="/viewStory/:storyID/:authorID"
            exact
            component={ViewStory}
          />
          <Route path="/tagStories/:tagName" exact component={TagStories} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/help" exact component={Help} />
          <Route path="/publish" exact component={Publish} />
          {authState ? (
            <>
              <Route path="/profile" exact component={Profile} />
              <Route
                path="/publish/editStory/:storyId"
                exact
                component={Publish}
              />
            </>
          ) : (
            <Redirect from="/profile" to="/" />
          )}
          <Route
            exact
            render={() => {
              return (
                <div
                  className="d-flex justify-content-center align-items-center m-2"
                  style={{ height: "80vh" }}
                >
                  <h1>404 Not found :(</h1>
                </div>
              );
            }}
          />
        </Switch>
      </div>
    </div>
  );
}
