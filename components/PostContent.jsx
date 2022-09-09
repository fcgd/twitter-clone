import ReactTimeAgo from "react-time-ago";
import { Avatar } from "./Avatar";

export const PostContent = ({ text, author, createdAt }) => {
  return (
    <div className="flex">
      <div>
        <Avatar src={author.image} />
      </div>
      <div className="pl-2">
        <div className="">
          <span className="">{author.name}</span>
          <span className="pl-1 text-twitterLightGray">{author.username}</span>
          <span className="pl-1 text-twitterLightGray">
            <ReactTimeAgo date={createdAt} timeStyle={"twitter"} />
          </span>
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
};
