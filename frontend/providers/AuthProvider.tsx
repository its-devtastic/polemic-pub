import React, { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

import axios from "~/utils/axios";

export const Context = React.createContext<IContext>({} as IContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stored, setValue, removeValue] =
    useLocalStorage<string>("polemic.jwt");
  const [jwt, setJwt] = useState<Jwt | null>(stored ?? null);
  const [user, setUser] = useState<IUser | null>(null);

  const sendMagicLink = useCallback(
    async (data: { email: string; username?: string }) => {
      await axios.post(`/api/passwordless/send-link`, data);
    },
    []
  );

  const submitToken = useCallback(async (token: string) => {
    const r = await axios.get<{ jwt: Jwt; user: IUser }>(
      `/api/passwordless/login`,
      { params: { loginToken: token } }
    );
    setJwt(r.data.jwt);
    setUser(r.data.user);
  }, []);

  useEffect(() => {
    if (jwt) {
      setValue(jwt);
    } else {
      removeValue();
    }
  }, [jwt, removeValue, setValue]);

  return (
    <Context.Provider
      value={{ sendMagicLink, submitToken, user, jwt, loggedIn: Boolean(jwt) }}
    >
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;

interface IUser {
  email: string;
  username: string;
}

type Jwt = string;

interface IContext {
  jwt: Jwt | null;
  user: IUser | null;
  loggedIn: boolean;
  sendMagicLink(data: { email: string; username?: string }): void;
  submitToken(token: string): void;
}
