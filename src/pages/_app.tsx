import { useEffect } from "react";
import { NextComponentType } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

import Navigation from "src/features/navigation/components/Navigation";

import { store } from "src/common/store";
import { useAppDispatch } from "src/common/hooks/reduxHooks";
import { checkToken } from "src/common/store/authSlice";

import "styles/globals.css";

const Kopelen: React.FC<{
  required: { Component: NextComponentType; pageProps: any };
}> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Get fresh tokens if refresh token exists and is valid
    // pass empty callback argument
    dispatch(checkToken(() => {}));
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
    <Provider store={store}>
      <Kopelen required={{ Component, pageProps }} />
    </Provider>
  );
};

export default WrappedKopelen;
