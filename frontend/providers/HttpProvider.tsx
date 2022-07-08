import React, { useEffect } from "react";
import { AxiosInstance } from "axios";

import axios from "~/utils/axios";
import useAuth from "~/hooks/useAuth";

export const Context = React.createContext<IContext>({} as IContext);

const HttpProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { jwt } = useAuth();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = jwt || false;
  }, [jwt]);

  return (
    <Context.Provider value={{ http: axios }}>{children}</Context.Provider>
  );
};

export default HttpProvider;

interface IContext {
  http: AxiosInstance;
}
