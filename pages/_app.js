import Head from "next/head";

import Navigation from "../components/Navigation";

import "../styles/globals.css";

const Kopelen = ({ Component, pageProps }) => {
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

export default Kopelen;
