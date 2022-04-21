import React, {useContext} from "react";
import SideDrawerContext from "../../../store/SideDrawerContext";

import classes from "./Backdrop.module.css";

const Backdrop = () => {
    const sideDrawerCtx = useContext(SideDrawerContext);

    function hideBackdrop(){
      sideDrawerCtx.hideBackdropHandler();
      sideDrawerCtx.hideSideDrawer();
    }

  return (
    sideDrawerCtx.showBackdrop ? (
    <div id="backdrop" onClick={hideBackdrop} className={classes.Backdrop}></div>
  ) : null )
};

export default Backdrop;
