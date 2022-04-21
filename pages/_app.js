import Layout from "../hoc/Layout";
import { SideDrawerContextProvider } from "../store/SideDrawerContext";
import Backdrop from "../components/UI/Backdrop/Backdrop";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <SideDrawerContextProvider>
        <Backdrop />
        <Component {...pageProps} />
      </SideDrawerContextProvider>
    </Layout>
  );
}

export default MyApp;
