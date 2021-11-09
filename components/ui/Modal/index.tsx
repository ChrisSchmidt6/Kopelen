import { ReactElement } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

import IconButton from "../IconButton";

import classes from "./Modal.module.css";

const Modal: React.FC<{
  handleClose: () => void;
  header: ReactElement;
  main: ReactElement;
  className?: string;
}> = (props) => {

  return createPortal(
    <>
      <div className="container" onClick={props.handleClose}></div>
      <div className={`${classes.modal}${props.className ? ` ${props.className}` : ""}`}>
        <div className={classes.modalBody}>
          <header>{props.header}</header>
          <main>{props.main}</main>
          <footer>
            <IconButton onClick={props.handleClose}>
              <MdClose />
            </IconButton>
          </footer>
        </div>
      </div>
    </>,
    document.getElementById("modal")! 
  );
};

export default Modal;
