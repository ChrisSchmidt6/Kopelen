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
        <label htmlFor="comment" />
        <textarea name="comment" placeholder="Leave a comment..." />
        <div className={classes.interact}>
          <input className={classes.cancel} type="reset" value="Cancel" />
          <input className={classes.submit} type="submit" value="Submit" disabled />
        </div>
      </form>
      {DUMMY_COMMENTS.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default CommentSection;
