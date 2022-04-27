import React, { useState, useContext } from "react";
import { useRef } from "react";
import Recommendations from "../Recommendations/Recommendations";
import Recommendation from "../Recommendation/Recommendation";
import Loader from "../UI/Loader/Loader";
import SideDrawerContext from "../../store/SideDrawerContext";

import classes from "./SpotBox.module.css";

import * as Icons from "../UI/Icons/Icons";
import ContactForm from "../ContactForm/ContactForm";

const SpotBox = (props) => {
  let item;

  switch (props.category) {
    case "videogames":
      item = "video game";
      break;
    case "movies":
      item = "movie";
      break;
    case "books":
      item = "book";
      break;
    default:
      break;
  }

  const searchTermInputRef = useRef();
  const [items, setItems] = useState([]);
  const [errorHeader, setErrorHeader] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [finishedSearch, setFinishedSearch] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const sideDrawerCtx = useContext(SideDrawerContext);

  function showContactFormHandler() {
    sideDrawerCtx.showBackdropHandler();
    setShowContactForm(true);
  }

  function submitFormHandler(event) {
    event.preventDefault();
    document.forms[0].querySelector("input").blur();
    const fetchId = searchTermInputRef.current.value.trim();
    setErrorHeader("");
    if (!fetchId || fetchId.length < 3) {
      setErrorHeader(`Field must contain at least three letters.`);
      return;
    }
    setIsLoading(true);

    fetch(
      `https://www.spotmynext.com/api/search/?collection=${window.location.pathname}&searchId=${fetchId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          setErrorHeader(`Something went wrong. We're looking into it`);
          setIsLoading(false);
          return;
        }
        if (data.result.length == 0) {
          setErrorHeader(`Could not find any ${item} to match your query.`);
          setIsLoading(false);
          setFinishedSearch(true);
          return;
        }
        setItems(data.result);
        setIsLoading(false);
        setFinishedSearch(true);
      })
      .catch((error) => {
        setErrorHeader(`Something went wrong. We're looking into it`);
        setIsLoading(false);
      });
  }

  const fetchedRecommendations = items.map((item, index) => (
    <Recommendation
      key={item._id}
      id={item._id}
      title={item.title}
      description={item.description}
      photo={item.photo}
      mainTags={item.mainTags}
      secondaryTags={item.secondaryTags}
      recommendations={item.recommendations}
    />
  ));
  return (
    <React.Fragment>
      <ContactForm
        category={props.category}
        showContactForm={showContactForm}
        hideContactForm={() => setShowContactForm(false)}
      />
      <h1>Find me a {item} just like:</h1>
      {errorHeader ? (
        <h2 className={classes.errorHeader}>{errorHeader}</h2>
      ) : null}
      <form onSubmit={submitFormHandler} className={classes.wrap}>
        <div className={classes.search}>
          <input
            type="text"
            ref={searchTermInputRef}
            className={classes.searchTerm}
            placeholder={props.placeholder}
            required
          />
          <button
            type="button"
            onClick={submitFormHandler}
            className={classes.searchButton}
          >
            {Icons.SearchIcon}
          </button>
        </div>
      </form>

      {isLoading ? <Loader /> : null}
      {fetchedRecommendations ? (
        <Recommendations>{fetchedRecommendations}</Recommendations>
      ) : null}
      {finishedSearch ? (
        <div className={classes.recommendEmail}>
          <p
            className={classes.recommendHeader}
            onClick={showContactFormHandler}
          >
            Can&apos;t find what you&apos;re looking for? Write us!{" "}
            <button className={classes.recommendButton}>
              {Icons.mailIcon}
            </button>
          </p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default SpotBox;
