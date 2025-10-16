'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

type ColorMode = 'light' | 'dark';

export const ColorModeContext = React.createContext<{
  mode: ColorMode;
  toggleColorMode: () => void;
}>({
  mode: 'dark',
  toggleColorMode: () => undefined,
});

type MuiProviderProps = {
  children: React.ReactNode;
};

/**
 * Wraps the app with MUI's cache provider so that Emotion styles
 * match between the server render and the hydrated client.
 */
const rootColorTokens: Record<ColorMode, Record<string, string>> = {
  dark: {
    '--app-background': '#0d1b2a',
    '--app-surface': '#0b2545',
    '--app-surface-muted': '#10315a',
    '--app-text-primary': '#f8fafc',
    '--app-text-secondary': '#cbd5f5',
    '--app-text-muted': '#94a3b8',
    '--app-border': 'rgba(148, 163, 184, 0.22)',
    '--app-border-strong': 'rgba(148, 163, 184, 0.35)',
    '--app-shadow': '0 18px 40px rgba(5, 20, 45, 0.45)',
    '--app-shadow-strong': '0 22px 48px rgba(5, 20, 45, 0.6)',
    '--app-card-gradient-from': 'rgba(15, 44, 79, 0.85)',
    '--app-card-gradient-to': 'rgba(29, 78, 216, 0.25)',
    '--app-chip-bg': 'rgba(148, 163, 184, 0.16)',
    '--app-chip-text': '#e2e8f0',
    '--btn-success-bg': 'rgba(16, 185, 129, 0.12)',
    '--btn-success-bg-hover': 'rgba(16, 185, 129, 0.22)',
    '--btn-success-border': 'rgba(16, 185, 129, 0.45)',
    '--btn-success-border-hover': 'rgba(16, 185, 129, 0.6)',
    '--btn-success-color': '#bbf7d0',
    '--btn-primary-bg': 'rgba(79, 70, 229, 0.16)',
    '--btn-primary-bg-hover': 'rgba(79, 70, 229, 0.28)',
    '--btn-primary-border': 'rgba(79, 70, 229, 0.45)',
    '--btn-primary-border-hover': 'rgba(79, 70, 229, 0.6)',
    '--btn-primary-color': '#e0e7ff',
    '--btn-info-bg': 'rgba(14, 165, 233, 0.14)',
    '--btn-info-bg-hover': 'rgba(14, 165, 233, 0.24)',
    '--btn-info-border': 'rgba(14, 165, 233, 0.42)',
    '--btn-info-border-hover': 'rgba(14, 165, 233, 0.58)',
    '--btn-info-color': '#bae6fd',
    '--btn-danger-bg': 'rgba(244, 63, 94, 0.15)',
    '--btn-danger-bg-hover': 'rgba(244, 63, 94, 0.26)',
    '--btn-danger-border': 'rgba(244, 63, 94, 0.42)',
    '--btn-danger-border-hover': 'rgba(244, 63, 94, 0.58)',
    '--btn-danger-color': '#fecdd3',
    '--chip-status-active-bg': 'rgba(16, 185, 129, 0.18)',
    '--chip-status-active-border': 'rgba(16, 185, 129, 0.38)',
    '--chip-status-active-text': '#bbf7d0',
    '--chip-status-active-dot': '#34d399',
    '--chip-status-inactive-bg': 'rgba(244, 63, 94, 0.2)',
    '--chip-status-inactive-border': 'rgba(244, 63, 94, 0.4)',
    '--chip-status-inactive-text': '#fecdd3',
    '--chip-status-inactive-dot': '#fb7185',
    '--chip-status-maintenance-bg': 'rgba(250, 204, 21, 0.22)',
    '--chip-status-maintenance-border': 'rgba(250, 204, 21, 0.44)',
    '--chip-status-maintenance-text': '#fde68a',
    '--chip-status-maintenance-dot': '#facc15',
  },
  light: {
    '--app-background': '#f5f7fb',
    '--app-surface': '#ffffff',
    '--app-surface-muted': '#f1f4ff',
    '--app-text-primary': '#0f172a',
    '--app-text-secondary': '#334155',
    '--app-text-muted': '#64748b',
    '--app-border': 'rgba(15, 23, 42, 0.12)',
    '--app-border-strong': 'rgba(15, 23, 42, 0.2)',
    '--app-shadow': '0 12px 28px rgba(148, 163, 184, 0.2)',
    '--app-shadow-strong': '0 16px 36px rgba(148, 163, 184, 0.28)',
    '--app-card-gradient-from': 'rgba(229, 239, 255, 0.9)',
    '--app-card-gradient-to': 'rgba(191, 219, 254, 0.6)',
    '--app-chip-bg': 'rgba(15, 23, 42, 0.08)',
    '--app-chip-text': '#0f172a',
    '--btn-success-bg': 'rgba(16, 185, 129, 0.18)',
    '--btn-success-bg-hover': 'rgba(16, 185, 129, 0.3)',
    '--btn-success-border': 'rgba(16, 185, 129, 0.48)',
    '--btn-success-border-hover': 'rgba(16, 185, 129, 0.65)',
    '--btn-success-color': '#047857',
    '--btn-primary-bg': 'rgba(79, 70, 229, 0.2)',
    '--btn-primary-bg-hover': 'rgba(79, 70, 229, 0.32)',
    '--btn-primary-border': 'rgba(79, 70, 229, 0.5)',
    '--btn-primary-border-hover': 'rgba(79, 70, 229, 0.68)',
    '--btn-primary-color': '#3730a3',
    '--btn-info-bg': 'rgba(14, 165, 233, 0.2)',
    '--btn-info-bg-hover': 'rgba(14, 165, 233, 0.32)',
    '--btn-info-border': 'rgba(14, 165, 233, 0.48)',
    '--btn-info-border-hover': 'rgba(14, 165, 233, 0.65)',
    '--btn-info-color': '#0369a1',
    '--btn-danger-bg': 'rgba(244, 63, 94, 0.18)',
    '--btn-danger-bg-hover': 'rgba(244, 63, 94, 0.3)',
    '--btn-danger-border': 'rgba(244, 63, 94, 0.48)',
    '--btn-danger-border-hover': 'rgba(244, 63, 94, 0.65)',
    '--btn-danger-color': '#b91c1c',
    '--chip-status-active-bg': 'rgba(16, 185, 129, 0.24)',
    '--chip-status-active-border': 'rgba(16, 185, 129, 0.5)',
    '--chip-status-active-text': '#046c4e',
    '--chip-status-active-dot': '#0ea47a',
    '--chip-status-inactive-bg': 'rgba(248, 113, 113, 0.24)',
    '--chip-status-inactive-border': 'rgba(248, 113, 113, 0.5)',
    '--chip-status-inactive-text': '#9f1239',
    '--chip-status-inactive-dot': '#f43f5e',
    '--chip-status-maintenance-bg': 'rgba(251, 191, 36, 0.32)',
    '--chip-status-maintenance-border': 'rgba(251, 191, 36, 0.6)',
    '--chip-status-maintenance-text': '#92400e',
    '--chip-status-maintenance-dot': '#f59e0b',
  },
};

