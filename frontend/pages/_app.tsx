import type { AppProps } from "next/app";
import "katex/dist/katex.min.css";
import "react-medium-image-zoom/dist/styles.css";

import "../styles/globals.css";

import AuthProvider from "../providers/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
