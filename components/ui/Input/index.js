import { useEffect, useRef, useState } from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
    inputRef.current.focus();
  };

  const handleBlur = () => {
    if (inputRef.current.value.length === 0) setIsFocused(false);
  };

  useEffect(() => {
    if (inputRef.current.value.length > 0) setIsFocused(true);
  }, []);

  return (
    <>
      <div className={classes.inputGroup} onClick={handleFocus}>
        <label className={isFocused ? classes.active : ""} htmlFor={props.name}>
          {props.label}
        </label>
        <input
          name={props.name}
          type={props.type}
          ref={inputRef}
          onBlur={handleBlur}
          onFocus={handleFocus}
        ></input>
      </div>
    </>
  );
};

export default Input;
