import { useContext } from "react";
import router from "next/router";
import { Formik, Form } from "formik";
import { object, string } from "yup";

import StyledInput from "src/common/components/UI/StyledInput";
import StyledButton from "src/common/components/UI/StyledButton";

import AuthContext from "src/common/store/auth-context";

import classes from "./Login.module.css";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = object().shape({
  email: string()
    .required("Email is a required field.")
    .email("You must enter a valid email."),
  password: string()
    .required("Password is a required field.")
    .max(25, "Your password can contain at most 25 characters"),
});

const Login = () => {
  const authCtx = useContext(AuthContext);

  if (authCtx.isLoggedIn) {
    return (
      <section className={classes.actionContainer}>
        <h2>You are already signed in</h2>
        <p>Did you mean to ...</p>
        <StyledButton size="large" onClick={authCtx.onLogout}>
          Sign Out
        </StyledButton>
      </section>
    );
  }

  return (
    <>
      <section className={classes.container}>
        <h1>Sign in</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              resetForm();
              authCtx.onLogin(values.email, values.password, true);
              setSubmitting(false);
              const origin = router.query.origin?.toString();
              if (origin) {
                // Assuming the origin is stored with commas replacing the slashes and replace caret with pound
                const originURL = `/${origin
                  .replaceAll(",", "/")
                  .replace("^", "#")}`;
                router.push(originURL);
              } else {
                router.push("/");
              }
            }, 300);
          }}
          onReset={(values, { validateForm }) => {
            validateForm(initialValues);
          }}
        >
          {({ errors, isSubmitting, values }) => (
            <Form>
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
              <small>
                Forgot password? Recover it{" "}
                <a
                  href="#"
                  onClick={() => {
                    router.push("/login/recover");
                  }}
                >
                  here.
                </a>
              </small>
              <div className={classes.formButtons}>
                <input type="reset" value="Reset" />
                <input
                  type="submit"
                  value="Sign In"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                />
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default Login;
