import React, {
  useRef,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { CSSTransition } from "react-transition-group";
import SideDrawerContext from "../../store/SideDrawerContext";
import Script from "next/script";

import classes from "./ContactForm.module.css";

const ContactForm = (props) => {
  const titleRef = useRef();
  const mainTagsRef = useRef();
  const secondaryTagsRef = useRef();

  const [errorHeader, setErrorHeader] = useState(null);
  const [mainTagsPlaceholder, setMainTagsPlaceholder] = useState("");
  const [secondaryTagsPlaceholder, setSecondaryTagsPlaceholder] = useState("");
  const [mainTagsLabel, setMainTagsLabel] = useState("");
  const sideDrawerCtx = useContext(SideDrawerContext);

  const userRecommendationFormHandler = (event) => {
    event.preventDefault();
    const title = titleRef.current.value.trim();
    const mainTags = mainTagsRef.current.value.trim();
    const secondaryTags = secondaryTagsRef.current.value.trim();
    const formData = { title, mainTags, secondaryTags };

    if (!title) {
      setErrorHeader("Title cannot be empty!");
      return;
    }
    grecaptcha.ready(() => {
      grecaptcha
        .execute("6LcVZSkcAAAAAJq7M6sq2rnUp5FfmPLNG6itAZr8", {
          action: "homepage",
        })
        .then((token) => {
          formData.recaptcha = token;
          fetch("https://spotmynext2-0.vercel.app/api/userRecommendationMail", {
            method: "POST",
            body: JSON.stringify(formData),
          })
            .then((response) => {
              props.hideContactForm();
              sideDrawerCtx.hideBackdropHandler();
            })
            .catch((error) => {
              setErrorHeader(`Something went wrong. We're looking into it`);
            });
        });
    });
  };

  const hideContactForm = useCallback(
    (event) => {
      if (event.target.id === "backdrop") {
        props.hideContactForm();
        sideDrawerCtx.hideBackdropHandler();
      }
    },
    [props, sideDrawerCtx]
  );

  useEffect(() => {
    switch (props.category) {
      case "videogames":
        setMainTagsPlaceholder("i.e. Playstation 4, Switch");
        setSecondaryTagsPlaceholder("i.e. RPG, Action, FPS");
        setMainTagsLabel("Platform(s)");
        break;
      case "movies":
        setMainTagsPlaceholder("i.e. Tarantino, Brad Pitt");
        setMainTagsLabel("Director/Actors");
        setSecondaryTagsPlaceholder("i.e. Drama, Comedy");
        break;
      case "books":
        setMainTagsPlaceholder("i.e. Alexandre Dumas, Dan Brown");
        setMainTagsLabel("Author");
        setSecondaryTagsPlaceholder("i.e. Fiction, Sci-Fi");
        break;
      default:
        break;
    }
    window.addEventListener("click", hideContactForm);
    return () => window.removeEventListener("click", hideContactForm);
  }, [hideContactForm, props.category]);

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.showContactForm}
      timeout={400}
      classNames={{
        enter: classes.showContactFormEnter,
        enterActive: classes.showContactFormEnterActive,
        exit: classes.showContactFormExit,
        exitActive: classes.showContactFormExitActive,
      }}
    >
      <div className={classes.formContainer}>
        <Script src="https://www.google.com/recaptcha/api.js?render=6LcVZSkcAAAAAJq7M6sq2rnUp5FfmPLNG6itAZr8"></Script>
        <h3 style={{ marginBlock: 0 }}>
          Feel free to leave out any fields you&apos;re not sure of
        </h3>
        <h4 style={{ marginBlock: 0 }}>...except the title</h4>
        <form method="POST" onSubmit={userRecommendationFormHandler}>
          <h3 className={classes.errorHeader}>{errorHeader}</h3>
          <div className={classes.Input}>
            <label htmlFor="title"> Title*</label>
            <input
              name="title"
              id="title"
              required
              placeholder="Title of your recommendation"
              ref={titleRef}
              className={classes.InputElement}
            />
          </div>
          <div className={classes.Input}>
            <label htmlFor="mainTags"> {mainTagsLabel}</label>
            <input
              name="mainTags"
              id="mainTags"
              ref={mainTagsRef}
              placeholder={mainTagsPlaceholder}
              className={classes.InputElement}
            />
          </div>
          <div className={classes.Input}>
            <label htmlFor="secondaryTags"> Genre(s)</label>
            <input
              ref={secondaryTagsRef}
              name="secondaryTags"
              id="secondaryTags"
              placeholder={secondaryTagsPlaceholder}
              className={classes.InputElement}
            />
          </div>
          <button type="submit" className={classes.Button}>
            SEND
          </button>
        </form>
      </div>
    </CSSTransition>
  );
};

export default ContactForm;
