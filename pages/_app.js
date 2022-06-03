import Layout from "../hoc/Layout";
import { SideDrawerContextProvider } from "../store/SideDrawerContext";
import Backdrop from "../components/UI/Backdrop/Backdrop";
import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
