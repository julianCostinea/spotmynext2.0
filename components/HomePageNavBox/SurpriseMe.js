import React, { useEffect, useState, useContext } from "react";
import { Transition } from "react-transition-group";
import Portal from "../../hoc/Portal/Portal";
import SideDrawerContext from "../../store/SideDrawerContext";
import RecommendationPreview from "../RecommendationPreview/RecommendationPreview";

import classes from "./HomePageNavBox.module.css";

const SurpriseMe = (props) => {
  const sideDrawerCtx = useContext(SideDrawerContext);
  const [fetchedData, setfetchedData] = useState();
  const [openRecommendationPreview, setOpenRecommendationPreview] = useState();
  const showRecommendationPreview = () => {
    setOpenRecommendationPreview(true);
    sideDrawerCtx.showBackdropHandler();
  };

  useEffect(() => {
    fetch(`https://spotmynext2-0.vercel.app/api/singleItem`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result.length === 0) {
          console.log("result < 0");
          return;
        }
        setfetchedData(data.result);
      })
      .catch(() => {
        console.log(`Something went wrong`);
      });
  }, []);

  return (
    <>
      <div
        onClick={showRecommendationPreview}
        role="button"
        tabIndex={0}
        className={classes.HomePageNavBox}
      >
        Surprise Me!
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
              id={fetchedData[0].id}
              title={fetchedData[0].title}
              description={fetchedData[0].description}
              mainTags={fetchedData[0].mainTags}
              secondaryTags={fetchedData[0].secondaryTags}
              photo={`/images/itemsPhotos/${fetchedData[0].photo}`}
              recommendations={fetchedData[0].recommendations}
            />
          )}
        </Transition>
      </Portal>
    </>
  );
};
export default SurpriseMe;
