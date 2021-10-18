import {
  MdDeleteForever,
  MdEmojiEmotions,
  MdOutlinedFlag,
  MdShare,
} from "react-icons/md";

import CommentSection from "./CommentSection";

import classes from "./FullThreads.module.css";

const FullThreads = (props) => {
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
      <div className={classes.thread}>
        <div className={classes.author}>
          Thread by: <u>{props.author}</u>
        </div>

        <div className={classes.deleteShortcut}>
          {isModerator ? <MdDeleteForever /> : <MdOutlinedFlag />}
        </div>

        <h2>{props.title}</h2>

        <div className={classes.containerBody}>
          {props.type === "text" && <p>{props.data}</p>}
          {props.type === "image" && <img src={props.data} />}
          {props.type === "video" && handleVideo(props.data)}
        </div>
        <div className={classes.interact}>
          <div className={classes.iconButton}>
            <MdShare /> Share
          </div>
        </div>

        <div className={classes.like}>
          <div className={classes.iconButton}>
            <MdEmojiEmotions /> Like
          </div>
        </div>
      </div>

      <CommentSection className={classes.comments} />
    </>
  );
};

export default FullThreads;
