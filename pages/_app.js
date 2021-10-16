import Navigation from "../components/Navigation";

import "../styles/globals.css";

function Kopelen({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <div id="main">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default Kopelen;
