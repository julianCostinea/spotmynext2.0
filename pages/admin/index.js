import React, { useRef, useState } from "react";

import classes from "./admin.module.css";

const Admin = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const photoRef = useRef();
  const mainTagsRef = useRef();
  const secondaryTagsRef = useRef();
  const collectionRef = useRef();
  const [errorHeader, setErrorHeader] = useState(null);
  const [successHeader, setSuccessHeader] = useState(null);

  const formHandler = (event) => {
    event.preventDefault();

    const title = titleRef.current.value.trim();
    const photo = photoRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const mainTags = mainTagsRef.current.value.trim();
    const secondaryTags = secondaryTagsRef.current.value.trim();
    const collection = collectionRef.current.value;

    const data = { title, photo, description, mainTags, secondaryTags, collection };

    if (!title || !photo || !description || !mainTags || !secondaryTags) {
      setErrorHeader("Fill out all fields");
      return;
    }
    fetch(`https://spotmynext2-0.vercel.app/api/admin/insertItem`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((results) => {
        setSuccessHeader("Item inserted");
        titleRef.current.value= "";
        photoRef.current.value= "";
        descriptionRef.current.value= "";
        mainTagsRef.current.value= "";
        secondaryTagsRef.current.value= "";
      })
      .catch((error) => {
        setErrorHeader(error.message);
      });
  };
  return (
    <React.Fragment>
      <h1>Insert new item </h1>
      <h2 className={classes.successHeader}>{successHeader}</h2>
      <h2 className={classes.errorHeader}>{errorHeader}</h2>
      <form
        className={classes.formContainer}
        method="POST"
        onSubmit={formHandler}
      >
        <div className={classes.Input}>
          <input
            name="title"
            id="title"
            required
            placeholder="Title"
            ref={titleRef}
            className={classes.InputElement}
          />
        </div>
        <div className={classes.Input}>
          <textarea
            ref={descriptionRef}
            name="description"
            columns="3"
            id="description"
            required
            placeholder="Description"
            className={classes.InputElement}
          />
        </div>
        <div className={classes.Input}>
          <input
            ref={photoRef}
            name="photo"
            id="photo"
            required
            placeholder="Photo"
            className={classes.InputElement}
          />
        </div>
        <div className={classes.Input}>
          <input
            name="mainTags"
            ref={mainTagsRef}
            id="mainTags"
            required
            placeholder="MainTags: Playstaion 5, Playstation 4"
            className={classes.InputElement}
          />
        </div>
        <div className={classes.Input}>
          <input
            ref={secondaryTagsRef}
            name="secondaryTags"
            id="secondaryTags"
            required
            placeholder="SecondaryTags: JRPG, Action"
            className={classes.InputElement}
          />
        </div>
        <div className={classes.Input}>
          <select
            ref={collectionRef}
            name="collection"
            id="collection"
            required
            className={classes.InputElement}
          >
            <option value="videogames">Videogames</option>
            <option value="movies">Movies</option>
            <option value="books">Books</option>
          </select>
        </div>
        <button type="submit" className={classes.Button}>
          INSERT
        </button>
      </form>
    </React.Fragment>
  );
};
export default Admin;
