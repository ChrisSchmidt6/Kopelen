//

import classes from "./Comment.module.css";

const Comment = (props) => {
  return (
    <div className={classes.comment}>
      <div className={classes.author}>{props.author}</div>
      <div className={classes.content}>{props.content}</div>
    </div>
  );
};

export default Comment;
