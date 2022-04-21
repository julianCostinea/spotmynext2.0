import SpotBox from "../../components/SpotBox/SpotBox";
import React from "react";
import Recommendation from "../../components/Recommendation/Recommendation";
import Recommendations from "../../components/Recommendations/Recommendations";
import FrontImage from "../../components/FrontImage/FrontImage";

import classes from './videogames.module.css';

const VideoGames = (props) => {
  // const { popularItems } = props;
  // const fetchedPopularRecommendations = popularItems.result.map(
  //   (item, index) => (
  //     <Recommendation
  //       key={item._id}
  //       id={item._id}
  //       title={item.title}
  //       description={item.description}
  //       photo={item.photo}
  //       mainTags={item.mainTags}
  //       secondaryTags={item.secondaryTags}
  //       recommendations={item.recommendations}
  //     />
  //   )
  // );

  return (
    <React.Fragment>
      <FrontImage imagePath="/images/videogames.jpg" />
      <SpotBox category="videogames" placeholder="Zelda, GTA, Halo" />
      <h1 className={classes.hotPicksHeader}>Hot picks: </h1>
      {/* <Recommendations>{fetchedPopularRecommendations}</Recommendations> */}
    </React.Fragment>
  );
};

// export async function getStaticProps() {
//   const res = await fetch(
//     "http://localhost:3000/api/popularItems?collection=videogames"
//   );
//   const popularItems = await res.json();

//   return {
//     props: {
//       popularItems,
//     },
//     revalidate: 3600,
//   };
// }

export default VideoGames;
