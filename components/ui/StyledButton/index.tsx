import classes from './StyledButton.module.css';

const StyledButton: React.FC<{ children: any, onClick?: () => void }> = (props) => {
    return (
        <button className={classes.styledButton} onClick={props.onClick} tabIndex={-1}>
          {props.children}
        </button>
    );
}

export default StyledButton;