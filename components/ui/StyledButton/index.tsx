import classes from "./StyledButton.module.css";

type styles = "primary" | "secondary" | "clear" | "disabled";

type sizes = "large" | "medium" | "small";

const StyledButton: React.FC<{
  children: any;
  onClick?: () => void;
  style?: styles;
  size?: sizes;
}> = (props) => {
  let style = props.style;
  if (!style) style = "primary";

  let size = props.size;
  if (!size) size = "medium";

  return (
    <button
      className={`${classes.styledButton} ${classes[style]} ${classes[size]}`}
      disabled={props.style === "disabled"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default StyledButton;
