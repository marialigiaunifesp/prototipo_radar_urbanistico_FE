import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light50: '#e5f1f0',
      light100: '#bfe0df',
      light: '#92c0ba',
      main: '#77B1A9',
      dark500: '#609994',
      dark: '#537b76',

    },
    secondary: {
      light50: '#f9f0dc',
      light: '#f0d9a8',
      main: '#E6C16F',
      dark: '#dda832',
      dark400: '#d79600',
    },
    background: {
      default: '#fdfaf2',
    },
  },
});

export default theme;
