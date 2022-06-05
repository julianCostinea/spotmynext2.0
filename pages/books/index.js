import SpotBox from "../../components/SpotBox/SpotBox";
import Head from 'next/head';
import React from "react";
import Recommendation from "../../components/Recommendation/Recommendation";
import Recommendations from "../../components/Recommendations/Recommendations";
import FrontImage from "../../components/FrontImage/FrontImage";

import classes from "./books.module.css";

const Books = (props) => {
  const pageTitle = "Spot My Next | Books";
  const pageDescription = "Find your next book here! Have other people recommend your next book.";
  const { popularItems } = props;
  const fetchedPopularRecommendations = popularItems.result.map(
    (item, index) => (
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
    )
  );

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={{ pageDescription }} />
      </Head>
      <FrontImage imagePath="/images/books.jpg" />
      <SpotBox category="books" placeholder="LOTR, 1984, Dune" />
      <h1 className={classes.hotPicksHeader}>Hot picks: </h1>
      <Recommendations>{fetchedPopularRecommendations}</Recommendations>
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
    revalidate: 60,
  };
}

export default Books;
