import { MdAccountCircle, MdSettings } from "react-icons/md";
import { useRouter } from "next/router";

import ToggleButton from "../../ui/ToggleButton";

import classes from "./NavigationButtons.module.css";

const NavigationButtons = () => {
  const router = useRouter();

  const handleRedirect = (url) => {
    router.push(url);
  };

  return (
    <div className={classes.navIcons}>
      <div className={classes.navIconContainer}>
        <ToggleButton rightAlign>
          <MdAccountCircle />
          <li onClick={() => handleRedirect("/login")}>Sign In</li>
          <li disabled>Register</li>
        </ToggleButton>
        <ToggleButton rightAlign>
          <MdSettings />
          <li disabled>Dark Mode</li>
          <li disabled>Zark Mode 2</li>
          <li disabled>Settings</li>
        </ToggleButton>
      </div>
    </div>
  );
};

export default NavigationButtons;
