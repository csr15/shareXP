import React, { useEffect, useState } from "react";
import Axios from "axios";

import "./CategoriesCard.css";
import { useHistory, withRouter } from "react-router";

function CategoriesCard(props) {
  const [randomImg, setRandomImg] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { results },
        } = await Axios.get(
          `https://api.unsplash.com/search/photos?page=1&query=${props.tagTitle.substr(
            1
          )}&client_id=oK47xmnNqY_owM3f9ykIWivKOe3RxSDB9qQlWf1r55M`,
          {
            withCredentials: false,
          }
        );

        if (results.length === 0) {
          const { data } = await Axios.get(
            `https://api.unsplash.com/photos/?client_id=oK47xmnNqY_owM3f9ykIWivKOe3RxSDB9qQlWf1r55M`,
            {
              withCredentials: false,
            }
          );

          setRandomImg(data[Math.floor(Math.random() * 10)].urls.regular);
        } else {
          setRandomImg(results[0].urls.regular);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const history = useHistory();
  return (
    <div
      className="col-md-3 col-12"
      onClick={() => history.push(`/tagStories/${props.tagTitle.substr(1)}`)}
    >
      <div
        className="xp-search-categories-card"
        style={
          randomImg
            ? {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(${randomImg})`,
              }
            : null
        }
      >
        <h5>{props.tagTitle}</h5>
      </div>
    </div>
  );
}

export default withRouter(CategoriesCard);
