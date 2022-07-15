import React from "react";
import Head from "next/head";

const Screen: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{`PolemicPub - ${title}`}</title>
      </Head>
      <div className="font-sans text-slate-900 flex flex-col min-h-screen w-full">
        {children}
      </div>
    </>
  );
};

export default Screen;
