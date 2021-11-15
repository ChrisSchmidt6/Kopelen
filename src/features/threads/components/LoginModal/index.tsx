import Modal from "src/common/components/UI/Modal";
import StyledButton from "src/common/components/UI/StyledButton";

import classes from "./LoginModal.module.css";

const LoginModal: React.FC<{
  handleClose: () => void;
  redirectWithOrigin: (type: "login" | "register") => void;
}> = (props) => {
  return (
    <Modal
      className={classes.loginModal}
      handleClose={props.handleClose}
      header={<h1>You must be signed in to perform that action:</h1>}
      main={
        <div className={classes.buttonContainer}>
          <StyledButton
          size="large"
            onClick={() => {
              props.redirectWithOrigin("login");
            }}
          >
            Sign In
          </StyledButton>
          <StyledButton
          size="large"
            onClick={() => {
              props.redirectWithOrigin("register");
            }}
          >
            Register
          </StyledButton>
        </div>
      }
    />
  );
};

export default LoginModal;
