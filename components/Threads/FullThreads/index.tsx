import { useContext, useState } from "react";
import router from "next/router";
import {
  MdDeleteForever,
  MdEmojiEmotions,
  MdFlag,
  MdOutlinedFlag,
  MdTag,
} from "react-icons/md";

import CommentSection from "./CommentSection";
import LoginModal from "../LoginModal";

import AuthContext from "store/auth-context";

import classes from "./FullThreads.module.css";

const FullThreads: React.FC<{
  id: string;
  type: string;
  author: string;
  title: string;
  data: string;
  tags: string[];
}> = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const authCtx = useContext(AuthContext);

  const isModerator = false;

  const handleVideo = (link: string) => {
    const isYoutubeLink =
      /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/; // Check if link is a youtube link
    if (isYoutubeLink.test(link)) {
      const id = link.match(
        /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
      )![1];
      const url = `https://www.youtube.com/embed/${id}?rel=0`;
      return (
        <div className={classes.video}>
          <iframe
            title={props.title}
            src={url}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      );
    } else return <div>Error</div>;
  };

  const openLoginModal = () => {
    if (!authCtx.isLoggedIn) {
      setIsLoginModalOpen(true);
    }
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const redirectWithOrigin = (type: "login" | "register") => {
    router.push(`/${type}?origin=thread,${props.id}`);
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

  const likeClasses = `${classes.iconButton}${
    isLiked ? ` ${classes.active}` : ""
  }`;
  const flagIcon = isFlagged ? (
    <MdFlag className={classes.flagged} />
  ) : (
    <MdOutlinedFlag />
  );

  return (
    <>
      {isLoginModalOpen && (
        <LoginModal
          handleClose={closeLoginModal}
          redirectWithOrigin={redirectWithOrigin}
        />
      )}
      <div className={classes.thread}>
        <div className={classes.author}>
          Thread by: <u>{props.author}</u>
        </div>

        <div className={classes.action} onClick={handleFlag}>
          {isModerator ? <MdDeleteForever /> : flagIcon}
        </div>

        <h2>{props.title}</h2>

        <div className={classes.containerBody}>
          {props.type === "text" && <p>{props.data}</p>}
          {props.type === "image" && (
            <img src={props.data} alt="Thread image" />
          )}
          {props.type === "video" && handleVideo(props.data)}
        </div>
        <div className={classes.tags}>
          <MdTag />
          {props.tags.map((tag) => {
            return <span>{tag}</span>;
          })}
        </div>

        <div className={classes.like}>
          <div className={likeClasses} onClick={handleLike}>
            <MdEmojiEmotions /> Like
          </div>
        </div>
      </div>

      <CommentSection
        className={classes.comments}
        handleModalOpen={openLoginModal}
      />
    </>
  );
};

export default FullThreads;
