'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

type MuiProviderProps = {
  children: React.ReactNode;
};

/**
 * Wraps the app with MUI's cache provider so that Emotion styles
 * match between the server render and the hydrated client.
 */
export default function MuiProvider({ children }: MuiProviderProps) {
  const locale = useLocale();
  const isFa = locale === 'fa';

  const fontFamily = isFa
    ? "'IRANSansXVF','IRANSansX',Tahoma,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"
    : "'Segoe UI',Roboto,'Helvetica Neue','IRANSansXVF','IRANSansX',Arial,sans-serif";

  const theme = React.useMemo(
    () =>
      createTheme({
        direction: isFa ? 'rtl' : 'ltr',
        palette: {
          mode: 'dark',
          background: {
            default: '#0d1b2a',
            paper: '#11243a',
          },
          text: {
            primary: '#ffffff',
          },
        },
        typography: {
          fontFamily,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                fontFamily,
              },
            },
          },
        },
      }),
    [fontFamily, isFa],
  );

  return (
    <AppRouterCacheProvider options={{ key: isFa ? 'mui-rtl' : 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
