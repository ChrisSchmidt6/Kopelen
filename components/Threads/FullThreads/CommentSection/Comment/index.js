import { useState } from "react";
import {
  MdDeleteForever,
  MdEmojiEmotions,
  MdFlag,
  MdOutlinedFlag,
} from "react-icons/md";

import classes from "./Comment.module.css";

const Comment = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

  const isModerator = false;

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleFlag = () => {
    setIsFlagged(!isFlagged);
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
