import HomePageNavBox from "../components/HomePageNavBox/HomePageNavBox";
import * as Icons from "../components/UI/Icons/Icons";

import classes from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <h1 className={classes.title}>Need a spot?</h1>
      <div className={classes.HomePageNavBoxContainer}>
        <HomePageNavBox link="/videogames"> VideoGames {Icons.controllerIcon}</HomePageNavBox>
        <HomePageNavBox link="/movies"> Movies {Icons.cameraIcon}</HomePageNavBox>
        <HomePageNavBox link="/books"> Books {Icons.bookIcon}</HomePageNavBox>
      </div>
      <HomePageNavBox link="/suprise"> Suprise Me! </HomePageNavBox>
      <h1>Recently added:</h1>
    </>
  );
}
