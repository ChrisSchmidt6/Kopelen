import { useContext, useState } from "react";
import {
  MdDeleteForever,
  MdEmojiEmotions,
  MdFlag,
  MdOutlinedFlag,
} from "react-icons/md";

import AuthContext from "src/common/store/auth-context";

import classes from "./Comment.module.css";

const Comment: React.FC<{
  id: string;
  author: string;
  data: string;
  isReply: boolean;
  parent?: {
    id: string;
    data: string;
  };
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

  let likeClasses = classes.likeIcon;
  isLiked ? likeClasses += ` ${classes.active}` : null;
  
  const flagIcon = isFlagged ? (
    <MdFlag className={classes.flagged} />
  ) : (
    <MdOutlinedFlag />
  );

  return (
    <div id={props.id} className={classes.comment}>
      {props.isReply && (
        <a href={`#${props.parent!.id}`} className={classes.quote}>
          &gt; {props.parent!.data}
        </a>
      )}

      <div className={classes.action} onClick={handleFlag}>
        {isModerator ? <MdDeleteForever /> : flagIcon}
      </div>

      <div className={classes.author}>{props.author}</div>

      <div className={classes.content}>{props.data}</div>

      <div className={classes.interact}>
        <MdEmojiEmotions className={likeClasses} onClick={handleLike} />
      </div>
    </div>
  );
};

export default Comment;
