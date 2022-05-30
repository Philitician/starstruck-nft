/* eslint-disable react/jsx-props-no-spreading */
import { Chakra } from "lib/components/Chakra";
import Layout from "lib/layout";
import "lib/styles/globals.css";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import { alchemyId } from "utils/constants";
import { configureChains, createClient, defaultChains, WagmiConfig } from "wagmi";
import { InjectedConnector } from 'wagmi/connectors/injected';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import defaultSEOConfig from "../../next-seo.config";

const { chains, provider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId }),
  publicProvider(),
])

const client = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Chakra>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      <WagmiConfig client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WagmiConfig>
    </Chakra>
  );
};



export default MyApp;
