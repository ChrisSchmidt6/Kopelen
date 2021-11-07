import { ReactElement } from "react";
import classes from "./IconButton.module.css";

const IconButton: React.FC<{ children: ReactElement; onClick?: () => void }> = (
  props
) => {
  return <button className={classes.button} onClick={props.onClick}>
    {props.children}
  </button>;
};

export default IconButton;
