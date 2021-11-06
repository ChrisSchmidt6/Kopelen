import { ReactElement } from "react";
import { useRouter } from "next/router";

import classes from "./NavigationDrawer.module.css";

const NavigationDrawer: React.FC<{
  closeMenu: () => void;
  open: boolean;
  onLogout: () => void;
  isLoggedIn: boolean;
}> = (props) => {
  const router = useRouter();

  const handleRedirect = (url: string) => {
    router.push(url);
    props.closeMenu();
  };

  const handleLogout = () => {
    props.onLogout();
    props.closeMenu();
  }

  const updatedClasses = `${classes.menu}${
    props.open ? ` ${classes.active}` : ""
  }`;

  let accountOptions: ReactElement;

  if (props.isLoggedIn) {
    accountOptions = (
      <>
        <li>Profile</li>
        <li onClick={handleLogout}>Sign Out</li>
      </>
    );
  } else {
    accountOptions = (
      <>
        <li onClick={() => handleRedirect("/login")}>Sign In</li>
        <li onClick={() => handleRedirect("/register")}>Register</li>
      </>
    );
  }

  return (
    <>
      <div className={updatedClasses}>
        <ul className={classes.navigation}>
          <li onClick={() => handleRedirect("/")}>Threads</li>
          <li onClick={() => handleRedirect("/create")}>Create Thread</li>
          <li className={classes.divider} />
          {accountOptions}
          <li className={classes.divider} />
          <li>Settings</li>
        </ul>
        <div className={classes.background} onClick={props.closeMenu}></div>
      </div>
    </>
  );
};

export default NavigationDrawer;
