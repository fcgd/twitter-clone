import axios from "axios";
import { useState } from "react";
import useUserInfo from "../hooks/useUserInfo";

export const PostForm = ({ onPost }) => {
  const { userInfo, status } = useUserInfo();
  const [text, setText] = useState("");

  if (status === "loading") {
    return "";
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/posts", { text });
    setText("");
    if (onPost) {
      onPost();
    }
  };

  return (
    <form className="mx-5" onSubmit={handlePostSubmit}>
      <div className="flex">
        <div>
          <div className="rounded-full overflow-hidden w-12">
            <img
              src={userInfo?.image}
              alt="avatar"
              referrerpolicy="no-referrer"
            />
          </div>
        </div>
        <div className="grow pl-4">
          <textarea
            className="w-full p-2 bg-transparent text-twitterWhite"
            placeholder={"What's happening?"}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="text-right border-t border-twitterBorder py-2">
            <button className="bg-twitterBlue text-white px-5 py-1 rounded-full">
              Tweet
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
