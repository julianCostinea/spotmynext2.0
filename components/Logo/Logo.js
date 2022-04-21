import React, { useContext } from "react";
import SideDrawerContext from "../../store/SideDrawerContext";
import Link from "next/link";
import * as Icons from '../../components/UI/Icons/Icons';

import classes from "./Logo.module.css";

const Logo = (props) => {
  const sideDrawerCtx = useContext(SideDrawerContext);
  return (
    <div className={classes.Logo} style={{ cursor: "pointer" }}>
      <Link href="/" passHref>
        <div
          onClick={sideDrawerCtx.hideSideDrawer}
          className={classes.LogoContainer}
        >
          {Icons.SearchIcon}
          <p>
            <strong>|SpotMyNext</strong>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
