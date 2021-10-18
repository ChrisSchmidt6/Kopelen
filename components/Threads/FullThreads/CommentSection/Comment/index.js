import {
  MdDeleteForever,
  MdEmojiEmotions,
  MdOutlinedFlag,
} from "react-icons/md";

import classes from "./Comment.module.css";

const Comment = (props) => {
  const isModerator = false;

  return (
    <div className={classes.comment}>
      <div className={classes.author}>{props.author}</div>
      <div className={classes.action}>
        {isModerator ? <MdDeleteForever /> : <MdOutlinedFlag />}
      </div>
      <div className={classes.content}>{props.content}</div>
      <div className={classes.interact}>
        <MdEmojiEmotions className={classes.blueHover} />
      </div>
    </div>
  );
};

export default Comment;
