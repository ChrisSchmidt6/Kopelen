import { Formik, Form } from "formik";
import { object, ref, string } from "yup";

import Input from "../../components/ui/Input";

import classes from "./Register.module.css";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Validating all fields (self explanatory)
const validationSchema = object().shape({
  username: string()
    .required("Username is a required field.")
    .min(3, "Your username must contain at least 3 characters")
    .max(14, "Your username can contain at most 14 characters"),
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
});

const Register = () => {
  return (
    <>
      <div className={classes.container}>
        <h1>Create a new account</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form>
              <Input as={Input} name="username" label="Username" type="text" />
              <Input
                as={Input}
                name="email"
                label="Email Address"
                type="email"
              />
              <Input
                as={Input}
                name="password"
                label="Password"
                type="password"
              />
              <Input
                as={Input}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
              />
              <div className={classes.formButtons}>
                <input type="reset" value="Clear" />
                <input
                  type="submit"
                  value="Create Account"
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
