import Link from "next/link";
import { MdComment, MdEmojiEmotions, MdShare } from "react-icons/md";

import classes from "./ThreadInteractions.module.css";

const ThreadInteractions: React.FC<{
  isLiked: boolean;
  handleLike: () => void;
  view: "full" | "preview";
  id: string;
}> = (props) => {
  let likeClasses = classes.likeIcon;
  props.isLiked ? (likeClasses += ` ${classes.active}`) : null;

  const likeProps = { className: likeClasses, onClick: props.handleLike };
  return (
    <div className={classes.interact}>
      {props.view === "full" ? (
        <MdShare />
      ) : (
        <Link href={`/thread/${props.id}`} passHref>
          <MdComment />
        </Link>
      )}
      <MdEmojiEmotions {...likeProps} />
    </div>
  );
};

export default ThreadInteractions;
