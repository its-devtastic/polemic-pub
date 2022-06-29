import React, { useCallback, useState } from "react";
import axios from "axios";

export const Context = React.createContext<IContext>({} as IContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<ISession | null>(null);

  const sendMagicLink = useCallback(
    async (data: { email: string; username?: string }) => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/passwordless/send-link`,
        data
      );
    },
    []
  );

  const submitToken = useCallback(async (token: string) => {
    const r = await axios.get<ISession>(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/passwordless/login`,
      { params: { loginToken: token } }
    );
    setSession(r.data);
  }, []);

  return (
    <Context.Provider value={{ sendMagicLink, submitToken, session }}>
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;

interface ISession {
  jwt: string;
  user: any;
}

interface IContext {
  session: ISession | null;
  sendMagicLink(data: { email: string; username?: string }): void;
  submitToken(token: string): void;
}
