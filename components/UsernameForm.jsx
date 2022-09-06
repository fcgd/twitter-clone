import { useEffect, useState } from "react";
import useUserInfo from "../pages/hooks/useUserInfo";

export const UsernameForm = () => {
  const { userInfo, status } = useUserInfo();
  const [username, setUsername] = useState("");
  // console.log(userInfo);
  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (username === "") {
      const defaultUsername = userInfo?.email?.split("@")[0];
      setUsername(defaultUsername.replace(/[^a-z]+/gi, ""));
    }
  }, [status]);

  function handleFormSubmit(e) {
    e.preventDefault();
    fetch("api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
  }

  if (status === "loading") {
    return "";
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="text-center" onSubmit={handleFormSubmit}>
        <h1 className="text-xl mb-2">Pick a username</h1>
        <input
          type="text"
          placeholder={"username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block mb-1 bg-twitterBorder px-3 py-1 rounded-full"
        />
        <button className="block bg-twitterBlue w-full rounded-full py-1">
          Continue
        </button>
      </form>
    </div>
  );
};
