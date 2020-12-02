import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";

import "./Search.css";
import CategoriesCard from "./CategoriesCard/CategoriesCard";
import * as actions from "../../store";
import { config } from "../../utilities/constants/constants";
import Popup from "../Popup/Popup";
import Skeleton from "react-loading-skeleton";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchedTag, setSearchedTag] = useState("");
  const [isErrorOnSearch, setIsErrorOnSearch] = useState(false);
  const [noTagsFound, setNoTagsFound] = useState(false);
  const [didFieldFilled, setDidFieldFilled] = useState(false);

  //mapDispatchToProps
  const dispatch = useDispatch();
  const mapDispatchToProps = {
    topTagsHandler: () => dispatch(actions.fetchTopTagsHandler()),
  };

  //mapStateToProps
  const state = useSelector((state) => {
    return {
      topTags: state.search.topTags,
      tagStories: state.search.tagStories,
    };
  });

  //useEffect
  useEffect(() => {
    if (state.topTags === "") {
      mapDispatchToProps.topTagsHandler();
    }
  }, []);

  if (searchValue === "" && searchedTag !== "") {
    setSearchedTag("");
  } else if (searchValue === "" && noTagsFound) {
    setNoTagsFound(false);
  }

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchValue !== "") {
      if (searchValue.indexOf("#") === -1) {
        Axios.get(`${config.server_url}/search?search=%23${searchValue}`)
          .then(({ data }) => {
            if (data.length === 0) {
              setNoTagsFound(true);
            } else {
              setSearchedTag(data[0]);
            }
          })
          .catch((err) => {
            setIsErrorOnSearch(true);
          });
      } else {
        Axios.get(
          `${config.server_url}/search?search=%23${searchValue.substr(1)}`,
          {
            withCredentials: true,
          }
        )
          .then(({ data }) => {
            if (data.length === 0) {
              setNoTagsFound(true);
            } else {
              setSearchedTag(data[0]);
            }
          })
          .catch((err) => {
            setIsErrorOnSearch(true);
          });
      }
    } else {
      setDidFieldFilled(true);
    }
  };

  if (didFieldFilled) {
    setTimeout(() => {
      setDidFieldFilled(false);
    }, 3000);
  }

  if (isErrorOnSearch) {
    setTimeout(() => {
      setIsErrorOnSearch(false);
    }, 3000);
  }

  let searchDOM = "";

  if (searchedTag && searchValue !== "") {
    searchDOM = (
      <CategoriesCard
        tagTitle={searchedTag._id}
        totalStories={searchedTag.count}
      />
    );
  } else if (noTagsFound) {
    searchDOM = (
      <div className="m-3 text-center xp-no__tags__found">
        <h5>No tags found</h5>
        <button
          className="xp-btn-primary mt-2 text-center xp-center"
          onClick={() => setSearchValue("")}
        >
          <i className="bx bx-left-arrow-alt"></i> <span>Go Back</span>
        </button>
      </div>
    );
  } else {
    searchDOM = (
      <React.Fragment>
        <h6>Top Tags</h6>
        <div className="my-2">
          <div className="row">
            {state.topTags ? (
              state.topTags.map((el) => {
                return (
                  <CategoriesCard
                    key={el._id}
                    tagTitle={el._id}
                    totalStories={el.totalStories}
                  />
                );
              })
            ) : (
              <div className="d-flex">
                <Skeleton
                  width={250}
                  height={150}
                  count={4}
                  style={{ margin: "10px" }}
                />
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className="xp-search">
      <div className="text-center">
        <div className="xp-search_bar">
          <h3>Search and inspire</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="xp-search_bar-wrapper">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Eg: #sports"
                autoComplete="off"
                autoCorrect="false"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <div
                className={`xp-search-actions ${
                  searchValue ? "d-flex" : "d-none"
                }`}
              >
                <button className="btn xp-btn-secondary">
                  <i className="bx bx-x" onClick={() => setSearchValue("")}></i>
                </button>
                <button
                  className="btn xp-btn-secondary"
                  onClick={searchHandler}
                >
                  <span className="search_text">Search</span>{" "}
                  <span className="search_icon">
                    <i className="bx bx-search"></i>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="xp-search-categories">{searchDOM}</div>
      {isErrorOnSearch && (
        <Popup
          type="alert-danger"
          text="something went wrong!, Please try again 👀 "
        />
      )}
      {didFieldFilled && (
        <Popup type="alert-danger" text="Please enter search Term 👀 " />
      )}
    </div>
  );
}
