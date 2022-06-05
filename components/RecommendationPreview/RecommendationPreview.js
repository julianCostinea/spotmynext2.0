import {
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Image from "next/image";
import SideDrawerContext from "../../store/SideDrawerContext";
import Recommendations from "../Recommendations/Recommendations";
import RecommendationInPreview from "../RecommendationInPreview/RecommendationInPreview";
import Loader from "../UI/Loader/Loader";
import NewRecommendation from "../NewRecommendation/NewRecommendation";
import * as HelperFunctions from "../../lib/helpers";

import classes from "./RecommendationPreview.module.css";

const RecommendationPreview = (props) => {
  let mainTags;
  let secondaryTags;
  let fetchedNewRecommendations;
  let parentId = props.id;
  let previewRecommendations = [];
  let sortedPreviewRecommendations;
  const [votedItems, setVotedItems] = useState([]);
  const [errorHeader, setErrorHeader] = useState(null);
  const searchTermInputRef = useRef();
  const votedItemsRef = useRef();
  const parentIdRef = useRef();
  const amazonLink = useRef();
  parentIdRef.current = parentId;

  const [fetchedData, setfetchedData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [newRecommendations, setNewRecommendations] = useState();

  const sideDrawerCtx = useContext(SideDrawerContext);

  useEffect(() => {
    switch (window.location.pathname) {
      case "/videogames":
        amazonLink.current =
          "https://www.amazon.com/gp/search?ie=UTF8&tag=juliancosti0d-20&linkCode=ur2&linkId=612279245be3409e04be63f8eb0df4ac&camp=1789&creative=9325&index=videogames&keywords=";
        break;
      case "/movies":
        amazonLink.current =
          "https://www.amazon.com/gp/search?ie=UTF8&tag=juliancosti0d-20&linkCode=ur2&linkId=0d82db2ddf1b0e2e1dfe567970a7ecbc&camp=1789&creative=9325&index=dvd&keywords=";
        break;
      case "/books":
        amazonLink.current =
          "https://www.amazon.com/gp/search?ie=UTF8&tag=juliancosti0d-20&linkCode=ur2&linkId=7a2d997b0cf519015f8df73eb6f64c26&camp=1789&creative=9325&index=books&keywords=";
        break;
      default:
        amazonLink.current =
          "https://www.amazon.com/gp/search?ie=UTF8&tag=juliancosti0d-20&linkCode=ur2&linkId=f0066940a1b925121c5389475047e5a4&camp=1789&creative=9325&index=aps&keywords=";
        break;
    }

    window.addEventListener("click", hideRecommendationPreviewOnBackdropClick);
    return () =>
      window.removeEventListener(
        "click",
        hideRecommendationPreviewOnBackdropClick
      );
  }, [hideRecommendationPreviewOnBackdropClick]);

  function voteButtonHandler(type, newItem) {
    if (!type) {
      const newItems = votedItems.filter((item) => item.id !== newItem.id);
      setVotedItems(newItems);
      votedItemsRef.current = newItems;
      return;
    }
    setVotedItems((oldItems) => [...oldItems, newItem]);
    votedItemsRef.current = [...votedItems, newItem];
  }

  const hideRecommendationPreviewOnBackdropClick = useCallback(
    (event) => {
      if (event.target.id === "backdrop") {
        props.setOpenFalse();
        sideDrawerCtx.hideBackdropHandler();
        if (votedItemsRef.current) {
          const data = {
            parentId: parentIdRef.current,
            votedItems: votedItemsRef.current,
          };
          HelperFunctions.fetchVoteRecommendations(props.collection, data);
        }
      }
    },
    [props, sideDrawerCtx]
  );

  function fetchRecommendationsInPreview(previewFetchId) {
    setIsLoading(true);
    setNewRecommendations(null);
    searchTermInputRef.current.value = "";
    document.getElementById("recommendationPreview").scrollTo(0, 0);
    if (votedItems.length) {
      const data = { parentId, votedItems };
      HelperFunctions.fetchVoteRecommendations(props.collection, data);
    }
    fetch(
      `/api/${props.collection}/${previewFetchId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result.length === 0) {
          setIsLoading(false);
          setErrorHeader(`Something went wrong`);
          return;
        }
        setfetchedData(data.result);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorHeader(`Something went wrong`);
        setIsLoading(false);
      });
  }

  function fetchNewRecommendationInPreview() {
    setIsFormLoading(false);
    if (searchTermInputRef.current.value.length === 0) {
      setNewRecommendations(null);
    }
    if (searchTermInputRef.current.value.length > 2) {
      setIsFormLoading(true);
      const fetchId = searchTermInputRef.current.value.trim();
      fetch(`/api/search/?collection=${props.collection}&searchId=${fetchId}`)
        .then((response) => response.json())
        .then((data) => {
          setNewRecommendations(data.result);
          setIsFormLoading(false);
        })
        .catch(() => {
          setErrorHeader(`Something went wrong`);
          setIsLoading(false);
        });
    }
  }

  function convertRecommendationsInPreview(recommendationsInPreview) {
    previewRecommendations = recommendationsInPreview.map(
      (singleRecommendation) => Object.values(singleRecommendation)
    );
    previewRecommendations.sort(function (a, b) {
      return b[1] - a[1];
    });

    return previewRecommendations.map((item, index) => {
      return (
        <RecommendationInPreview
          key={item[0]}
          id={item[0]}
          parentId={parentId}
          standing={`${
            index === 0
              ? "firstPlace"
              : index === 1
              ? "secondPlace"
              : index === 2
              ? "thirdPlace"
              : null
          }`}
          title={item[2]}
          photo={item[3]}
          fetchNextPreview={fetchRecommendationsInPreview}
          voteButtonHandler={voteButtonHandler}
        />
      );
    });
  }
  if (fetchedData) {
    parentId = fetchedData._id;
    parentIdRef.current = parentId;
  }
  if (newRecommendations) {
    fetchedNewRecommendations = newRecommendations.map((item, index) => {
      if (item._id == parentId) {
        return;
      }
      return (
        <NewRecommendation
          key={index}
          id={item._id}
          title={item.title}
          photo={item.photo}
          voteButtonHandler={voteButtonHandler}
        />
      );
    });
  }

  const closeRecommendationPreview = () => {
    props.setOpenFalse();
    sideDrawerCtx.hideBackdropHandler();
    if (votedItems.length) {
      const data = { parentId, votedItems };
      HelperFunctions.fetchVoteRecommendations(props.collection, data);
    }
  };
  const recommendationPreviewClasses = [
    classes.RecommendationPreview,
    props.show === "entering"
      ? classes.openPreview
      : props.show === "exiting"
      ? classes.closePreview
      : null,
  ];

  const descriptionClasses = [
    classes.currentItemDescription,
    props.show ? classes.descriptionAnimation : null,
  ];
  const imageClasses = [
    classes.imageContainer,
    props.show ? classes.imageAnimation : null,
  ];

  mainTags = useMemo(() => {
    return HelperFunctions.convertTags(props.mainTags, false, fetchedData);
  }, [props.mainTags, fetchedData]);
  secondaryTags = useMemo(() => {
    return HelperFunctions.convertTags(props.secondaryTags, true, fetchedData);
  }, [props.secondaryTags, fetchedData]);

  if (fetchedData) {
    sortedPreviewRecommendations = convertRecommendationsInPreview(
      fetchedData.recommendations
    );
  } else {
    sortedPreviewRecommendations = convertRecommendationsInPreview(
      props.recommendations
    );
  }

  return (
    <div
      id="recommendationPreview"
      className={recommendationPreviewClasses.join(" ")}
    >
      {isLoading ? <Loader /> : null}
      <h2 className={classes.errorHeader}>{errorHeader}</h2>
      <div className={classes.currentItem}>
        <div className={classes.currentItemPhoto}>
          <h2 className={props.show ? classes.titleClasses : null}>
            {fetchedData ? fetchedData.title : props.title}
          </h2>
          <div className={imageClasses.join(" ")}>
            <Image
              alt={props.title}
              layout="fill"
              src={
                fetchedData
                  ? `/images/itemsPhotos/${fetchedData.photo}`
                  : props.photo
              }
            />
          </div>
        </div>
        <div className={descriptionClasses.join(" ")}>
          <p>{fetchedData ? fetchedData.description : props.description}</p>
          <div style={{ marginBottom: "5px" }}>{mainTags}</div>
          {secondaryTags} <br />
          <br />
          <a
            href={
              fetchedData
                ? amazonLink.current + fetchedData.title
                : amazonLink.current + props.title
            }
            target="_blank"
            rel="noreferrer"
            className={classes.amazonButton}
          >
            Get it on Amazon!
          </a>
        </div>
      </div>
      <div className={classes.recommendedItems}>
        {sortedPreviewRecommendations.length ? (
          <h1 className={classes.recommendedItemsHeader}>
            People have recommended:
          </h1>
        ) : (
          <h1 className={classes.noRecommendationsHeader}>
            No recommendations yet. Be the first to suggest one!
          </h1>
        )}
        <Recommendations>{sortedPreviewRecommendations}</Recommendations>
        <form
          action=""
          className={classes.wrap}
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="searchTerm" className={classes.searchTermLabel}>
            Be the first to recommend your title:
          </label>
          <div className={classes.search}>
            <input
              name="searchTerm"
              id="searchTerm"
              type="text"
              ref={searchTermInputRef}
              className={classes.searchTerm}
              placeholder="Mario..."
              onChange={fetchNewRecommendationInPreview}
              required
            />
          </div>
          {fetchedNewRecommendations}
          {isFormLoading ? <Loader formLoader /> : null}
        </form>
      </div>
      <div
        onClick={closeRecommendationPreview}
        className={classes.ClosePreview}
      >
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
export default RecommendationPreview;
