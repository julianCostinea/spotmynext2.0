import Link from "next/link";

import classes from "./HomePageNavBox.module.css";

const HomePageNavBox = (props) => {
  return (
    <Link href={props.link} passHref>
      <div className={classes.HomePageNavBox}>{props.children}</div>
    </Link>
  );
};
export default HomePageNavBox;
