import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD700', // Gold
    },
    secondary: {
      main: '#000000', // Black
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1E1E1E', // Slightly lighter for cards
    },
    text: {
      primary: '#FFFFFF', // White text
      secondary: '#FFD700', // Gold text
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      color: '#FFFFFF',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '16px',
        },
      },
    },
  },
});

export default theme;