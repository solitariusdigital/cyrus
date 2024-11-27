import RootLayout from "../components/RootLayout";
import { StateProvider } from "../context/stateContext";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <RootLayout>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
          />
        </Head>
        <DefaultSeo
          title="Pantea Cyrus"
          description="Portfolio"
          openGraph={{
            type: "website",
            locale: "fa_IR",
            url: "https://panteapaint.com/",
            siteName: "Pantea Cyrus",
          }}
        />
        <Component {...pageProps} />
      </RootLayout>
    </StateProvider>
  );
}
