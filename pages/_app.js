import Head from "next/head";

import Navigation from "../components/Navigation";

import "../styles/globals.css";

function Kopelen({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kopelen</title>
        <meta name="description" content="Kopelen does things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div id="main">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default Kopelen;
