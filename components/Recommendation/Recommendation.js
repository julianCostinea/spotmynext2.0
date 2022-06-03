import React, { useContext, useState } from "react";
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
  const {
    id,
    description,
    mainTags,
    secondaryTags,
    photo,
    title,
    recommendations,
    collection,
    amazonLink,
  } = props;

  return (
    <>
      <div className={classes.recommendation} id={props.id}>
        <h2 className={classes.recommendationTitle}>{title}</h2>
        <div
          className={`${classes.recommendationPhoto} ${classes.loads}`}
          onClick={showRecommendationPreview}
          role="button"
          tabIndex={0}
        >
          <Image
            alt={title}
            layout="fill"
            src={`/images/itemsPhotos/${photo}`}
          />
        </div>
      </div>
      <Portal selector="#recommendationPreviewOverlay">
        <Transition
          mountOnEnter
          appear
          unmountOnExit
          in={openRecommendationPreview}
          timeout={200}
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
              photo={`/images/itemsPhotos/${photo}`}
              recommendations={recommendations}
              collection={collection}
              amazonLink={amazonLink}
            />
          )}
        </Transition>
      </Portal>
    </>
  );
};
export default Recommendation;
