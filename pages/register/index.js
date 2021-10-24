import { Formik, Form } from "formik";
import { object, ref, string } from "yup";

import Input from "../../components/ui/Input";

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
          {({ errors, isSubmitting, values }) => (
            <Form>
              <Input
                name="username"
                label="Username"
                type="text"
                value={values.username || ""}
              />
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
              <Input
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={values.confirmPassword || ""}
              />
              <Input
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
