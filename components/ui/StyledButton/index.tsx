import classes from './StyledButton.module.css';

const StyledButton: React.FC<{ children: any, handleClick: () => void }> = (props) => {
    return (
        <button className={classes.styledButton} onClick={props.handleClick} tabIndex={-1}>
          {props.children}
        </button>
    );
}

export default StyledButton;