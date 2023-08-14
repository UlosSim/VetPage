import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, theme } from './themes';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DarkModeContext } from './contexts/DarkModeContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { useContext } from 'react';

const App = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <RouterProvider router={routes} />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
