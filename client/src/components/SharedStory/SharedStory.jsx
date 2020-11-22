import React from "react";
import Axios from "axios";
import { useParams } from "react-router";

import { config } from "../../utilities/constants/constants";
import Popup from "../Popup/Popup";
import StoryCard from "../ViewStory/StoryCard";

export default function SharedStory() {
  const [storyData, setStoryData] = React.useState("");
  const [isErrorOnStoryData, setIsErrorOnStoryData] = React.useState(false);

  const { storyId } = useParams();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await Axios.get(
          `${config.server_url}/sharedStory/${storyId}`
        );

        setStoryData(data);
      } catch (error) {
        setIsErrorOnStoryData(true);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="xp-shared_story">
      {storyData && <StoryCard storyData={storyData} />}
      {isErrorOnStoryData && (
        <Popup
          type="alert-danger"
          text="Something went wrong, Please try again later"
        />
      )}
    </div>
  );
}
