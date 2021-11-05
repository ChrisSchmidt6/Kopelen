import { useContext, useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import Navigation from "../components/Navigation";

import AuthContext, { AuthContextProvider } from "store/auth-context";

import "../styles/globals.css";
import { NextComponentType } from "next";

const Kopelen: React.FC<{
  required: { Component: NextComponentType; pageProps: any };
}> = (props) => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      authCtx.onLogin("autologin", "12345", true);
    }
  }, []);

  const Component = props.required.Component;
  const pageProps = props.required.pageProps;

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
      <Navigation />
      <div id="main">
        <Component {...pageProps} />
      </div>
    </>
  );
};

// Wrap the AuthContextProvider around _app component to handle login persistence
const WrappedKopelen = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthContextProvider>
      <Kopelen required={{ Component, pageProps }} />
    </AuthContextProvider>
  );
};

export default WrappedKopelen;
