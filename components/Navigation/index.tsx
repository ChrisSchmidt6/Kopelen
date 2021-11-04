import { useState } from "react";
import { useRouter } from "next/router";
import { MdMenu } from "react-icons/md";

import NavigationButtons from "./NavigationButtons";
import NavigationDrawer from "./NavigationDrawer";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const router = useRouter();

  const handleRedirect = (url: string) => {
    router.push(url);
    if (isMenuOpen) setisMenuOpen(false);
  };

  const handleMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };

  const onCloseMenu = () => {
    if (isMenuOpen) setisMenuOpen(false);
  };

  const updatedMenuButtonClasses = `${classes.menuButton}${
    isMenuOpen ? ` ${classes.active}` : ""
  }`;

  return (
    <div className={classes.navBar}>
      <div
        className={updatedMenuButtonClasses}
        onClick={handleMenu}
        tabIndex={-1}
      >
        <MdMenu />
      </div>

      <NavigationDrawer open={isMenuOpen} closeMenu={onCloseMenu} />

      <h1 onClick={() => handleRedirect("/")}>Kopelen</h1>

      <NavigationButtons />
    </div>
  );
};

export default Navigation;
