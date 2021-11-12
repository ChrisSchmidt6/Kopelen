import Link from "next/link";

const ThreadTitle: React.FC<{
  id: string;
  title: string;
  view: "full" | "preview";
}> = (props) => {
  if (props.view === "full") {
    return <h2>{props.title}</h2>;
  } else {
    return (
      <Link href={`/thread/${props.id}`} passHref>
        <h4>{props.title}</h4>
      </Link>
    );
  }
};

export default ThreadTitle;
