import UsernameForm from "../components/UsernameForm";
import useUserInfo from "../hooks/useUserInfo";

export default function Home() {
  const { userInfo, status: userInfoStatus } = useUserInfo;

  if (userInfoStatus === "loading") {
    return "Loading user info...";
  }
  if (userInfo && !userInfo?.username) {
    return <UsernameForm />;
  }

  return <div>Home</div>;
}
