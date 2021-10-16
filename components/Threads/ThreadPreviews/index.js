import {
  MdComment,
  MdDeleteForever,
  MdEmojiEmotions,
  MdOutlinedFlag,
} from "react-icons/md";

import classes from "./ThreadPreviews.module.css";

const ThreadPreviews = (props) => {
  const isModerator = false;

  const handleVideo = (link) => {
    const isYoutubeLink =
      /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/; // Check if link is a youtube link
    if (isYoutubeLink.test(link)) {
      const id = link.match(
        /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
      )[1];
      const url = `https://www.youtube.com/embed/${id}?rel=0`;
      return (
        <div className={classes.video}>
          <iframe
            title={props.title}
            src={url}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      );
    } else return <div>Error</div>;
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.author}>
          Thread by: <u>{props.author}</u>
        </div>
        <div className={classes.deleteShortcut}>
          {isModerator ? <MdDeleteForever /> : <MdOutlinedFlag />}
        </div>
        <h4>{props.title}</h4>

        <div className={classes.containerBody}>
          {props.type === "text" && <p>{props.data}</p>}
          {props.type === "image" && <img src={props.data} />}
          {props.type === "video" && handleVideo(props.data)}
        </div>

        <div className={classes.interact}>
          <MdEmojiEmotions className={classes.blueHover} />
          <MdComment />
        </div>
      </div>
    </>
  );
};

export default ThreadPreviews;
