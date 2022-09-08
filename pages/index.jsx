import { useSession } from "next-auth/react";
import { PostForm } from "../components/PostForm";
import UsernameForm from "../components/UsernameForm";
import useUserInfo from "../hooks/useUserInfo";

export default function Home() {
  const { data: session } = useSession();
  const { userInfo, setUserInfo, status: userInfoStatus } = useUserInfo();

  if (userInfoStatus === "loading") {
    return "Loading user info...";
  }
  if (userInfo && !userInfo?.username) {
    return <UsernameForm />;
  }
  return (
    <div className="max-w-lg mx-auto border-l border-r border-twitterBorder min-h-screen">
      <h1 className="text-lg font-bold p-4">Home</h1>
      <PostForm />
    </div>
  );
}