export default function MuiProvider({ children }: MuiProviderProps) {
  const locale = useLocale();
  const isFa = locale === 'fa';

  const [mode, setMode] = React.useState<ColorMode>('dark');

  const toggleColorMode = React.useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('color-mode', next);
      }
      return next;
    });
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem('color-mode');
    if (stored === 'light' || stored === 'dark') {
      setMode(stored);
    }
  }, []);

  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    const root = document.documentElement;
    root.dataset.theme = mode;
    const tokens = rootColorTokens[mode];
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [mode]);

  const fontFamily = isFa
    ? "'IRANSansXVF','IRANSansX',Tahoma,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"
    : "'Segoe UI',Roboto,'Helvetica Neue','IRANSansXVF','IRANSansX',Arial,sans-serif";

  const theme = React.useMemo(() => {
    const paletteTokens =
      mode === 'dark'
        ? {
            background: {
              default: '#0d1b2a',
              paper: '#11243a',
            },
            text: {
              primary: '#ffffff',
              secondary: '#ccccd9',
            },
          }
        : {
            background: {
              default: '#f5f6fb',
              paper: '#ffffff',
            },
            text: {
              primary: '#0c1a30',
              secondary: '#334155',
            },
          };

    return createTheme({
      direction: isFa ? 'rtl' : 'ltr',
      palette: {
        mode,
        ...paletteTokens,
        primary: {
          main: mode === 'dark' ? '#1d4ed8' : '#1a6cf0',
        },
        secondary: {
          main: mode === 'dark' ? '#6366f1' : '#4f46e5',
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
    });
  }, [fontFamily, isFa, mode]);

  return (
    <AppRouterCacheProvider options={{ key: isFa ? 'mui-rtl' : 'mui' }}>
      <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppRouterCacheProvider>
  );
}
