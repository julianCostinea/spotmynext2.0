import SpotBox from "../../components/SpotBox/SpotBox";
import React from "react";
import Recommendation from "../../components/Recommendation/Recommendation";
import Recommendations from "../../components/Recommendations/Recommendations";
import FrontImage from "../../components/FrontImage/FrontImage";

import classes from './books.module.css';

const Books = (props) => {
  const { popularItems } = props;
  console.log(recentItems);
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
      <FrontImage imagePath="/images/books.jpg" />
      <SpotBox category="books" placeholder="LOTR, 1984, Dune" />
      <h1 className={classes.hotPicksHeader}>Hot picks: </h1>
      {/* <Recommendations>{fetchedPopularRecommendations}</Recommendations> */}
    </React.Fragment>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    "https://www.spotmynext.com/api/popularItems?collection=books"
  );
  const popularItems = await res.json();

  return {
    props: {
      popularItems,
    },
    revalidate: 3600,
  };
}

export default Books;
