import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "primereact/button";

import useAuth from "~/hooks/useAuth";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { loggedIn } = useAuth();

  return loggedIn ? (
    <>
      <Head>
        <title>PolemicPub - Dashboard</title>
      </Head>
      <div className="font-sans text-slate-900 flex flex-col items-center justify-center min-h-screen"></div>
    </>
  ) : (
    <div>Not logged in</div>
  );
};

export default Dashboard;
