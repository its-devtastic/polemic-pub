import { Html, Head, Main, NextScript } from "next/document";

const Document = () => (
  <Html>
    <Head>
      <link rel="icon" href="/favicon.png" type="image/png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=STIX+Two+Text:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet"
      />
      <meta name="theme-color" content="#6D28D9" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
