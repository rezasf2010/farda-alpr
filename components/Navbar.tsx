'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale, type Pathname } from '@/i18n/routing';
import type { ElementType } from 'react';
import ColorModeToggle from '@/components/theme/ColorModeToggle';

type NavItem = {
  key: 'settings' | 'search' | 'users' | 'camera' | 'advanced';
  Icon: ElementType;
  href?: Pathname;
};

const pageItems: readonly NavItem[] = [
  { key: 'settings', Icon: SettingsOutlinedIcon },
  { key: 'search', Icon: SearchOutlinedIcon },
  { key: 'users', Icon: GroupOutlinedIcon, href: '/users' },
  { key: 'camera', Icon: VideocamOutlinedIcon },
  { key: 'advanced', Icon: TuneOutlinedIcon },
] as const;
const BRAND_NAME = 'FARDA ALPR';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = React.useTransition();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLocaleChange = (event: SelectChangeEvent<Locale>) => {
    const nextLocale = event.target.value as Locale;
    if (!nextLocale || nextLocale === locale) {
      return;
    }
    startTransition(() => {
      // @ts-expect-error -- The navigation helpers ensure params match the current route.
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Typography
            variant="h4"
            noWrap
            component={Link}
            href="/"
            locale={locale}
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {BRAND_NAME}
          </Typography>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label={t('menu.openLabel')}
              aria-controls="navbar-menu"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="navbar-menu"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pageItems.map(({ key, Icon, href }) => (
                <MenuItem
                  key={key}
                  onClick={() => {
                    handleCloseNavMenu();
                    if (href) {
                      router.push({ pathname: href }, { locale });
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Icon fontSize="small" />
                    <Typography sx={{ textAlign: 'center' }}>{t(`pages.${key}`)}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            locale={locale}
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {BRAND_NAME}
          </Typography>

          <Box
            component="nav"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'stretch',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            {pageItems.map(({ key, Icon, href }) => (
              <Button
                key={key}
                onClick={() => {
                  if (href) {
                    router.push({ pathname: href }, { locale });
                  }
                }}
                sx={{
                  flex: 1,
                  my: 1,
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textTransform: 'none',
                  gap: 0.75,
                  minWidth: 0,
                }}
              >
                <Icon sx={{ fontSize: 28 }} />
                <Typography component="span" variant="body2">
                  {t(`pages.${key}`)}
                </Typography>
              </Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ColorModeToggle title={t('theme.toggle')} />
            <FormControl
              size="small"
              variant="outlined"
              sx={{ minWidth: 120, ml: { xs: 0, md: 1 } }}
            >
              <InputLabel id="language-select-label">{t('language.label')}</InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={locale}
                label={t('language.label')}
                disabled={isPending}
                onChange={handleLocaleChange}
              >
                {routing.locales.map((option) => (
                  <MenuItem key={option} value={option}>
                    {t(`language.options.${option}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
