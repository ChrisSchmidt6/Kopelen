import { Formik, Form } from "formik";
import { object, string } from "yup";

import StyledButton from "src/common/components/UI/StyledButton";
import StyledInput from "src/common/components/UI/StyledInput";
import TagsInput from "./TagsInput";

const initialValues: { title: string; link: string; tags: string[] } = {
  title: "",
  link: "",
  tags: [],
};

const validationSchema = object().shape({
  title: string()
    .required("Title is a required field.")
    .min(5, "Your title must contain at least 5 characters")
    .max(100, "Your title can contain at most 100 characters"),
  link: string().required("Link is a required field."),
});

const LinkThread: React.FC<{
  className: string;
  tagsArray: string[];
  setTagsArray: any;
}> = (props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={(values, { setSubmitting }) => {
        values.tags = props.tagsArray;
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
      onReset={(values, { validateForm }) => {
        props.setTagsArray([]);
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

          <StyledInput
            name="link"
            label="Link"
            type="text"
            value={values.link || ""}
          />

          <TagsInput tags={props.tagsArray} setTags={props.setTagsArray} />

          <div className={props.className}>
            <StyledButton type="reset" style="clear" size="small">
              Reset
            </StyledButton>
            <StyledButton
              type="submit"
              style={
                isSubmitting || Object.keys(errors).length > 0
                  ? "disabled"
                  : "primary"
              }
              size="small"
            >
              Create
            </StyledButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LinkThread;
