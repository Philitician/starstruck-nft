import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#ec407a',
    },
    secondary: {
      main: '#cddc39',
    },
    error: {
      main: red.A400,
    },
    mode: 'dark',
  },
});

export default theme;
