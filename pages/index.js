import HomePageNavBox from "../components/HomePageNavBox/HomePageNavBox";
import * as Icons from "../components/UI/Icons/Icons";
import Recommendations from "../components/Recommendations/Recommendations";
import Recommendation from "../components/Recommendation/Recommendation";

import classes from "../styles/Home.module.css";
import SurpriseMe from "../components/HomePageNavBox/SurpriseMe";

const Home = (props) => {
  const { recentItems } = props;
  const fetchedRecentRecommendations = recentItems.result.map((item, index) => (
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
    <>
      <h1 className={classes.title}>Need a spot?</h1>
      <div className={classes.HomePageNavBoxContainer}>
        <HomePageNavBox link="/videogames">
          {" "}
          VideoGames {Icons.controllerIcon}
        </HomePageNavBox>
        <HomePageNavBox link="/movies">
          {" "}
          Movies {Icons.cameraIcon}
        </HomePageNavBox>
        <HomePageNavBox link="/books"> Books {Icons.bookIcon}</HomePageNavBox>
      </div>
      <SurpriseMe />
      <h1 className={classes.hotPicksHeader}>Recently added:</h1>
      <Recommendations>{fetchedRecentRecommendations}</Recommendations>
    </>
  );
};
export async function getStaticProps() {
  const res = await fetch("https://www.spotmynext.com/api/recentlyAdded");
  const recentItems = await res.json();

  return {
    props: {
      recentItems,
    },
    revalidate: 3600,
  };
}
export default Home;
