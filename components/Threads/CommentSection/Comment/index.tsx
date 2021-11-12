import { useContext, useState } from "react";
import {
  MdDeleteForever,
  MdEmojiEmotions,
  MdFlag,
  MdOutlinedFlag,
} from "react-icons/md";

import AuthContext from "store/auth-context";

import classes from "./Comment.module.css";

const Comment: React.FC<{
  author: string;
  content: string;
  handleModalOpen: () => void;
}> = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const authCtx = useContext(AuthContext);

  const isModerator = false;

  const handleLike = () => {
    if (!authCtx.isLoggedIn) {
      props.handleModalOpen();
    } else {
      setIsLiked((prevState) => {
        return !prevState;
      });
    }
  };

  const handleFlag = () => {
    if (!authCtx.isLoggedIn) {
      props.handleModalOpen();
    } else {
      setIsFlagged((prevState) => {
        return !prevState;
      });
    }
  };

  const likeClasses = `${classes.blueHover}${
    isLiked ? ` ${classes.active}` : ""
  }`;
  const flagIcon = isFlagged ? (
    <MdFlag className={classes.flagged} />
  ) : (
    <MdOutlinedFlag />
  );

  return (
    <div className={classes.comment}>
      <div className={classes.author}>{props.author}</div>
      <div className={classes.action} onClick={handleFlag}>
        {isModerator ? <MdDeleteForever /> : flagIcon}
      </div>
      <div className={classes.content}>{props.content}</div>
      <div className={classes.interact}>
        <MdEmojiEmotions className={likeClasses} onClick={handleLike} />
      </div>
    </div>
  );
};

export default Comment;
