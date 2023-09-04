import Head from "next/head";
import Header from "./Header";
import MyApp from "../contexts/AppContext";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>picks</title>
      </Head>
      <MyApp>
        <Header />
        <main>{children}</main>
      </MyApp>
    </>
  );
}
