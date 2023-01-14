import { useState } from "react";
import { useRouter } from "next/router";

import StyledButton from "src/common/components/UI/StyledButton";
import TextThread from "src/features/createThread/components/TextThread";
import LinkThread from "src/features/createThread/components/LinkThread";

import classes from "./Create.module.css";
import { useAppSelector } from "src/common/hooks/reduxHooks";

type threadSelection = "text" | "link" | "upload";

const Create = () => {
  const [threadType, setThreadType] = useState<threadSelection>("text");
  const [tagsArray, setTagsArray] = useState<string[]>([]);

  const authInfo = useAppSelector((state) => state.authSlice);
  const router = useRouter();

  const handleRedirectWithOrigin = () => {
    router.push("/login?origin=create");
  };

  if (!authInfo.isLoggedIn) {
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
    setTagsArray([]);
    setThreadType(type);
  };

  return (
    <>
      <section className={classes.container}>
        <h1>Create thread</h1>
        <div className={classes.buttonGroup}>
          <StyledButton
            onClick={() => changeThreadType("text")}
            style={threadType === "text" ? "primary" : "clear"}
          >
            Text
          </StyledButton>
          <StyledButton
            onClick={() => changeThreadType("link")}
            style={threadType === "link" ? "primary" : "clear"}
          >
            Link
          </StyledButton>
          <StyledButton style="disabled">File</StyledButton>
        </div>

        {threadType === "text" && (
          <TextThread
            className={classes.formButtons}
            tagsArray={tagsArray}
            setTagsArray={setTagsArray}
          />
        )}

        {threadType === "link" && (
          <LinkThread
            className={classes.formButtons}
            tagsArray={tagsArray}
            setTagsArray={setTagsArray}
          />
        )}
      </section>
    </>
  );
};

export default Create;
