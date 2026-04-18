import { calibre, jetbrains_mono } from "public/fonts";
import { GoogleAnalytics } from "@next/third-parties/google";
import Meta from "@/components/Meta/Meta";
import "../styles/globals.scss";
import { Analytics } from "@vercel/analytics/react";
import { GTAG } from "constants";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Meta />
      <main
        className={`${calibre.variable} font-sans ${jetbrains_mono.variable} font-mono`}
      >
        <Component {...pageProps} />
        <GoogleAnalytics gaId={GTAG} />
        <Analytics />
      </main>
    </>
  );
};

export default App;
