import React from "react";
import NavigationItem from "../NavigationItem/NavigationItem";
import Logo from "../../Logo/Logo";

import classes from "./NavigationItems.module.css";

const NavigationItems = () => {
  return (
    <ul className={`${classes.NavigationItems}`}>
      <Logo />
      <NavigationItem link="/videogames">Video&nbsp;Games</NavigationItem>
      <NavigationItem link="/movies">Movies&nbsp;&amp;&nbsp;TV </NavigationItem>
      <NavigationItem link="/books">Books</NavigationItem>
      <NavigationItem link="/about">What&nbsp;it&nbsp;it?</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
