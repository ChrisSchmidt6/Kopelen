import { ReactElement } from "react";
import { useRouter } from "next/router";
import { MdAccountCircle, MdForum, MdSettings } from "react-icons/md";

import ToggleButton from "src/common/components/UI/ToggleButton";
import IconButton from "src/common/components/UI/IconButton";

import classes from "./NavigationButtons.module.css";

const NavigationButtons: React.FC<{
  onLogout: () => void;
  isLoggedIn: boolean;
}> = (props) => {
  const router = useRouter();

  const handleRedirect = (url: string) => {
    router.push(url);
  };

  let accountOptions: ReactElement;

  if (props.isLoggedIn) {
    accountOptions = (
      <>
        <li>Profile</li>
        <li onClick={props.onLogout}>Sign Out</li>
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
    <div className={classes.navIcons}>
      <div className={classes.navIconContainer}>
        <ToggleButton>
          <IconButton>
            <MdForum />
          </IconButton>
          <li onClick={() => handleRedirect("/")}>Threads</li>
          <li onClick={() => handleRedirect("/create")}>Create Thread</li>
        </ToggleButton>
        <ToggleButton rightAlign>
          <IconButton>
            <MdAccountCircle />
          </IconButton>
          {accountOptions}
        </ToggleButton>
        <ToggleButton rightAlign>
          <IconButton>
            <MdSettings />
          </IconButton>
          <li>Settings</li>
        </ToggleButton>
      </div>
    </div>
  );
};

export default NavigationButtons;
