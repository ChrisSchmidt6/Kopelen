import ThreadAction from "./ThreadAction";
import ThreadAuthor from "./ThreadAuthor";
import ThreadBody from "./ThreadBody";
import ThreadInteractions from "./ThreadInteractions";
import ThreadTags from "./ThreadTags";
import ThreadTitle from "./ThreadTitle";

import fullThreadClasses from "./FullThreads.module.css";
import threadPreviewClasses from "./ThreadPreviews.module.css";

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
  const classes =
    props.view === "full" ? fullThreadClasses : threadPreviewClasses;

  return (
    <div className={classes.thread}>
      <ThreadAuthor author={props.author} />

      <ThreadAction
        isFlagged={props.isFlagged}
        handleFlag={props.handleFlag}
        isModerator={props.isModerator}
      />

      <ThreadTitle id={props.id} title={props.title} view={props.view} />

      <ThreadBody
        type={props.type}
        className={{ body: classes.containerBody, video: classes.video }}
        title={props.title}
        data={props.data}
      />

      <ThreadTags className={classes.tags} tags={props.tags} />

      <ThreadInteractions
        className={{
          interact: classes.interact,
          iconButton: classes.iconButton,
          active: classes.active,
        }}
        isLiked={props.isLiked}
        handleLike={props.handleLike}
        view={props.view}
        id={props.id}
      />
    </div>
  );
};

export default ThreadContainer;
