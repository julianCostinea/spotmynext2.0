import React, {useContext} from "react";
import Link from "next/link";
import SideDrawerContext from "../../../store/SideDrawerContext";
import { useRouter } from "next/router";

import classes from "./NavigationItem.module.css";

const NavigationItem = (props) => {
  const router = useRouter();
  const sideDrawerCtx = useContext(SideDrawerContext);
  return (
    <li className={`${classes.NavigationItem} ${sideDrawerCtx.showMenu ? classes.openPreview : null}`} id={"listItem"}>
      <Link id={"navlink"} href={props.link}>
        <a
          onClick={sideDrawerCtx.hideSideDrawer}
          className={
            router.pathname == props.link
              ? classes.active
              : null
          }
        >
          {props.children}
          <svg className={classes.svg} viewBox="0 0 70 36">
            <path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" />
          </svg>
        </a>
      </Link>
    </li>
  );
};

export default NavigationItem;
