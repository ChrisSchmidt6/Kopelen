import { GetStaticProps } from "next";

import Threads from "components/Threads/FullThreads";

type dummyThread = {
  id: string,
  type: string,
  author: string,
  title: string,
  data: string,
}

const DUMMY_DATA: dummyThread[] = [
  {
    id: "t1",
    type: "text",
    author: "chris",
    title: "Text Thread Preview Example",
    data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum ligula et nunc tincidunt, a egestas lorem laoreet. Vestibulum justo ex, ultricies vel luctus eu, vulputate id lorem. Vivamus posuere venenatis dolor quis condimentum. Fusce et mi suscipit, tincidunt urna ac, egestas velit. Praesent accumsan sollicitudin facilisis. Morbi pellentesque arcu id massa viverra molestie eget sit amet velit. Vestibulum suscipit arcu justo, ut mattis arcu aliquam in. Morbi est arcu, convallis at tempus id, pharetra eu purus.",
  },
  {
    id: "t9",
    type: "image",
    author: "cupe",
    title: "Image Thread Preview Example",
    data: "https://www.gannett-cdn.com/presto/2020/04/16/USAT/5b7ef814-a04d-44c8-86ef-1d47c798a1f1-Golds_gym_CharlesTown.jpg",
  },
  {
    id: "t10",
    type: "video",
    author: "potter",
    title: "Video Thread Preview Example",
    data: "https://www.youtube.com/watch?v=XU9Njr5ci3c",
  },
];

const Thread: React.FC<{ threadData: dummyThread }> = (props) => {
  return <Threads {...props.threadData} />;
};

export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      {
        params: {
          threadId: "t1",
        },
      },
      {
        params: {
          threadId: "t9",
        },
      },
      {
        params: {
          threadId: "t10",
        },
      },
    ],
  };
};

// simulate fetching thread information from a database
export const getStaticProps: GetStaticProps = async (context) => {
  const threadId = context.params!.threadId as string;

  // since we don't currently have any db stuff set up...
  const indexWorkaround = ["t1", "t9", "t10"];
  const threadData = DUMMY_DATA[indexWorkaround.indexOf(threadId)];

  return {
    props: {
      threadData,
    },
  };
};

export default Thread;
