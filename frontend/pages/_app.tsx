import type { AppProps } from "next/app";
import "katex/dist/katex.min.css";
import "react-medium-image-zoom/dist/styles.css";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "~/styles/globals.css";
import AuthProvider from "~/providers/AuthProvider";
import HttpProvider from "~/providers/HttpProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <HttpProvider>
        <Component {...pageProps} />
      </HttpProvider>
    </AuthProvider>
  );
}

export default MyApp;
