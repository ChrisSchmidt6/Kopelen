import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Field, Formik, Form } from "formik";
import { object, string } from "yup";

import StyledInput from "src/common/components/UI/StyledInput";
import StyledButton from "src/common/components/UI/StyledButton";

import AuthContext from "src/common/store/auth-context";

import classes from "./Create.module.css";

const initialValues = {
  title: "",
  textBody: "",
  link: "",
  tags: []
};

const validationSchema = object().shape({
  title: string()
    .required("Title is a required field.")
    .min(5, "Your title must contain at least 5 characters")
    .max(100, "Your title can contain at most 100 characters"),
  textBody: string().required("Conent is a required field."),
  link: string().required("")
});

type threadSelection = "text" | "link" | "upload";

const Create = () => {
  const [threadType, setThreadType] = useState<threadSelection>("text");
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const handleRedirectWithOrigin = () => {
    router.push("/login?origin=create");
  };

  if (!authCtx.isLoggedIn) {
    return (
      <div className={classes.actionContainer}>
        <h2>You must sign in first to create a thread</h2>
        <StyledButton size="large" onClick={handleRedirectWithOrigin}>
          Sign In
        </StyledButton>
      </div>
    );
  }

  const changeThreadType = (type: threadSelection) => {
    setThreadType(type);
  };

  return (
    <>
      <div className={classes.container}>
        <h1>Create thread</h1>
        <div className={classes.buttonGroup}>
          <StyledButton onClick={() => changeThreadType("text")}>
            Text
          </StyledButton>
          <StyledButton onClick={() => changeThreadType("link")} style="clear">
            Link
          </StyledButton>
          <StyledButton style="disabled">Upload</StyledButton>
        </div>
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
              <StyledInput
                name="title"
                label="Title"
                type="text"
                value={values.title || ""}
              />

              {threadType === "text" && <Field as="textarea" name="textBody" value={values.textBody || ""} placeholder="Enter content..." />}

              {threadType === "link" && <StyledInput name="link" label="Link" type="text" value={values.link || ""} />}

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
