import React, { useState } from 'react';
import { Box, IconButton, styled } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import Sidebar from './Sidebar';

const drawerWidth = 280;
const closedDrawerWidth = 68;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  width: `calc(100% - ${closedDrawerWidth}px)`,
  height: '100vh',
  overflow: 'auto',
  backgroundColor: theme.palette.background.default,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      
      {/* Toggle button positioned on the edge of the sidebar */}
      <Box
        sx={{
          position: 'fixed',
          left: open ? `${drawerWidth - 20}px` : `${closedDrawerWidth - 12}px`,
          top: '90px', // Moved down below the logo
          zIndex: 1300,
          transition: 'left 0.3s',
        }}
      >
        <IconButton
          onClick={toggleDrawer}
          sx={{
            backgroundColor: 'background.paper',
            boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
            border: '1px solid',
            borderColor: 'grey.200',
            color: 'error.main',
            '&:hover': { backgroundColor: 'grey.50' },
          }}
          size="small"
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      
      <Main open={open}>
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Main>
    </Box>
  );
}

export default Layout;
