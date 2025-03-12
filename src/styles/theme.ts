import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2.25rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.25,
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      letterSpacing: '-0.005em',
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0',
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0',
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
      lineHeight: 1.57,
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#64748B', // Blue-grey primary color
      light: '#94A3B8',
      dark: '#475569',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E2E8F0', // Light blue-grey secondary color
      light: '#F1F5F9',
      dark: '#CBD5E1',
      contrastText: '#334155',
    },
    error: {
      main: '#F04438', // Red accent color
      light: '#FEE4E2',
      dark: '#B42318',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#12B76A', // Green for success states
      light: '#D1FADF',
      dark: '#027A48',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F79009', // Orange for warnings
      light: '#FEF0C7',
      dark: '#B54708',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#475569', // Darker blue-grey for info
      light: '#CBD5E1',
      dark: '#334155',
      contrastText: '#FFFFFF',
    },
    grey: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
    background: {
      default: '#F8FAFC', // Very light blue-grey background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#334155', // Dark blue-grey for primary text
      secondary: '#64748B', // Medium blue-grey for secondary text
      disabled: '#94A3B8', // Light blue-grey for disabled text
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(16, 24, 40, 0.05)',
    '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
    '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
    '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
    '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
    '0px 24px 32px -8px rgba(16, 24, 40, 0.08), 0px 8px 16px -8px rgba(16, 24, 40, 0.04)',
    '0px 32px 48px -8px rgba(16, 24, 40, 0.12), 0px 16px 24px -8px rgba(16, 24, 40, 0.04)',
    '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
    '0px 48px 80px -16px rgba(16, 24, 40, 0.18)',
    '0px 64px 96px -20px rgba(16, 24, 40, 0.2)',
    '0px 80px 120px -24px rgba(16, 24, 40, 0.22)',
    '0px 96px 160px -32px rgba(16, 24, 40, 0.24)',
    '0px 112px 192px -36px rgba(16, 24, 40, 0.26)',
    '0px 128px 224px -40px rgba(16, 24, 40, 0.28)',
    '0px 144px 256px -44px rgba(16, 24, 40, 0.3)',
    '0px 160px 320px -48px rgba(16, 24, 40, 0.32)',
    '0px 176px 384px -52px rgba(16, 24, 40, 0.34)',
    '0px 192px 448px -56px rgba(16, 24, 40, 0.36)',
    '0px 208px 512px -60px rgba(16, 24, 40, 0.38)',
    '0px 224px 576px -64px rgba(16, 24, 40, 0.4)',
    '0px 240px 640px -68px rgba(16, 24, 40, 0.42)',
    '0px 256px 704px -72px rgba(16, 24, 40, 0.44)',
    '0px 288px 768px -80px rgba(16, 24, 40, 0.46)',
    '0px 320px 832px -88px rgba(16, 24, 40, 0.48)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 8,
          padding: '10px 16px',
          fontWeight: 500,
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(100, 116, 139, 0.12)',
            color: 'rgba(100, 116, 139, 0.38)',
          },
        },
        outlined: {
          borderColor: 'rgba(100, 116, 139, 0.23)',
          '&:hover': {
            backgroundColor: 'rgba(100, 116, 139, 0.04)',
          },
          '&.Mui-disabled': {
            borderColor: 'rgba(100, 116, 139, 0.12)',
            color: 'rgba(100, 116, 139, 0.38)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(100, 116, 139, 0.04)',
          },
        },
        containedPrimary: {
          backgroundColor: '#64748B',
          '&:hover': {
            backgroundColor: '#475569',
          },
        },
        containedError: {
          backgroundColor: '#F04438',
          '&:hover': {
            backgroundColor: '#C01D12',
          },
        },
        outlinedPrimary: {
          color: '#64748B',
          borderColor: '#64748B',
          '&:hover': {
            backgroundColor: 'rgba(100, 116, 139, 0.04)',
            borderColor: '#475569',
          },
        },
        outlinedError: {
          color: '#F04438',
          borderColor: '#F04438',
          '&:hover': {
            backgroundColor: 'rgba(240, 68, 56, 0.04)',
            borderColor: '#C01D12',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
          borderRadius: 12,
          border: '1px solid #EAECF0',
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
          borderRadius: 12,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#EAECF0',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#EAECF0',
          padding: '12px 16px',
        },
        head: {
          backgroundColor: '#F9FAFB',
          color: '#667085',
          fontWeight: 500,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          lineHeight: 1.5,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#F9FAFB',
          },
          '&.Mui-selected': {
            backgroundColor: '#F2F4F7',
            '&:hover': {
              backgroundColor: '#EAECF0',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: '0.75rem',
        },
        filled: {
          backgroundColor: '#F1F5F9',
          color: '#334155',
        },
        outlined: {
          borderColor: '#CBD5E1',
          color: '#334155',
        },
        colorPrimary: {
          backgroundColor: '#64748B',
          color: '#fff',
          '&.MuiChip-outlined': {
            backgroundColor: 'transparent',
            color: '#64748B',
            borderColor: '#64748B',
          },
        },
        colorError: {
          backgroundColor: '#F04438',
          color: '#fff',
          '&.MuiChip-outlined': {
            backgroundColor: 'transparent',
            color: '#F04438',
            borderColor: '#F04438',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: 8,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#CBD5E1',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#94A3B8',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#64748B',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F04438',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: 36,
          padding: '8px 12px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minHeight: 48,
          fontWeight: 500,
          color: '#64748B',
          '&.Mui-selected': {
            color: '#334155',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#F04438', // Red accent color for tab indicator
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          borderRadius: 8,
          backgroundColor: 'white',
        },
      },
    },
  },
});

export default theme;
