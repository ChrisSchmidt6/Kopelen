import { useRouter } from "next/router";
import { MdAccountCircle, MdSettings } from "react-icons/md";

import classes from "./NavigationDrawer.module.css";

const NavigationDrawer = () => {
  const router = useRouter();

  const handleRedirect = (url) => {
    router.push(url);
  };

  return (
    <>
      <div className={classes.menu}>
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
