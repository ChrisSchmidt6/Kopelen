import { useContext, useEffect } from "react";
import { NextComponentType } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

import Navigation from "src/features/navigation/components/Navigation";

import { store } from "src/common/store";
import AuthContext, {
  AuthContextProvider,
} from "src/common/store/auth-context";

import "styles/globals.css";

const Kopelen: React.FC<{
  required: { Component: NextComponentType; pageProps: any };
}> = (props) => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      authCtx.onLogin("autologin", "12345", true);
    }
  }, [true]); // Only run once by passing constant value

  const Component = props.required.Component;
  const pageProps = props.required.pageProps;

  return (
    <>
      <Head>
        <title>Kopelen</title>
        <meta name="description" content="Kopelen does things" />
      </Head>
      <Navigation />
      <main id="main">
        <Component {...pageProps} />
      </main>
      <div id="modal"></div>
    </>
  );
};

// Wrap the AuthContextProvider around _app component to handle login persistence
const WrappedKopelen = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Kopelen required={{ Component, pageProps }} />
      </Provider>
    </AuthContextProvider>
  );
};

export default WrappedKopelen;
