import { CommentType } from "./threadsSlice";

const dummyComments: CommentType[] = [
    {
      id: "C1",
      author: "chris",
      data: "Great image, cupertino!",
      parent: "thread",
      thread: "T2",
    },
    {
      id: "C2",
      author: "potter",
      data: "Muscles stand no chance aginst my wand.",
      parent: "thread",
      thread: "T2",
    },
    {
      id: "C3",
      author: "cupe",
      data: "We'll see about that...",
      parent: "C2",
      thread: "T2",
    },
    {
      id: "C4",
      author: "cupe",
      data: "What is this gibberish!?",
      parent: "thread",
      thread: "T1",
    },
    {
      id: "C5",
      author: "potter",
      data: "Ah yes, you make a great point.",
      parent: "thread",
      thread: "T1",
    },
    {
      id: "C6",
      author: "chris",
      data: "Why thank you.",
      parent: "C5",
      thread: "T1",
    },
    {
      id: "C7",
      author: "potter",
      data: "Ha ha ha potter. You crack me up.",
      parent: "thread",
      thread: "T3",
    },
    {
      id: "C8",
      author: "chris",
      data: "Are you talking to yourself..?",
      parent: "C7",
      thread: "T3",
    },
    {
      id: "C9",
      author: "cupe",
      data: "Let the man speak!",
      parent: "C8",
      thread: "T3",
    }
  ];

export default dummyComments;