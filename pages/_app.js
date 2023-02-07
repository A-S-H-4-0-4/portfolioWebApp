import "../styles/globals.css";


// global context
import { AppWrapper } from "../lib/contextApi";

function MyApp({ Component, pageProps }) {

  return (
    <AppWrapper>
      <Component {...pageProps} />

    </AppWrapper>
  );
}

export default MyApp;
