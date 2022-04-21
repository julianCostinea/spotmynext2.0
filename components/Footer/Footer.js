import React from "react";
import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "../UI/Icons/Icons";

import classes from "./Footer.module.css";

const Footer = () => (
  <footer className={classes.footer}>
    <div className={classes.footerMenu}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/cookies">
        <a>Cookies</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
    <div className={classes.footerSocial}>
      {FacebookIcon}
      {InstagramIcon}
    </div>
  </footer>
);

export default Footer;
