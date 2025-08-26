import { createTheme } from '@mui/material/styles';

const landingTheme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5', // Darker indigo for better contrast
      light: '#6366f1',
      dark: '#4338ca',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7c3aed', // Darker purple for better contrast
      light: '#8b5cf6',
      dark: '#6d28d9',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f8fafc', // Slightly darker for better contrast
    },
    text: {
      primary: '#0f172a', // Darker for better contrast
      secondary: '#334155', // Darker for better contrast
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  spacing: 8, // Base spacing unit (8px)
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
  },
});

export default landingTheme;
