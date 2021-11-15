import React, { useEffect, useRef, useState } from "react";
import { useField } from "formik";

import classes from "./Input.module.css";

const Input: React.FC<{
  value: string;
  name: string;
  label: string;
  type: string;
}> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [field, meta] = useField(props);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const focusField = () => {
    inputRef.current!.focus();
  };

  const handleBlur = (event: React.FocusEvent) => {
    if (props.value.length === 0) {
      setIsFocused(false);
    }
    field.onBlur(event);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.value.length > 0) {
        setIsFocused(true);
      } else if (inputRef.current !== document.activeElement) {
        setIsFocused(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [props.value]);

  const showError = meta.touched && meta.error;
  const errorClass = showError ? classes.error : undefined;

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
            type={props.type}
            ref={inputRef}
            {...field}
            onBlur={(e) => {
              handleBlur(e);
            }}
            onFocus={handleFocus}
          />
        </div>
        {showError ? <small>{meta.error}</small> : null}
      </div>
    </>
  );
};

export default Input;
