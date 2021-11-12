import Link from "next/link";

import { MdComment, MdEmojiEmotions } from "react-icons/md";

const ThreadInteractions: React.FC<{
  className: { interact: string; iconButton: string; active: string };
  isLiked: boolean;
  handleLike: () => void;
  view: "full" | "preview";
  id: string;
}> = (props) => {
  const likeClasses = `${props.className.iconButton}${
    props.isLiked ? ` ${props.className.active}` : ""
  }`;
  if (props.view === "full") {
    return (
      <div className={props.className.interact}>
        <div className={likeClasses} onClick={props.handleLike}>
          <MdEmojiEmotions /> Like
        </div>
      </div>
    );
  } else {
    return (
      <div className={props.className.interact}>
        <MdEmojiEmotions className={likeClasses} onClick={props.handleLike} />
        <Link href={`/thread/${props.id}`} passHref>
          <MdComment />
        </Link>
      </div>
    );
  }
};

export default ThreadInteractions;
