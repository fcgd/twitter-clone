import { UsernameForm } from "../components/UsernameForm";
import useUserInfo from "./hooks/useUserInfo";

export default function Home() {
  const { userInfo, status: userInfoStatus } = useUserInfo;

  if (userInfoStatus === "loading") {
    return <div>Loading user info...</div>;
  }
  if (!userInfo?.username) {
    return <UsernameForm />;
  }

  return <div>Home</div>;
}
