import type { NextPage } from "next";

import Screen from "~/components/Screen";
import AppHeader from "~/components/AppHeader";

const Dashboard: NextPage = () => {
  return (
    <Screen title="Dashboard">
      <AppHeader />
      <div className="bg-slate-50 flex-1">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-slate-700 select-none mt-6 mb-1">
            Projects
          </h1>
          <div className="text-sm text-slate-400 select-none">
            Your published Polemic projects appear here
          </div>
          <div className="mt-24 shadow-lg shadow-slate-900/5 bg-white p-4 rounded-md">
            <div className="text-lg font-semibold select-none text-slate-700 mb-6">
              Publish your first document
            </div>
            <ul className="text-slate-500 space-y-4">
              <li>
                <i className="pi pi-chevron-right mr-2" />
                Install{" "}
                <a className="text-indigo-600" href="https://nodejs.org">
                  Node.js
                </a>
              </li>
              <li>
                <i className="pi pi-chevron-right mr-2" />
                Install the Polemic CLI{" "}
                <code className="font-mono inline-block rounded-sm bg-slate-100 text-slate-600 px-1">
                  npm i -g polemic
                </code>
              </li>
              <li>
                <i className="pi pi-chevron-right mr-2" />
                Create a new project
                <code className="font-mono inline-block rounded-sm bg-slate-100 text-slate-600 px-1">
                  polemic create my-article
                </code>
              </li>
              <li>
                <i className="pi pi-chevron-right mr-2" />
                Run{" "}
                <code className="font-mono inline-block rounded-sm bg-slate-100 text-slate-600 px-1">
                  polemic publish
                </code>{" "}
                inside your project
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Screen>
  );
};

export default Dashboard;
