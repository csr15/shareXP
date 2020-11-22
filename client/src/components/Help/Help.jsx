import React from "react";

import { Link } from "react-router-dom";

import "./Help.css";

const Help = () => {
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
        <div className="xp-help-container">
          <div className="xp-help-what">
            <h4>What is shareXP</h4>
            <p>
              shareXP is used to share your experience on how you successed in
              your field with others and motivate them towards success!
            </p>
          </div>
          <div className="xp-help-FAQ">
            <h4>FAQ's</h4>

            <details>
              <summary>How to share a story ?</summary>
              <div className="xp-help-content">
                <ol>
                  <li>
                    Click <Link to="/publish">Share experience</Link> button on
                    navbar{" "}
                  </li>
                  <li>On title field type the title of your story</li>
                  <li>On content field type your content(experience)</li>
                  <li>
                    On <span>Add Tags</span> field type your tags
                    <ul>
                      <li>
                        Tap/press <span>ENTER</span> <span>SPACE</span>,{" "}
                        <span>,</span> to add tags{" "}
                      </li>
                    </ul>
                  </li>
                  <li>choose a display image or you can leave it</li>
                  <li>
                    Then finally tap <span>Share</span> button to share your
                    story{" "}
                  </li>
                </ol>
              </div>
            </details>

            <details>
              <summary>How to search and follow a tag?</summary>
              <div className="xp-help-content">
                <ol>
                  <li>
                    Click <Link to="/search">Search</Link> button on navbar{" "}
                  </li>
                  <li>
                    type a tag on search field to be searched and tap{" "}
                    <span>Search</span>{" "}
                  </li>
                  <li>
                    to clear search field tap <i className="bx bx-x"></i> icon{" "}
                  </li>
                  <li>
                    if a tag is already registered that tag will be displayed
                    else there is no story published under that tag
                  </li>
                  <li>
                    tap the tag card and the corresponding stories of that tag
                    will be displayed
                  </li>
                  <li>
                    you can follow/unfollow that tag by pressing the{" "}
                    <span>Follow/Unfollow</span> button{" "}
                  </li>
                </ol>
              </div>
            </details>

            <details>
              <summary>How to create an account/login?</summary>
              <div className="xp-help-content">
                <p
                  style={{
                    fontWeight: 400,
                    fontStyle: "normal",
                    marginLeft: "20px",
                  }}
                >
                  You can view all the stories <span>Without logging in</span>{" "}
                </p>
                <ol>
                  <li>
                    Go to <Link to="/auth">Authentication</Link> page{" "}
                  </li>
                  <li>choose to login or create an account</li>
                  <li>while creating an account the username must be unique</li>
                  <li>
                    once you filled all the fields tap{" "}
                    <span> create an account / Signin in to my account</span>{" "}
                    button
                  </li>
                  <li>
                    You can also signup/signin with <span>Goole account</span>
                  </li>
                </ol>
              </div>
            </details>

            <details>
              <summary>How to change / delete my avatar?</summary>
              <div className="xp-help-content">
                <p
                  style={{
                    fontWeight: 400,
                    fontStyle: "normal",
                    marginLeft: "20px",
                  }}
                >
                  Only if you Authenticated<span>Without logging in</span>{" "}
                </p>
                <ol>
                  <li>
                    Tap <Link to="/profile">Profile</Link> button on navbar
                  </li>
                  <li>
                    go to <span>Edit</span> tab on below avatar image
                  </li>
                  <li>
                    tap on <span>choose avatar</span> button and choose an image
                  </li>
                  <li>tap save button to save an avatar</li>
                  <li>
                    to <span>Delete tap delete avatar</span> to delete a
                    avatar(disabled if you have not uploaded an avatar )
                  </li>
                </ol>
              </div>
            </details>

            <details>
              <summary>How to delete my account?</summary>
              <div className="xp-help-content">
                <p
                  style={{
                    fontWeight: 400,
                    fontStyle: "normal",
                    marginLeft: "20px",
                  }}
                >
                  Only if you Authenticated<span>Without logging in</span>{" "}
                </p>
                <ol>
                  <li>
                    Tap <Link to="/profile">Profile</Link> button on navbar
                  </li>
                  <li>
                    go to <span>Danger zone</span> tab on below avatar image
                  </li>
                  <li>
                    tap <span>Delete my account</span>
                  </li>
                </ol>
              </div>
            </details>
          </div>
        </div>
        <div className="xp-footer text-center">
          <h6>
            shareXP, Made with <i className="bx bxs-heart bx-burst"></i> by{" "}
            <a href="https://portfolio.bixhubtech.in" target="_black">
              {" "}
              <span>Ragul CS</span>
            </a>{" "}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Help;
