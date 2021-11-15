import ThreadAction from "./ThreadAction";
import ThreadAuthor from "./ThreadAuthor";
import ThreadBody from "./ThreadBody";
import ThreadInteractions from "./ThreadInteractions";
import ThreadTags from "./ThreadTags";
import ThreadTitle from "./ThreadTitle";

import classes from "./ThreadContainer.module.css";

const ThreadContainer: React.FC<{
  id: string;
  type: "text" | "image" | "video";
  author: string;
  title: string;
  data: string;
  tags: string[];
  view: "full" | "preview";
  isModerator: boolean;
  isFlagged: boolean;
  isLiked: boolean;
  handleFlag: () => void;
  handleLike: () => void;
}> = (props) => {
  // Styling based on view prop
  const threadStyle =
    props.view === "full" ? classes.threadFull : classes.threadPreview;

  return (
    <div className={threadStyle}>
      <ThreadAuthor author={props.author} />

      <ThreadAction
        isFlagged={props.isFlagged}
        handleFlag={props.handleFlag}
        isModerator={props.isModerator}
      />

      <ThreadTitle id={props.id} title={props.title} view={props.view} />

      <ThreadBody
        type={props.type}
        title={props.title}
        data={props.data}
        view={props.view}
      />

      <ThreadTags tags={props.tags} />

      <ThreadInteractions
        isLiked={props.isLiked}
        handleLike={props.handleLike}
        view={props.view}
        id={props.id}
      />
    </div>
  );
};

export default ThreadContainer;
