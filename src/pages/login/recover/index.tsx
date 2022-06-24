import { useState } from "react";

import { Formik, Form } from "formik";
import { object, string } from "yup";

import StyledInput from "src/common/components/UI/StyledInput";

import classes from "./Recover.module.css";

const initialValues = {
  email: "",
};

const validationSchema = object().shape({
  email: string()
    .required("Email is a required field.")
    .email("You must enter a valid email."),
});

const Recover = () => {
  const [linkSent, setLinkSent] = useState<boolean>(false);

  return (
    <>
      <div className={classes.container}>
        <h1>Reset Password</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              resetForm();
              console.log(values.email); // Send POST with email
              setLinkSent(true);
              setSubmitting(false);
            }, 300);
          }}
          onReset={(values, { validateForm }) => {
            validateForm(initialValues);
          }}
        >
          {({ errors, isSubmitting, values }) => (
            <Form>
              {linkSent && (
                <p>
                  You will receive a reset link in your email if you provided a
                  valid email associated with an existing account.
                </p>
              )}
              {!linkSent && (
                <>
                  <p>
                    Please enter the email address associated with your account
                  </p>
                  <StyledInput
                    name="email"
                    label="Email Address"
                    type="email"
                    value={values.email || ""}
                  />
                  <div className={classes.formButtons}>
                    <input
                      type="submit"
                      value="Send Reset Link"
                      disabled={isSubmitting || Object.keys(errors).length > 0}
                    />
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Recover;
