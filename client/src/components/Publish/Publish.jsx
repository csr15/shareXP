import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter, useParams } from "react-router";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import imageCompression from "browser-image-compression";
import { Link } from "react-router-dom";

import "./Publish.css";
import Popup from "../Popup/Popup";
import * as actions from "../../store";
import Modal from "../Modal/Modal";
import firebase from "../../firebase/base";
import BackDrop from "../BackDrop/BackDrop";
import Axios from "axios";
import { config } from "../../utilities/constants/constants";

const Publish = () => {
  const [story, setStory] = useState({
    title: "",
    content: "",
    tags: [],
  });
  const [tags, setTags] = useState("");
  const [didFieldsNotFilled, setDidFieldsNotFilled] = useState(false);
  const [localImgURL, setLocalImgURL] = useState("");
  const [onPublishing, setOnPublishing] = useState(false);
  const [imgUploadingTask, setImgUploadingTask] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [uploadingToDB, setUploadingToDB] = useState(false);
  const [storyError, setStoryError] = useState(false);
  const [editStoryId, setEditStoryId] = useState("");

  //mapStateToProps
  const didPublished = useSelector((state) => state.publish.story);
  const userDetails = useSelector((state) => state.profile.userDetails);
  const authState = useSelector((state) => state.auth.authState);
  const didStoryUpdated = useSelector((state) => state.publish.didStoryUpdated);
  const errorOnPublishing = useSelector(
    (state) => state.publish.errorOnPublishing
  );

  const history = useHistory();
  if (didPublished !== "" || didStoryUpdated) {
    history.push("/profile");
  }
  const { storyId } = useParams();
  React.useEffect(() => {
    if (storyId) {
      (async () => {
        try {
          const { data } = await Axios.get(
            `${config.server_url}/storyData/${storyId}`
          );

          setStory(data.story);
          setEditStoryId(data._id);
        } catch (error) {
          setStoryError(true);

          setTimeout(() => {
            setStoryError(false);
          }, 3000);
        }
      })();
    }
  }, []);

  //mapDispatchToProps
  const dispatch = useDispatch();
  const publishContent = () => {
    const { title, content, tags } = story;
    if (title !== "" && content !== "" && tags.length !== 0) {
      if (localImgURL) {
        setOnPublishing(true);
        const storage = firebase.storage();
        const uploadTask = storage
          .ref(`/stories/${localStorage.getItem("uid")}/${story.title}`)
          .put(localImgURL);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImgUploadingTask(progress);
          },
          () => {
            setImgError(true);
          },
          () => {
            storage
              .ref(`/stories/${localStorage.getItem("uid")}/${story.title}`)
              .getDownloadURL()
              .then((url) => {
                setUploadingToDB(true);

                dispatch(
                  actions.publishStoryHandler({
                    ...story,
                    img: url,
                    createdAt: new Date(),
                    userName: userDetails.userName,
                  })
                );
              })
              .catch((refErr) => {
                setImgError(true);
              });
          }
        );
      } else {
        dispatch(
          actions.publishStoryHandler({
            ...story,
            createdAt: new Date(),
            userName: userDetails.userName,
          })
        );
      }
    } else {
      setDidFieldsNotFilled(true);
      setTimeout(() => {
        setDidFieldsNotFilled(false);
      }, 3000);
    }
  };

  //Updating categories
  const onSetTags = (e) => {
    //check if user presses ','  'enter'  'space'
    if (
      e.target.value.indexOf(",") !== -1 ||
      e.charCode === 13 ||
      e.charCode === 32 ||
      e.charCode === 9
    ) {
      //Check if user entered #
      const indexOfHash = tags.indexOf("#");
      if (indexOfHash !== -1) {
        //Removing user entered #
        let updatedTag = tags.replace("#", "");
        updatedTag = updatedTag.trim();
        console.log(updatedTag);
        setStory({ ...story, tags: [...story.tags, `#${updatedTag}`] });
      } else {
        // setAllTags((curTag) => [...curTag, `#${tags}`]);
        setStory({ ...story, tags: [...story.tags, `#${tags}`] });
      }
      setTags("");
    } else {
      setTags(e.target.value);
    }
  };

  //Remove categories
  const removeTag = (tag) => {
    const filteredTags = story.tags.filter((el) => {
      return el !== tag;
    });
    setStory({ ...story, tags: filteredTags });
  };

  //Image handler
  const imageHandler = (e) => {
    const localFile = e.target.files[0];

    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    imageCompression(localFile, options)
      .then((imgURL) => {
        console.log(imgURL);
        setLocalImgURL(imgURL);
      })
      .catch((err) => {
        setImgError(true);

        setTimeout(() => {
          setImgError(false);
        }, 3000);
      });
  };

  const updateContent = () => {
    if (localImgURL) {
      setOnPublishing(true);
      const storage = firebase.storage();
      const uploadTask = storage
        .ref(`/stories/${localStorage.getItem("uid")}/${story.title}`)
        .put(localImgURL);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImgUploadingTask(progress);
        },
        () => {
          setImgError(true);
        },
        () => {
          storage
            .ref(`/stories/${localStorage.getItem("uid")}/${story.title}`)
            .getDownloadURL()
            .then((url) => {
              setUploadingToDB(true);

              dispatch(
                actions.updateStoryHandler({
                  story: {
                    ...story,
                    img: url,
                  },
                  storyId: editStoryId,
                })
              );
            })
            .catch((refErr) => {
              setImgError(true);
            });
        }
      );
    } else {
      dispatch(
        actions.updateStoryHandler({
          story: { ...story, img: "" },
          storyId: editStoryId,
        })
      );
    }
  };

  return (
    <div className="xp-publish">
      <div className="xp-publish-title">
        <h5>Let's motivate</h5>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="xp-publish-editor">
            <div className="xp-editor-story-title">
              <input
                type="text"
                name="title"
                autoCapitalize="off"
                autoCorrect="off"
                placeholder="Title, eg: How I...? "
                autoComplete="off"
                value={story.title}
                onChange={(e) => setStory({ ...story, title: e.target.value })}
              />
            </div>
            <div className="xp-publish-editor-hint_text">
              <p>
                Your <span>story</span> content here
              </p>
            </div>
            <div className="xp-publish-editor-layout">
              <CKEditor
                editor={ClassicEditor}
                data={story.content}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "blockQuote",
                    "link",
                    "numberedList",
                    "|",
                    "undo",
                    "redo",
                    "codeBlock",
                  ],
                }}
                onBlur={(event, editor) => {
                  const data = editor.getData();
                  setStory({ ...story, content: data });
                }}
              />
            </div>
          </div>
          {story.tags.length > 0 && (
            <div className="xp-publish-all-tags">
              {story.tags.map((el, index) => {
                return (
                  <p className="xp-publish-all_tags" key={index}>
                    {el}
                    <i
                      className="bx bx-x"
                      onClick={removeTag.bind(this, el)}
                    ></i>
                  </p>
                );
              })}
            </div>
          )}
          <div className="xp-editor-tags-image">
            <div
              className="xp-editor-tags"
              style={storyId ? { marginRight: "0px" } : null}
            >
              <h6>
                Add Tags <span>Tap enter, space or , to add tag</span>{" "}
              </h6>
              <input
                type="text"
                autoComplete="off"
                autoCorrect="off"
                placeholder="#sports, #technology"
                value={tags}
                onChange={onSetTags}
                onKeyPress={onSetTags}
              />
            </div>
            {!storyId && (
              <div className="xp-editor-image">
                <h6>Add Image</h6>
                <div className="xp-editor-image-wrapper">
                  <label htmlFor="image">
                    {localImgURL ? (
                      <React.Fragment>
                        <i
                          className="bx bx-x"
                          onClick={() => setLocalImgURL("")}
                        ></i>
                        {localImgURL.name}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <i className="bx bx-image-add"></i>Choose an image
                      </React.Fragment>
                    )}
                    <input
                      type="file"
                      autoComplete="off"
                      autoCorrect="off"
                      id="image"
                      name="image"
                      onChange={imageHandler}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {storyId && (
            <div className="xp-publish-edit">
              <div className="xp-publish-edit_choose">
                <label for="image">
                  {localImgURL ? (
                    <React.Fragment>
                      <i
                        className="bx bx-x"
                        onClick={() => setLocalImgURL("")}
                      ></i>
                      {localImgURL.name}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <i className="bx bx-image-add"></i>Choose new image
                    </React.Fragment>
                  )}
                  <input
                    type="file"
                    autoComplete="off"
                    autoCorrect="off"
                    id="image"
                    name="image"
                    onChange={imageHandler}
                  />
                </label>
              </div>
              <div className="xp-publish-edit_delete">
                <p onClick={() => setLocalImgURL("")}>
                  <i className="bx bx-trash-alt"></i>Delete Image
                </p>
              </div>
            </div>
          )}
        </div>
        {authState && (
          <>
            {storyId ? (
              <div className="col-md-12 text-center d-block xp-publish-button my-2">
                <button className="xp-btn-primary" onClick={updateContent}>
                  Update
                </button>
              </div>
            ) : (
              <div className="col-md-12 text-center d-block xp-publish-button my-2">
                <button className="xp-btn-primary" onClick={publishContent}>
                  Pulish{" "}
                </button>
              </div>
            )}
            <div className="xp-publish-help text-center">
              <p>
                Problem on publishing?{" "}
                <span onClick={() => history.push("/help")}>Need Help?</span>{" "}
              </p>
            </div>
          </>
        )}
      </div>
      {onPublishing && (
        <Modal
          type="progress"
          progress={imgUploadingTask}
          uploadingToDB={uploadingToDB}
        />
      )}

      {didFieldsNotFilled && (
        <Popup
          type="alert-warning"
          text="Please fill all the fields to publish 👀 "
        />
      )}

      {imgError && (
        <Popup
          type="alert-danger"
          text="Something went wrong on uploading image👀 "
        />
      )}

      {storyError && (
        <Popup type="alert-danger" text="Something went wrong on editing " />
      )}

      {errorOnPublishing && (
        <Popup
          type="alert-danger"
          text="Something went wrong on updating story "
        />
      )}

      {!authState && (
        <React.Fragment>
          <BackDrop />
          <div className="xp-publish-login text-center">
            <h2>You are one step away!</h2>
            <h4>Login to publish a story</h4>
            <Link to="/auth">
              <button className="xp-btn-primary">Login</button>
            </Link>
            <p className="xp-cennter">or</p>
            <Link to="/">
              <button className="xp-btn-secondary">Read stories</button>
            </Link>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default withRouter(Publish);
