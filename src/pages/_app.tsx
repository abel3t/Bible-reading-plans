import 'styles/globals.css';
import 'styles/style.css';
import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'settings/theme';
import AppLayout from './layouts';
import { Provider } from 'react-redux';
import { store } from 'settings/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width"/>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <div>
            <Provider store={store}>
              <AppLayout>
                <Component {...pageProps} />
              </AppLayout>
            </Provider>
          </div>
        </ThemeProvider>
      </>
  );
}

export default MyApp;
