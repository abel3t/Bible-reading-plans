import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#457CA3'
    },
    secondary: {
      main: '#4C9196'
    },
    error: {
      main: red.A400
    }
  }
});

export default theme;
