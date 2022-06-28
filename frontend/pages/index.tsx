import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
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
        <div className="text-slate-400 select-none">Coming soon</div>
      </div>
    </>
  );
};

export default Home;
