import { useRouter } from "next/router";

import ThreadPreviews from "../components/Threads/ThreadPreviews";
import ToggleButton from "../components/ui/ToggleButton";

import classes from "./Home.module.css";

const DUMMY_DATA = [
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

const Home = () => {
  const router = useRouter();
  const query = router.query;

  let threadData = [...DUMMY_DATA];
  if (query["sort"] === "desc") threadData = threadData.reverse();

  const ThreadsBundle = threadData.map((thread) => {
    let threadCopy = { ...thread };
    // Shorten text if too long, but still pass through the original text
    if (threadCopy.type === "text" && threadCopy.data.length > 1625)
      threadCopy.data = threadCopy.data.slice(0, 1622) + "...";
    return (
      <ThreadPreviews
        key={thread.id}
        {...threadCopy}
        originalData={thread.data}
      />
    );
  });

  const handleRedirect = (url) => {
    router.push(url);
  };

  return (
    <>
      <div className={classes.buttonWrap}>
        <ToggleButton>
          <div className={classes.button}>Sort</div>
          <li onClick={() => handleRedirect("?sort=asc")}>Ascending</li>
          <li onClick={() => handleRedirect("?sort=desc")}>Descending</li>
        </ToggleButton>
        <ToggleButton>
          <div className={classes.button}>Filter</div>
          <li disabled>New</li>
          <li disabled>Trending</li>
        </ToggleButton>
      </div>
      {ThreadsBundle}
    </>
  );
};

export default Home;
