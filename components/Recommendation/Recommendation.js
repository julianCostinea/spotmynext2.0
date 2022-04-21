import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { Transition } from "react-transition-group";
import Portal from "../../hoc/Portal/Portal";
import SideDrawerContext from "../../store/SideDrawerContext";
import RecommendationPreview from "../RecommendationPreview/RecommendationPreview";

import classes from "./Recommendation.module.css";

const Recommendation = (props) => {
  const sideDrawerCtx = useContext(SideDrawerContext);
  const [openRecommendationPreview, setOpenRecommendationPreview] = useState();
  const showRecommendationPreview = () => {
    setOpenRecommendationPreview(true);
    sideDrawerCtx.showBackdropHandler();
  };
  const [imagePathName, setImagePathName] = useState("/images");
  const [recommendationOpened, setRecommendationOpened] = useState(false);
  const {
    id,
    description,
    mainTags,
    secondaryTags,
    photo,
    title,
    recommendations,
  } = props;

  useEffect(() => {
    switch (window.location.pathname) {
      case "/videogames":
        setImagePathName(`${imagePathName}/videogames/${photo}`);
        break;
      case "/movies":
        setImagePathName(`${imagePathName}/movies/${photo}`);
        break;
      case "/books":
        setImagePathName(`${imagePathName}/books/${photo}`);
        break;
      default:
        setImagePathName(`${imagePathName}/videogames/${photo}`);
        break;
    }
  }, []);

  return (
    <>
      <div className={classes.recommendation}>
        <h2 className={classes.recommendationTitle}>{title}</h2>
        <div
          className={`${classes.recommendationPhoto} ${classes.loads}`}
          onClick={showRecommendationPreview}
          role="button"
          tabIndex={0}
        >
          <Image alt={title} quality={100} layout="fill" src={imagePathName} />
        </div>
      </div>
      <Portal selector="#recommendationPreviewOverlay">
        <Transition
          mountOnEnter
          appear
          unmountOnExit
          in={openRecommendationPreview}
          timeout={200}
          onEntering={() => setRecommendationOpened(true)}
        >
          {(state) => (
            <RecommendationPreview
              show={state}
              setOpenFalse={() => setOpenRecommendationPreview(false)}
              id={id}
              title={title}
              description={description}
              mainTags={mainTags}
              secondaryTags={secondaryTags}
              photo={imagePathName}
              recommendations={recommendations}
              recommendationOpened={recommendationOpened}
            />
          )}
        </Transition>
      </Portal>
    </>
  );
};
export default Recommendation;
