import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import PostContent from "../../../components/PostContent";
import PostForm from "../../../components/PostForm";
import TopNavLink from "../../../components/TopNavLink";
import useUserInfo from "../../../hooks/useUserInfo";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const { userInfo } = useUserInfo();
  const [replies, setReplies] = useState([]);
  const [repliesLikedByMe, setRepliesLikedByMe] = useState([]);

  function fetchData() {
    axios.get("/api/posts?id=" + id).then((res) => {
      setPost(res.data.post);
    });
    axios.get("api/posts?parent=" + id).then((res) => {
      setReplies(res.data.posts);
      setRepliesLikedByMe(res.data.idsLikedByMe);
    });
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchData();
  }, [id]);

  return (
    <Layout>
      {!!post?._id && (
        <div className="px-5 py-2">
          <TopNavLink />
          <PostContent {...post} big />
        </div>
      )}
      {!!userInfo && (
        <div className="border-t border-twitterBorder py-5">
          <PostForm
            onPost={fetchData}
            parent={id}
            compact
            placeholder="Tweet your reply"
          />
        </div>
      )}
      <div className="">
        {replies.length > 0 &&
          replies.map((reply) => (
            <div className="p-5 border-t border-twitterBorder" key={reply._id}>
              <PostContent
                {...reply}
                likedByMe={repliesLikedByMe.includes(reply._id)}
              />
            </div>
          ))}
      </div>
    </Layout>
  );
}
