import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PostForm } from "../components/PostForm";
import UsernameForm from "../components/UsernameForm";
import useUserInfo from "../hooks/useUserInfo";

export default function Home() {
  const { data: session } = useSession();
  const { userInfo, setUserInfo, status: userInfoStatus } = useUserInfo();
  const [posts, setPosts] = useState([]);

  function fetchHomePosts() {
    axios.get("/api/posts").then((response) => {
      setPosts(response.data);
    });
  }

  useEffect(() => {
    fetchHomePosts();
  }, []);

  if (userInfoStatus === "loading") {
    return "Loading user info...";
  }
  if (userInfo && !userInfo?.username) {
    return <UsernameForm />;
  }

  return (
    <div className="max-w-lg mx-auto border-l border-r border-twitterBorder min-h-screen">
      <h1 className="text-lg font-bold p-4">Home</h1>
      <PostForm onPost={fetchHomePosts} />
      <div>
        {posts.length > 0 &&
          posts.map((post) => (
            <div className="border-t border-twitterBorder p-5" key={post.id}>
              {post.text}
            </div>
          ))}
      </div>
    </div>
  );
}
