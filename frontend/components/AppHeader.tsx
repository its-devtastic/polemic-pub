import React, { useRef } from "react";
import Image from "next/image";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";

import useAuth from "~/hooks/useAuth";

const AppHeader: React.FC = () => {
  const { logOut, user } = useAuth();
  const menuEl = useRef<Menu>(null);

  return (
    <div className="px-4 py-2 flex justify-between border-b border-slate-300">
      <div className="inline-flex">
        <Image alt="" src="/icon.png" width={42} height={42} />
      </div>
      <div className="flex items-center space-x-2">
        <Avatar
          label={user?.username[0].toUpperCase()}
          className="select-none cursor-pointer"
          onClick={(event) => menuEl.current?.toggle(event)}
        />
        <Menu
          model={[
            {
              label: `@${user?.username} (${user?.email})`,
              className: "text-sm font-semibold text-slate-700 select-none",
              items: [
                {
                  icon: "pi pi-sign-out",
                  label: "Log out",
                  command() {
                    logOut();
                  },
                },
              ],
            },
          ]}
          popup
          ref={menuEl}
        />
      </div>
    </div>
  );
};

export default AppHeader;
