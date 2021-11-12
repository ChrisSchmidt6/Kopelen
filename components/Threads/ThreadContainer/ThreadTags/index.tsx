import { MdTag } from "react-icons/md";

import classes from "./ThreadTags.module.css";

const ThreadTags: React.FC<{
  tags: string[];
}> = (props) => {
  return (
    <div className={classes.tags}>
      <MdTag />
      {props.tags.map((tag) => {
        return <span>{tag}</span>;
      })}
    </div>
  );
};

export default ThreadTags;
