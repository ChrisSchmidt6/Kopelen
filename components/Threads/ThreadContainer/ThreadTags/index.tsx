import { MdTag } from "react-icons/md";

const ThreadTags: React.FC<{
  className: string;
  tags: string[];
}> = (props) => {
  return (
    <div className={props.className}>
      <MdTag />
      {props.tags.map((tag) => {
        return <span>{tag}</span>;
      })}
    </div>
  );
};

export default ThreadTags;
