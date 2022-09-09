import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import { Avatar } from "./Avatar";

export const PostContent = ({ text, author, createdAt, _id, big = false }) => {
  return (
    <div>
      <div className="flex">
        <div>{!!author?.image && <Avatar src={author.image} />}</div>
        <div className="pl-2">
          <div className="">
            <span className="font-bold pr-1">{author.name}</span>
            {big && <br />}
            <span className="text-twitterLightGray">@{author.username}</span>
            {!big && (
              <span className="pl-1 text-twitterLightGray">
                <ReactTimeAgo date={createdAt} timeStyle={"twitter"} />
              </span>
            )}
          </div>
          {!big && (
            <div>
              <Link href={`/${author.username}/status/${_id}`}>{text}</Link>
            </div>
          )}
        </div>
      </div>
      {big && (
        <div className="mt-2">
          <Link href={`/${author.username}/status/${_id}`}>{text}</Link>
          <div className="text-twitterLightGray text-sm">
            {new Date(createdAt)
              .toISOString()
              .replace("T", " ")
              .slice(0, 16)
              .split(" ")
              .reverse()
              .join(" ")}
          </div>
        </div>
      )}
    </div>
  );
};
