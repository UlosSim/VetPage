import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ed6c02',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: { main: '#ed6c02' },
    mode: 'dark',
  },
});
