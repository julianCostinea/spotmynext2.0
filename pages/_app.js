import Layout from "../hoc/Layout";
import { SideDrawerContextProvider } from "../store/SideDrawerContext";
import Backdrop from "../components/UI/Backdrop/Backdrop";
import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        async="true"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4040759685622910"
        crossorigin="anonymous"
      ></Script>
      <Layout>
        <SideDrawerContextProvider>
          <Backdrop />
          <Component {...pageProps} />
        </SideDrawerContextProvider>
      </Layout>
    </>
  );
}

export default MyApp;
