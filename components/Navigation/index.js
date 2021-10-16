import { MdMenu } from "react-icons/md";
import Link from "next/link";

import NavigationButtons from "./NavigationButtons";
import NavigationDrawer from "./NavigationDrawer";

import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={classes.navBar}>
      <div className={classes.menuButton} tabIndex="-1">
        <MdMenu />
      </div>

      <NavigationDrawer />

      <Link href="/">
        <h1>Kopelen</h1>
      </Link>

      <NavigationButtons />
    </div>
  );
};

export default Navigation;
