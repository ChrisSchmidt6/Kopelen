import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThreadType = {
  id: string;
  type: string;
  author: string;
  title: string;
  data: string;
  tags: string[];
};

type ThreadsState = {
  threads: ThreadType[];
};

const initialState: ThreadsState = {
  threads: [
    {
      id: "T1",
      type: "text",
      author: "chris",
      title: "Text Thread Preview Example",
      data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum ligula et nunc tincidunt, a egestas lorem laoreet. Vestibulum justo ex, ultricies vel luctus eu, vulputate id lorem. Vivamus posuere venenatis dolor quis condimentum. Fusce et mi suscipit, tincidunt urna ac, egestas velit. Praesent accumsan sollicitudin facilisis. Morbi pellentesque arcu id massa viverra molestie eget sit amet velit. Vestibulum suscipit arcu justo, ut mattis arcu aliquam in. Morbi est arcu, convallis at tempus id, pharetra eu purus.",
      tags: ["Text", "Ipsum", "Example", "A", "B"],
    },
    {
      id: "T2",
      type: "image",
      author: "cupe",
      title: "Image Thread Preview Example",
      data: "https://www.gannett-cdn.com/presto/2020/04/16/USAT/5b7ef814-a04d-44c8-86ef-1d47c798a1f1-Golds_gym_CharlesTown.jpg",
      tags: ["Image", "Gym", "Example", "A", "C"],
    },
    {
      id: "T3",
      type: "video",
      author: "potter",
      title: "Video Thread Preview Example",
      data: "https://www.youtube.com/watch?v=XU9Njr5ci3c",
      tags: ["Video", "Malfoy", "Example", "B", "C"],
    },
  ],
};

export const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    setThreads: (state, action: PayloadAction<ThreadType[]>) => {
      state.threads = action.payload;
    },
    addThread: (state, action: PayloadAction<ThreadType>) => {
      const newThread = action.payload;
      newThread.id = `T${Math.random().toString().slice(2)}`;
      state.threads = [...state.threads, newThread];
    },
    removeThread: (state, action: PayloadAction<string>) => {
      state.threads = [...state.threads].filter(
        (thread: ThreadType) => thread.id !== action.payload
      );
    },
  },
});

export const { setThreads, addThread, removeThread } = threadsSlice.actions;

export default threadsSlice.reducer;
