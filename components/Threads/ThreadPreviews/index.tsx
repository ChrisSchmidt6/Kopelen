import { useContext, useState } from "react";
import Link from "next/link";
import router from "next/router";
import {
  MdComment,
  MdDeleteForever,
  MdEmojiEmotions,
  MdFlag,
  MdOutlinedFlag,
} from "react-icons/md";

import LoginModal from "../LoginModal";

import AuthContext from "store/auth-context";

import classes from "./ThreadPreviews.module.css";

const ThreadPreviews: React.FC<{
  title: string;
  author: string;
  id: string;
  type: string;
  data: string;
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
            allowFullScreen
          ></iframe>
        </div>
      );
    } else return <div>Error</div>;
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const redirectWithOrigin = (type: "login" | "register") => {
    router.push(`/${type}?origin=^${props.id}`);
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

  const likeClasses =
    classes.blueHover + `${isLiked ? ` ${classes.active}` : ""}`;
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
      <div className={classes.container} id={props.id}>
        <div className={classes.author}>
          Thread by: <u>{props.author}</u>
        </div>

        <div className={classes.deleteShortcut} onClick={handleFlag}>
          {isModerator ? <MdDeleteForever /> : flagIcon}
        </div>

        <Link href={`/thread/${props.id}`} passHref>
          <h4>{props.title}</h4>
        </Link>

        <div className={classes.containerBody}>
          {props.type === "text" && <p>{props.data}</p>}
          {props.type === "image" && (
            <img src={props.data} alt="Thread image" />
          )}
          {props.type === "video" && handleVideo(props.data)}
        </div>

        <div className={classes.interact}>
          <MdEmojiEmotions onClick={handleLike} className={likeClasses} />
          <Link href={`/thread/${props.id}`} passHref>
            <MdComment />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ThreadPreviews;
