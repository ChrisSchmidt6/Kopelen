import { ReactElement } from "react";

import classes from "./Menu.module.css";

const Menu: React.FC<{
  show: boolean;
  options: Array<ReactElement>
  rightAlign?: boolean;
  clickHandler: () => void;
}> = (props) => {
  return (
    <ul
      className={`${classes.menu} ${props.rightAlign ? classes.rightMenu : classes.leftMenu}`}
    >
      <div onClick={props.clickHandler}>{props.options}</div>
    </ul>
  );
};

export default Menu;
