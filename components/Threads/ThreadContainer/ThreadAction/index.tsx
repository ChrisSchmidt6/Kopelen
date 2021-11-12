import { MdDeleteForever, MdFlag, MdOutlinedFlag } from "react-icons/md";

import classes from "./ThreadAction.module.css";

const ThreadAction: React.FC<{
  isFlagged: boolean;
  handleFlag: () => void;
  isModerator: boolean;
}> = (props) => {
  const flagIcon = props.isFlagged ? (
    <MdFlag className={classes.flagged} />
  ) : (
    <MdOutlinedFlag />
  );
  return (
    <div className={classes.action} onClick={props.handleFlag}>
      {props.isModerator ? <MdDeleteForever /> : flagIcon}
    </div>
  );
};

export default ThreadAction;
