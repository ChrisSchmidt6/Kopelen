import Link from "next/link";

import classes from "./ThreadTitle.module.css";

const ThreadTitle: React.FC<{
  id: string;
  title: string;
  view: "full" | "preview";
}> = (props) => {
  if (props.view === "full") {
    return <h2 className={classes.titleFull}>{props.title}</h2>;
  } else {
    return (
      <Link href={`/thread/${props.id}`} passHref>
        <h4 className={classes.titlePreview}>{props.title}</h4>
      </Link>
    );
  }
};

export default ThreadTitle;
