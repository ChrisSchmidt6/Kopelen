import { useContext } from "react";
import router from "next/router";
import { Formik, Form } from "formik";
import { object, ref, string } from "yup";

import StyledInput from "components/UI/StyledInput";
import StyledButton from "components/UI/StyledButton";

import AuthContext from "store/auth-context";

import classes from "./Register.module.css";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  accessKey: "",
};

// Validating all fields (self explanatory)
const validationSchema = object().shape({
  username: string()
    .required("Username is a required field.")
    .min(3, "Your username must contain at least 3 characters")
    .max(20, "Your username can contain at most 20 characters"),
  email: string()
    .required("Email is a required field.")
    .email("You must enter a valid email."),
  password: string()
    .required("Password is a required field.")
    .min(8, "Your password must contain at least 8 characters")
    .max(25, "Your password can contain at most 25 characters"),
  confirmPassword: string()
    .required("Confirm Password is a required field.")
    .oneOf([ref("password")], "The password you provided does not match."),
  accessKey: string()
    .required("Access Key is a required field.")
    .max(50, "Your access key can contain at most 50 characters"),
});

const Register = () => {
  const authCtx = useContext(AuthContext);

  if (authCtx.isLoggedIn) {
    return (
      <div className={classes.actionContainer}>
        <h2>You must sign out first to create an account</h2>
        <StyledButton onClick={authCtx.onLogout}>Sign Out</StyledButton>
      </div>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <h1>Create a new account</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values, { setSubmitting, resetForm }) => {
            resetForm();
            authCtx.onLogin(values.email, values.password, true);
            setSubmitting(false);
            const origin = router.query.origin?.toString();
            if (origin) {
              // Assuming the origin is stored with commas replacing the slashes
              const originURL = `/${origin.replaceAll(",", "/")}`;
              router.push(originURL);
            } else {
              router.push("/");
            }
          }}
          onReset={(values, { validateForm }) => {
            validateForm(initialValues);
          }}
        >
          {({ errors, isSubmitting, values }) => (
            <Form>
              <StyledInput
                name="username"
                label="Username"
                type="text"
                value={values.username || ""}
              />
              <StyledInput
                name="email"
                label="Email Address"
                type="email"
                value={values.email || ""}
              />
              <StyledInput
                name="password"
                label="Password"
                type="password"
                value={values.password || ""}
              />
              <StyledInput
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={values.confirmPassword || ""}
              />
              <StyledInput
                name="accessKey"
                label="Access Key"
                type="text"
                value={values.accessKey || ""}
              />
              <div className={classes.formButtons}>
                <input type="reset" value="Reset" />
                <input
                  type="submit"
                  value="Create"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
