import Head from "next/head";
import Header from "./Header";
import AppContextProvider from "../contexts/AppContext";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>picks</title>
      </Head>
      <AppContextProvider>
        <Header />
        <main>{children}</main>
      </AppContextProvider>
    </>
  );
}
