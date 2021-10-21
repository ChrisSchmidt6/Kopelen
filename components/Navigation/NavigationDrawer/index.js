import { useRouter } from "next/router";

import classes from "./NavigationDrawer.module.css";

const NavigationDrawer = (props) => {
  const router = useRouter();

  const handleRedirect = (url) => {
    router.push(url);
    props.closeMenu();
  };

  const updatedClasses = `${classes.menu}${props.open ? ` ${classes.active}` : ""}`;

  return (
    <>
      <div className={updatedClasses}>
        <ul className={classes.navigation}>
          <li onClick={() => handleRedirect("/login")}>Sign In</li>
          <li disabled>Register</li>
          <li className={classes.divider} />
          <li disabled>Settings</li>
        </ul>
      </div>
    </>
  );
};

export default NavigationDrawer;
