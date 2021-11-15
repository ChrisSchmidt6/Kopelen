import { useAppSelector } from "src/common/hooks/reduxHooks";

import Comment from "./Comment";

import classes from "./CommentSection.module.css";

const CommentSection: React.FC<{
  threadId: string;
  className: string;
  handleModalOpen: () => void;
}> = (props) => {
  const allComments = useAppSelector((state) => state.threadsSlice.comments);
  const comments = allComments.filter(
    (comment) => comment.thread === props.threadId
  );

  const commentElements = comments.map((comment) => {
    const isReply = comment.parent !== "thread";

    let parentDetails;
    if (isReply) {
      const parentComment = comments.filter(
        (data) => data.id === comment.parent
      )[0];
      parentDetails = { id: parentComment.id, data: parentComment.data };
    }

    const commentProps = {
      key: comment.id,
      id: comment.id,
      author: comment.author,
      data: comment.data,
      isReply,
      parent: parentDetails,
      handleModalOpen: props.handleModalOpen,
    };
    return <Comment {...commentProps} />;
  });

  return (
    <div className={props.className}>
      <form className={classes.addComment} onClick={props.handleModalOpen}>
        <textarea name="comment" placeholder="Leave a comment..." />
        <div className={classes.interact}>
          <input className={classes.cancel} type="reset" value="Cancel" />
          <input
            className={classes.submit}
            type="submit"
            value="Submit"
            disabled
          />
        </div>
      </form>
      {commentElements}
    </div>
  );
};

export default CommentSection;
