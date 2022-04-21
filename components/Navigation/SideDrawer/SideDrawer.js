import React, { useContext } from "react";
import SideDrawerContext from "../../../store/SideDrawerContext";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../DrawerToggle/DrawerToggle";
import { FacebookIcon, InstagramIcon } from "../../UI/Icons/Icons";

import classes from "./SideDrawer.module.css";

const SideDrawer = () => {
  const sideDrawerCtx = useContext(SideDrawerContext);
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (sideDrawerCtx.showMenu) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <React.Fragment>
      <DrawerToggle />
      <div
        className={attachedClasses.join(" ")}
        style={{ textAlign: "center" }}
      >
        <nav>
          <NavigationItems />
        </nav>
        <div className={classes.Footer}>
          <h4 style={{ marginLeft: "3px" }}>Find us on:</h4>
          <div className={classes.SideDrawerSocial}>{FacebookIcon}{InstagramIcon}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
