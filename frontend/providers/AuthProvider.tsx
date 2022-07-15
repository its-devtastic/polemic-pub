import React, { useCallback, useState } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { useEffectOnce } from "react-use";

import axios from "~/utils/axios";

export const Context = React.createContext<IContext>({} as IContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [jwt, setJwt] = useState<Jwt | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const sendMagicLink = useCallback(
    async (data: { email: string; username?: string }) => {
      await axios.post(`/auth/once`, data);
    },
    []
  );

  const submitToken = useCallback(async (token: string) => {
    const r = await axios.post<{ accessToken: Jwt }>(`/auth/jwt`, {
      token,
    });
    const { accessToken } = r.data;
    setJwt(accessToken);
    setUser(jwt_decode(accessToken));
    localStorage.setItem("polemic.jwt", accessToken);
  }, []);

  // Restore JWT token from local storage
  useEffectOnce(() => {
    const accessToken = localStorage.getItem("polemic.jwt") ?? null;

    if (accessToken) {
      setJwt(accessToken);
      setUser(jwt_decode(accessToken));
    }
  });

  // Store JWT token in local storage
  const logOut = useCallback(async () => {
    localStorage.removeItem("polemic.jwt");
    await router.push("/");
  }, [router]);

  return (
    <Context.Provider
      value={{
        sendMagicLink,
        submitToken,
        logOut,
        user,
        jwt,
        loggedIn: Boolean(jwt),
      }}
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
  logOut(): void;
}
