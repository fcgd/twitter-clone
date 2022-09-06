import { getProviders, signIn } from "next-auth/react";

export default function LoginPage({ providers }) {
  return (
    <div className="flex items-center justify-center h-screen">
      {Object.values(providers).map((provider) => (
        <div>
          <button
            className="bg-twitterWhite pl-3 pr-4 py-2 text-black rounded-full flex items-center gap-2"
            onClick={async () => {
              await signIn(provider.id);
            }}
          >
            <img src="/google.png" alt="" className="h-6" />
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
