import "../styles/globals.css";
import Layout from "src/components/Layout";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { CustomContainer } from "../context/CustomContext";
import { Provider } from "react-redux";
import Store from "src/app/Store";
import { StateContext } from "src/context/StateContext";
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Provider store={Store}>
        <StateContext>
          <CustomContainer>
            <Layout>
              <Component {...pageProps} />
              <Toaster />
            </Layout>
          </CustomContainer>
        </StateContext>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
