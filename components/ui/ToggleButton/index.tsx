import React, { cloneElement, MouseEvent, ReactElement, useState } from "react";

import Menu from "./Menu";

import classes from "./ToggleButton.module.css";

const ToggleButton: React.FC<{
  rightAlign?: boolean;
  children: Array<ReactElement>;
}> = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const dropdownHandler = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const unfocusHandler = () => {
    if (showMenu) setShowMenu(false);
  };

  // First child should be the "button" that toggles the drop down
  const FirstChild = cloneElement(props.children[0], {
    onClick: dropdownHandler,
  });

  const DropdownOptions = props.children.slice(1);

  return (
    <div className={classes.dropdown} onMouseLeave={unfocusHandler}>
      {FirstChild}
      {showMenu && (
        <Menu
          show={showMenu}
          options={DropdownOptions}
          rightAlign={props.rightAlign}
          clickHandler={unfocusHandler}
        />
      )}
    </div>
  );
};

export default ToggleButton;
