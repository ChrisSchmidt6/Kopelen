import Link from "next/link";
import { MdComment, MdEmojiEmotions } from "react-icons/md";

import classes from "./ThreadInteractions.module.css";

const ThreadInteractions: React.FC<{
  isLiked: boolean;
  handleLike: () => void;
  view: "full" | "preview";
  id: string;
}> = (props) => {
  if (props.view === "full") {
    const likeClasses = `${classes.iconButton}${
      props.isLiked ? ` ${classes.active}` : ""
    }`;

    return (
      <div className={classes.interactFull}>
        <div className={likeClasses} onClick={props.handleLike}>
          <MdEmojiEmotions /> Like
        </div>
      </div>
    );
  } else {
    const likeClasses = props.isLiked ? classes.active : "";

    return (
      <div className={classes.interactPreview}>
        <MdEmojiEmotions className={likeClasses} onClick={props.handleLike} />
        <Link href={`/thread/${props.id}`} passHref>
          <MdComment />
        </Link>
      </div>
    );
  }
};

export default ThreadInteractions;
