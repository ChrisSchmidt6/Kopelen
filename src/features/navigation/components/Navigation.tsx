import { useState } from "react";
import { useRouter } from "next/router";
import { MdMenu } from "react-icons/md";

import NavigationButtons from "./NavigationButtons";
import NavigationDrawer from "./NavigationDrawer";

import classes from "./Navigation.module.css";
import { useAppDispatch, useAppSelector } from "src/common/hooks/reduxHooks";
import { logoutHandler } from "src/common/store/authSlice";

const Navigation = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const router = useRouter();

  const authInfo = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

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
    <nav className={classes.navBar}>
      <button
        className={updatedMenuButtonClasses}
        onClick={handleMenu}
        tabIndex={-1}
      >
        <MdMenu />
      </button>

      <NavigationDrawer
        open={isMenuOpen}
        closeMenu={onCloseMenu}
        onLogout={() => dispatch(logoutHandler())}
        isLoggedIn={authInfo.isLoggedIn}
      />

      <h1 onClick={() => handleRedirect("/")}>Kopelen</h1>

      <NavigationButtons
        onLogout={() => dispatch(logoutHandler())}
        isLoggedIn={authInfo.isLoggedIn}
      />
    </nav>
  );
};

export default Navigation;
