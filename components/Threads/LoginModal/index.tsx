import Modal from "components/UI/Modal";
import StyledButton from "components/UI/StyledButton";

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
        <>
          <StyledButton
            onClick={() => {
              props.redirectWithOrigin("login");
            }}
          >
            Sign In
          </StyledButton>
          <StyledButton
            onClick={() => {
              props.redirectWithOrigin("register");
            }}
          >
            Register
          </StyledButton>
        </>
      }
    />
  );
};

export default LoginModal;
