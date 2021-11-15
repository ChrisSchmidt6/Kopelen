import { useRef } from "react";
import { MdClose } from "react-icons/md";

import StyledButton from "src/common/components/UI/StyledButton";

import classes from "./TagsInput.module.css";

const TagsInput: React.FC<{
  tags: string[];
  setTags: any;
}> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = () => {
    if (inputRef) {
      const tag = inputRef.current!.value;
      const lowerCaseTags = props.tags.map(t => t.toLowerCase());
      if (
        tag &&
        tag.length > 0 &&
        props.tags.length < 9 &&
        lowerCaseTags.indexOf(tag.toLowerCase()) === -1
      ) {
        props.setTags((prevState: string[]) => {
          const newTags = [...prevState, tag];
          return newTags;
        });
        inputRef.current!.value = "";
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    if (props.tags.indexOf(tag) > -1) {
      props.setTags((prevState: string[]) => {
        const newTags = prevState.filter((oldTag) => oldTag !== tag);
        return newTags;
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.counter}>Tags: {props.tags.length}/9</div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter tag"
        onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
        disabled={props.tags.length === 9}
      />
      <StyledButton
        type="button"
        size="small"
        style={props.tags.length === 9 ? "disabled" : "clear"}
        onClick={handleAddTag}
      >
        Add
      </StyledButton>
      <div className={classes.tags}>
        {props.tags.map((tag) => (
          <span key={tag} onClick={() => handleRemoveTag(tag)}>
            <MdClose /> {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
