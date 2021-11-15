import { GetServerSideProps } from "next";
import { useAppSelector } from "src/common/hooks/reduxHooks";

import Threads from "src/features/threads/components/Thread";

const Thread: React.FC<{ threadId: string }> = (props) => {
  const threads = useAppSelector((state) => state.threadsSlice.threads);
  const [threadData] = threads.filter((thread) => thread.id === props.threadId);

  if (!threadData) return <h1>This thread does not exist</h1>;
  return <Threads {...threadData} view="full" />;
};

// remember to switch to getStaticProps once adding data fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
  const threadId = context.params!.threadId as string;

  return {
    props: {
      threadId,
    },
  };
};

export default Thread;
