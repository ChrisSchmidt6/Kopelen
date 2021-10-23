import { useRouter } from "next/router";
import { MdAccountCircle, MdForum, MdSettings } from "react-icons/md";

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
        <ToggleButton >
          <MdForum />
          <li onClick={() => handleRedirect("/")}>Threads</li>
          <li onClick={() => handleRedirect("/create")}>Create Thread</li>
        </ToggleButton>
        <ToggleButton rightAlign>
          <MdAccountCircle />
          <li onClick={() => handleRedirect("/login")}>Sign In</li>
          <li onClick={() => handleRedirect("/register")}>Register</li>
        </ToggleButton>
        <ToggleButton rightAlign>
          <MdSettings />
          <li disabled>Settings</li>
        </ToggleButton>
      </div>
    </div>
  );
};

export default NavigationButtons;
