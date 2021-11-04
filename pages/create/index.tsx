import { Field, Formik, Form } from "formik";
import { object, string } from "yup";

import Input from "../../components/ui/Input";

import classes from "./Create.module.css";

const initialValues = {
  title: "",
  textBody: "",
};

const validationSchema = object().shape({
  title: string()
    .required("Title is a required field.")
    .min(5, "Your title must contain at least 5 characters")
    .max(100, "Your title can contain at most 100 characters"),
});

const Create = () => {
  return (
    <>
      <div className={classes.container}>
        <h1>Create thread</h1>
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
                name="title"
                label="Title"
                type="text"
                value={values.title || ""}
              />
              <Field
                as="textarea"
                name="textBody"
                placeholder="Enter content..."
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

export default Create;