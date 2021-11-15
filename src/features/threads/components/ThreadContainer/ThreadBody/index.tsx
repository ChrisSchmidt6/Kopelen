import classes from "./ThreadBody.module.css";

const ThreadBody: React.FC<{
  type: "text" | "image" | "video";
  title: string;
  data: string;
  view: "full" | "preview";
}> = (props) => {
  const videoStyle =
    props.view === "full" ? classes.videoFull : classes.videoPreview;
  const bodyStyle =
    props.view === "full" ? classes.bodyFull : classes.bodyPreview;

  const handleVideo = (link: string) => {
    const isYoutubeLink =
      /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/; // Check if link is a youtube link
    if (isYoutubeLink.test(link)) {
      const id = link.match(
        /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
      )![1];
      const url = `https://www.youtube.com/embed/${id}?rel=0`;
      return (
        <div className={videoStyle}>
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
    <div className={bodyStyle}>
      {props.type === "text" && <p>{props.data}</p>}
      {props.type === "image" && <img src={props.data} alt="Thread image" />}
      {props.type === "video" && handleVideo(props.data)}
    </div>
  );
};

export default ThreadBody;
