import { AppProps } from "next/app";
import Head from "next/head";

import Navigation from "../components/Navigation";

import { AuthContextProvider } from "store/auth-context";

import "../styles/globals.css";

const Kopelen = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Kopelen</title>
        <meta name="description" content="Kopelen does things" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Metrophobic&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AuthContextProvider>
        <Navigation />
        <div id="main">
          <Component {...pageProps} />
        </div>
      </AuthContextProvider>
    </>
  );
};

export default Kopelen;
