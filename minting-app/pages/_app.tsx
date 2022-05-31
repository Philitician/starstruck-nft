import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Background from '../src/components/layout/Background';
import Navbar from '../src/components/layout/Navbar';
import { alchemyId } from '../src/constants';
import createEmotionCache from '../src/createEmotionCache';
import theme from '../src/style/theme';

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ alchemyId }), publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        'Network Error: Ensure MetaMask is connected to the same network that your contract is deployed to.'
      );
    },
  }),
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WagmiConfig client={wagmiClient}>
          <QueryClientProvider client={queryClient}>
            <Background>
              <Navbar />
              <Component {...pageProps} />
            </Background>
          </QueryClientProvider>
        </WagmiConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}
