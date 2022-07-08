import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "primereact/button";

import useAuth from "~/hooks/useAuth";

const Home: NextPage = () => {
  const router = useRouter();
  const { loggedIn } = useAuth();

  return (
    <>
      <Head>
        <title>PolemicPub</title>
      </Head>
      <div className="font-sans text-slate-900 flex flex-col items-center justify-center min-h-screen">
        <div className="mb-4">
          <img src="/logo.svg" alt="" className="h-12" />
        </div>
        <div className="text-slate-500 text-xl mb-12 select-none">
          A platform for sharing{" "}
          <a
            href="https://github.com/devtastic-org/polemic"
            target="_blank"
            rel="noreferrer noopener nofollow"
            className="text-slate-600"
          >
            Polemic
          </a>{" "}
          documents
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={() => router.push(loggedIn ? "/dashboard" : "/signup")}
            className="p-button-outlined"
          >
            {loggedIn ? "Go to account" : "Create account"}
          </Button>
          {!loggedIn && (
            <Button
              onClick={() => router.push("/login")}
              className="p-button-text"
            >
              Log in
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
