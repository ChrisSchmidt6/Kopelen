import { useRouter } from "next/router";
import { MdPostAdd } from "react-icons/md";
import { useAppSelector } from "src/common/hooks/reduxHooks";

import Threads from "src/features/threads/components/Thread";
import ToggleButton from "src/common/components/UI/ToggleButton";
import StyledButton from "src/common/components/UI/StyledButton";

import classes from "./Home.module.css";

const Home = () => {
  const router = useRouter();
  const query = router.query;

  let threadData = useAppSelector((state) => state.threadsSlice.threads);
  if (query["sort"] === "desc") threadData = [...threadData].reverse();

  const ThreadsBundle = threadData.map((thread) => {
    let threadCopy = { ...thread };
    // Shorten text if too long, but still pass through the original text
    if (threadCopy.type === "text" && threadCopy.data.length > 1625)
      threadCopy.data = threadCopy.data.slice(0, 1622) + "...";
    return <Threads key={thread.id} {...threadCopy} view="preview" />;
  });

  const handleRedirect = (url: string) => {
    router.push(url);
  };

  return (
    <>
      <div className={classes.buttonWrap}>
        <div className={classes.leftButtons}>
          <ToggleButton>
            <StyledButton>Sort</StyledButton>
            <li onClick={() => handleRedirect("?sort=asc")}>Ascending</li>
            <li onClick={() => handleRedirect("?sort=desc")}>Descending</li>
          </ToggleButton>
          <ToggleButton>
            <StyledButton>Filter</StyledButton>
            <li>New</li>
            <li>Trending</li>
          </ToggleButton>
        </div>
        <div className={classes.rightButtons}>
          <StyledButton onClick={() => handleRedirect("/create")}>
            <MdPostAdd /> Create
          </StyledButton>
        </div>
      </div>
      {ThreadsBundle}
    </>
  );
};

export default Home;
