import { cloneElement, useState } from "react";

import classes from "./ToggleButton.module.css";

const ToggleButton = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const dropdownHandler = () => {
    setShowMenu(!showMenu);
  };

  const unfocusHandler = () => {
    if (showMenu) setShowMenu(false);
  };

  // First child should be the "button" that toggles the drop down
  const FirstChild = props.children[0];
  const ogClass = FirstChild.props.className;

  // Add original element class(es), dropdownButton class, and active class if active.
  const iconClasses = `${ogClass ? `${ogClass} ` : ""}${
    classes.dropdownButton
  }${showMenu ? ` ${classes.active}` : ""}`;

  // Clone toggle "button" to add click listener without wrapping it
  const ClonedIcon = cloneElement(FirstChild, {
    onClick: dropdownHandler,
    className: iconClasses,
  });

  const DropdownOptions = [...props.children.slice(1)];

  let key = 0;

  const Menu = DropdownOptions.map((option) => {
    key++;
    if (!option.props.disabled) {
      return cloneElement(option, {
        onClick: () => {
          if(option.props.onClick) option.props.onClick();
          dropdownHandler();
        },
        key,
      });
    } else return option;
  });

  return (
    <div className={classes.dropdown} onBlur={unfocusHandler} tabIndex="-1">
      {ClonedIcon}
      {showMenu && (
        <ul
          className={`${
            props.rightAlign ? classes.rightMenu : classes.leftMenu
          }`}
        >
          {Menu}
        </ul>
      )}
    </div>
  );
};

export default ToggleButton;
