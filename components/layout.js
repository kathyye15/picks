import Head from "next/head";
import Header from "./Header";
import AppContextProvider from "../contexts/AppContext";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/png/picksIcon.png" type="image/png" />
        <title>PICKS</title>
      </Head>
      <AppContextProvider>
        <Header />
        <main>{children}</main>
      </AppContextProvider>
    </>
  );
}
