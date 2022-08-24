import React, { useState } from "react";

import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../components/Navigation/SideDrawer/SideDrawer";
import Footer from "../components/Footer/Footer";
import Backdrop from "../components/UI/Backdrop/Backdrop";

import classes from "./Layout.module.css";
import { SideDrawerContextProvider } from "../store/SideDrawerContext";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const closeSideDrawer = () => {
    setShowSideDrawer(false);
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <SideDrawerContextProvider>
        <Backdrop />
        <Toolbar/>
        <SideDrawer
              open={showSideDrawer}
              closed={closeSideDrawer}
            />
          </SideDrawerContextProvider>
        <main className={classes.main}>{props.children}</main>
      </div>
    </React.Fragment>
  );
};

export default Layout;
