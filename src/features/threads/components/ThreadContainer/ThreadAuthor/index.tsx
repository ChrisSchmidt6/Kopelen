import classes from "./ThreadAuthor.module.css";

const ThreadAuthor: React.FC<{ author: string }> = (props) => {
  return (
    <div className={classes.author}>
      Thread by: <u>{props.author}</u>
    </div>
  );
};

export default ThreadAuthor;
