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
      </div>
      <div className="xp-help-container">
        <div className="xp-help-what">
          <h4>What is shareXP</h4>
          <p>
            shareXP is used to share your experience with others on how you
            succeed. It can be any experience that might help other people who
            are struggling towards success!
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
                  Then finally tap <span>Share</span> button to share your story{" "}
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
                  to clear the search field tap <i className="bx bx-x"></i> icon{" "}
                </li>
                <li>
                  if a tag is already registered that tag will be displayed else
                  there is no story published under that tag
                </li>
                <li>
                  tap the tag card and the corresponding stories of that tag
                  will be displayed
                </li>
                <li>
                  you can follow/unfollow that tag by tapping the{" "}
                  <span>Follow/Unfollow</span> button{" "}
                </li>
              </ol>
            </div>
          </details>

          <details>
            <summary>How to create an account/login?</summary>
            <div className="xp-help-content">
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
          <a href="https://ragulcs.netlify.app" target="_black">
            <span>Ragul CS</span>
          </a>
        </h6>
        <a href="https://portfolio.bixhubtech.in" target="_black">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50.561"
            height="33"
            viewBox="0 0 50.561 33"
          >
            <g id="CSR-Logo" transform="translate(-136.439 -81)">
              <circle
                id="Ellipse_2996"
                data-name="Ellipse 2996"
                cx="3.064"
                cy="3.064"
                r="3.064"
                transform="translate(153.855 88.09) rotate(90)"
                fill="#2922e9"
              />
              <circle
                id="Ellipse_2997"
                data-name="Ellipse 2997"
                cx="3.064"
                cy="3.064"
                r="3.064"
                transform="translate(153.855 100.192) rotate(90)"
                fill="#2922e9"
              />
              <path
                id="Path_2622"
                data-name="Path 2622"
                d="M0,0S-7.561-.026-7.561,6.336,0,12.1,0,12.1"
                transform="translate(146.5 91.154)"
                fill="none"
                stroke="#2922e9"
                strokeWidth="5"
              />
              <text
                id="S"
                transform="translate(155 106)"
                fontSize="24"
                fontFamily="Poppins-Bold, Poppins"
                fontWeight="700"
              >
                <tspan x="0" y="0">
                  S
                </tspan>
              </text>
              <text
                id="R"
                transform="translate(171 106)"
                fontSize="24"
                fontFamily="Poppins-Bold, Poppins"
                fonteight="700"
              >
                <tspan x="0" y="0">
                  R
                </tspan>
              </text>
            </g>
          </svg>{" "}
        </a>
      </div>
    </div>
  );
};

export default Help;
