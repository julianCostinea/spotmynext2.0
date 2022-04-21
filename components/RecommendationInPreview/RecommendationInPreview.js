import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as Icons from "../UI/Icons/Icons";

import classes from "./RecommendationInPreview.module.css";

const RecommendationInPreview = (props) => {
  const {
    id, photo, title, voteButtonHandler, standing, parentId, fetchNextPreview,
  } = props;

  const [imagePathName, setImagePathName] = useState("/images");
  const [voted, setVoted] = useState(false);

  function voteUpRecommendation(event) {
    event.stopPropagation();
    const itemData = { id, title, photo };
    if (voted) {
      voteButtonHandler(false, itemData);
      setVoted(false);
      return;
    }
    voteButtonHandler(true, itemData);
    setVoted(true);
  }

  const attachedClasses = [classes.recommendationPhoto, classes.loads];

  switch (standing) {
    case "firstPlace":
      attachedClasses.push(classes.firstPlace);
      break;
    case "secondPlace":
      attachedClasses.push(classes.secondPlace);
      break;
    case "thirdPlace":
      attachedClasses.push(classes.thirdPlace);
      break;

    default:
      break;
  }

  useEffect(() => {
    setVoted(false);
    switch (window.location.pathname) {
      case "/videogames":
        setImagePathName(`/images/videogames/${photo}`);
        break;
      case "/movies":
        setImagePathName(`/images/movies/${photo}`);
        break;
      case "/books":
        setImagePathName(`/images/books/${photo}`);
        break;
      default:
        setImagePathName(`/images/videogames/${photo}`);
        break;
    }
  }, [parentId, photo]);

  return (
    <div className={classes.recommendation}>
      <h2 className={classes.recommendationTitle}>{title}</h2>
      <div
        className={attachedClasses.join(" ")}
        onClick={() => fetchNextPreview(id)}
        role="link"
        tabIndex={0}
      >
        <Image alt={title} layout="fill" src={imagePathName} />
        <button
          type="button"
          title="Recommend this title"
          className={`${classes.voteUpButton} 
            ${voted ? classes.voteUpButtonActive : null}
            `}
          onClick={voteUpRecommendation}
        >
          {Icons.ThumbsupIcon}
        </button>
      </div>
    </div>
  );
};
export default RecommendationInPreview;
