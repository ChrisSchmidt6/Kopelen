import Comment from "./Comment";

import classes from "./CommentSection.module.css";

const DUMMY_COMMENTS = [
  {
    author: "cupe",
    content: "wow! so rad!",
  },
  {
    author: "potter",
    content: "wingardium leviosa",
  },
  {
    author: "chris",
    content: "ipsum something or other",
  },
];

const CommentSection = (props) => {
  return (
    <div className={props.className}>
      <form className={classes.addComment}>
        <label for="comment">Leave a comment</label>
        <textarea name="comment" />
        <input type="submit" value="Submit" disabled />
      </form>
      {DUMMY_COMMENTS.map((comment) => (
        <Comment {...comment} />
      ))}
    </div>
  );
};

export default CommentSection;
