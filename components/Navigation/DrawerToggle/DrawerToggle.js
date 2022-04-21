import React, { useContext } from "react";
import SideDrawerContext from "../../../store/SideDrawerContext";
import classes from "./DrawerToggle.module.css";

const DrawerToggle = (props) => {
  const sideDrawerCtx = useContext(SideDrawerContext);

  return (
    <div
      className={classes.DrawerToggle}
    >
      <input id="DrawerToggle" type="checkbox" onClick={sideDrawerCtx.toggleSideDrawer}/>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default DrawerToggle;
