import Comment from "./Comment";

import classes from "./CommentSection.module.css";

const DUMMY_COMMENTS = [
  {
    author: "cupe",
    content: "wow! so rad!",
    id: "c1",
  },
  {
    author: "potter",
    content: "wingardium leviosa",
    id: "c2",
  },
  {
    author: "chris",
    content: "ipsum something or other",
    id: "c3",
  },
];

const CommentSection = (props) => {
  return (
    <div className={props.className}>
      <form className={classes.addComment}>
        <label htmlFor="comment">Leave a comment</label>
        <textarea name="comment" />
        <input type="submit" value="Submit" disabled />
      </form>
      {DUMMY_COMMENTS.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default CommentSection;
