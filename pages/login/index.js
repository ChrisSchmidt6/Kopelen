import { Formik, Form } from "formik";
import { object, string } from "yup";

import Input from "../../components/ui/Input";

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
  return (
    <>
      <div className={classes.container}>
        <h1>Sign in</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
          onReset={(values, { validateForm }) => {
            validateForm(initialValues);
          }}
        >
          {({ errors, isSubmitting, values }) => (
            <Form>
              <Input
                name="email"
                label="Email Address"
                type="email"
                value={values.email || ""}
              />
              <Input
                name="password"
                label="Password"
                type="password"
                value={values.password || ""}
              />
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
      </div>
    </>
  );
};

export default Login;
