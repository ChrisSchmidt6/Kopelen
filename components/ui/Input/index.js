import { useEffect, useRef, useState } from "react";
import { useField } from "formik";

import classes from "./Input.module.css";

const Input = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const [field, meta] = useField(props);

  const handleFocus = (e) => {
    if (inputRef.current.value.length > 0) setIsFocused(true);
  };

  const focusField = () => {
    setIsFocused(true);
    inputRef.current.focus();
  };

  const handleBlur = (e) => {
    if (inputRef.current.value.length === 0) setIsFocused(false);
    field.onBlur(e);
  };

  useEffect(() => {
    if (inputRef.current.value.length > 0) setIsFocused(true);
  }, []);

  const showError = meta.touched && meta.error;
  const errorClass = showError ? classes.error : null;

  const labelClasses = `${isFocused ? classes.active + " " : ""}${errorClass}`;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.inputGroup} onClick={focusField}>
          <label className={labelClasses} htmlFor={props.name}>
            {props.label}
          </label>
          <input
            className={errorClass}
            name={props.name}
            type={props.type}
            ref={inputRef}
            {...field}
            onBlur={(e) => {
              handleBlur(e);
            }}
            onFocus={(e) => {
              handleFocus(e);
            }}
          />
        </div>
        {showError ? <small>{meta.error}</small> : null}
      </div>
    </>
  );
};

export default Input;
