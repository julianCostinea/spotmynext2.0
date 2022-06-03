import Layout from "../hoc/Layout";
import Head from 'next/head';
import { SideDrawerContextProvider } from "../store/SideDrawerContext";
import Backdrop from "../components/UI/Backdrop/Backdrop";
import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/logoIcon.png" />
        <meta property="og:site_name" content="Spot My Next" />
        <meta property="og:type" content="website" />
      </Head>
      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="679ed80c-18da-4ceb-8004-dd18c86b2527"
        data-blockingmode="auto"
        type="text/javascript"
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
