import Layout from "../components/layout";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Noto_Sans } from "next/font/google";

const noto_sans = Noto_Sans({
  weight: "400",
  subsets: ["latin"],
});

const colors = {
  brand: {
    navy: "#33658A",
    slateGray: "#7A8B99",
    cadetGray: "#91ADC2",
    coolGray: "#9BA0BC",
    thistle: "#C1B8C8",
  },
};

export const theme = extendTheme({ colors });

export default function App({ Component, pageProps }) {
  return (
    <main className={noto_sans.className}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </main>
  );
}
