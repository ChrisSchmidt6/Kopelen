const ThreadAuthor: React.FC<{ className: string; author: string }> = (
  props
) => {
  return (
    <div className={props.className}>
      Thread by: <u>{props.author}</u>
    </div>
  );
};

export default ThreadAuthor;
