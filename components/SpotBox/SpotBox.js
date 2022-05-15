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
  const [loadMoreItemsLoading, setLoadMoreItemsLoading] = useState(false);
  const [finishedSearch, setFinishedSearch] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const sideDrawerCtx = useContext(SideDrawerContext);
  const [fetchId, setFetchId] = useState("");
  const [lastItem, setLastItem] = useState();
  let fetchedRecommendations;
  let pageDelimiter = "";

  function showContactFormHandler() {
    sideDrawerCtx.showBackdropHandler();
    setShowContactForm(true);
  }

  function loadMoreItemsHandler() {
    setLoadMoreItemsLoading(true);
    setFinishedSearch(false);
    fetch(
      `/api/search/?collection=${window.location.pathname.slice(
        1
      )}&searchId=${fetchId}&pageDelimiter=${pageDelimiter}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoadMoreItemsLoading(false);
        const newItems = items.concat(data.result);
        setItems(newItems);
        setFinishedSearch(true);
        document
          .getElementById(pageDelimiter)
          .scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
  }

  function submitFormHandler(event) {
    event.preventDefault();
    setFinishedSearch(false);
    document.forms[0].querySelector("input").blur();
    setErrorHeader("");
    const fetchTerm = searchTermInputRef.current.value.trim();
    if (!fetchTerm || fetchTerm.length < 3) {
      setErrorHeader(`Field must contain at least three letters.`);
      return;
    }
    setIsLoading(true);

    fetch(
      `/api/search/?collection=${window.location.pathname.slice(
        1
      )}&searchId=${fetchTerm}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          setErrorHeader(
            `Something went wrong. We're looking into it. No result.`
          );
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
        setFetchId(fetchTerm);
        setFinishedSearch(true);
        setLastItem(data.lastItem[0]._id);
      })
      .catch((error) => {
        setErrorHeader(
          `Something went wrong. We're looking into it. Catch block`
        );
        setIsLoading(false);
      });
  }

  if (finishedSearch) {
    fetchedRecommendations = items.map((item, index) => {
      if (items.length - 1 === index) {
        pageDelimiter = item._id;
      }
      return (
        <Recommendation
          key={item._id}
          id={item._id}
          title={item.title}
          description={item.description}
          photo={item.photo}
          mainTags={item.mainTags}
          secondaryTags={item.secondaryTags}
          recommendations={item.recommendations}
          collection={item.collection}
        />
      );
    });
  }

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
      <form
        onSubmit={submitFormHandler}
        className={classes.wrap}
        id="formThing"
      >
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
      {finishedSearch ? (
        <>
          <Recommendations>{fetchedRecommendations}</Recommendations>
          {lastItem != pageDelimiter ? (
            <button
              className={classes.loadMoreButton}
              onClick={loadMoreItemsHandler}
            >
              {loadMoreItemsLoading ? <Loader smallLoader /> : "Load more"}
            </button>
          ) : null}
        </>
      ) : null}
      {finishedSearch ? (
        <div className={classes.recommendEmail}>
          <p
            className={classes.recommendHeader}
            onClick={showContactFormHandler}
          >
            Can&apos;t find what you&apos;re looking for? Let us know!{" "}
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
