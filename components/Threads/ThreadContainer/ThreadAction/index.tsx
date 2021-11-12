import { MdDeleteForever, MdFlag, MdOutlinedFlag } from "react-icons/md";

const ThreadAction: React.FC<{
  isFlagged: boolean;
  className: { action: string; flagged: string };
  handleFlag: () => void;
  isModerator: boolean;
}> = (props) => {
  const flagIcon = props.isFlagged ? (
    <MdFlag className={props.className.flagged} />
  ) : (
    <MdOutlinedFlag />
  );
  return (
    <div className={props.className.action} onClick={props.handleFlag}>
      {props.isModerator ? <MdDeleteForever /> : flagIcon}
    </div>
  );
};

export default ThreadAction;
