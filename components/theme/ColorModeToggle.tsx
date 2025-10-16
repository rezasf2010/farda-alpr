'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { ColorModeContext } from '@/components/MuiProvider';

type ColorModeToggleProps = {
  size?: 'small' | 'medium' | 'large';
  title?: string;
};

export default function ColorModeToggle({ size = 'medium', title }: ColorModeToggleProps) {
  const { mode, toggleColorMode } = React.useContext(ColorModeContext);
  const isDark = mode === 'dark';

  return (
    <Tooltip title={title ?? (isDark ? 'Switch to light mode' : 'Switch to dark mode')}>
      <IconButton
        color="inherit"
        onClick={toggleColorMode}
        aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
        size={size}
      >
        {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
}
