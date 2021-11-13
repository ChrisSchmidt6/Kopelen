import { useContext, useState } from "react";
import router from "next/router";

import CommentSection from "./CommentSection";
import LoginModal from "./LoginModal";
import ThreadContainer from "./ThreadContainer";

import AuthContext from "store/auth-context";

import classes from "./Threads.module.css";

const Threads: React.FC<{
  id: string;
  type: "text" | "image" | "video";
  author: string;
  title: string;
  data: string;
  tags: string[];
  view: "full" | "preview";
}> = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const authCtx = useContext(AuthContext);

  const isModerator = false;

  const openLoginModal = () => {
    if (!authCtx.isLoggedIn) {
      setIsLoginModalOpen(true);
    }
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const redirectWithOrigin = (type: "login" | "register") => {
    if (props.view === "full") {
      router.push(`/${type}?origin=thread,${props.id}`);
    } else {
      router.push(`/${type}?origin=^${props.id}`);
    }
  };

  const handleLike = () => {
    if (!authCtx.isLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      setIsLiked((prevState) => {
        return !prevState;
      });
    }
  };

  const handleFlag = () => {
    if (!authCtx.isLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      setIsFlagged((prevState) => {
        return !prevState;
      });
    }
  };

  return (
    <>
      {isLoginModalOpen && (
        <LoginModal
          handleClose={closeLoginModal}
          redirectWithOrigin={redirectWithOrigin}
        />
      )}

      <ThreadContainer
        id={props.id}
        type={props.type}
        author={props.author}
        title={props.title}
        data={props.data}
        tags={props.tags}
        view={props.view}
        isModerator={isModerator}
        isFlagged={isFlagged}
        isLiked={isLiked}
        handleFlag={handleFlag}
        handleLike={handleLike}
      />

      {props.view === "full" && (
        <CommentSection
          threadId={props.id}
          className={classes.comments}
          handleModalOpen={openLoginModal}
        />
      )}
    </>
  );
};

export default Threads;
