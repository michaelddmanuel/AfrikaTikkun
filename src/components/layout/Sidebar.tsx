import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  List, 
  Divider, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  IconButton,
  Collapse,
  styled,
  InputBase,
  alpha,
  Typography,
  Avatar,
  Tooltip
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  LocalShipping as TruckIcon,
  Notifications as AlertsIcon,
  Videocam as CameraIcon,
  Settings as SettingsIcon,
  Assessment as ReportsIcon,
  Help as HelpIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  PlayArrow as InProgressIcon,
  CheckCircle as CompletedIcon,
  ExpandLess,
  ExpandMore,
  Person as PersonIcon
} from '@mui/icons-material';
// Using logo from public directory

const drawerWidth = 280;
const closedDrawerWidth = 68;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 8,
  backgroundColor: theme.palette.grey[50],
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(1),
  border: `1px solid ${theme.palette.grey[200]}`,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    '&::placeholder': {
      color: theme.palette.grey[500],
    },
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 42,
  '& .MuiSvgIcon-root': {
    color: theme.palette.grey[600],
    fontSize: 20,
  },
}));

const StyledActiveListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 42,
  '& .MuiSvgIcon-root': {
    color: theme.palette.error.main, // Using red accent color
    fontSize: 20,
  },
}));

const Logo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2),
}));

const UserProfileSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginTop: 'auto',
  borderTop: `1px solid ${theme.palette.grey[200]}`,
}));

interface SidebarProps {
  open: boolean;
  toggleDrawer: () => void;
}

function Sidebar({ open, toggleDrawer }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [tripsOpen, setTripsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleTripsClick = () => {
    setTripsOpen(!tripsOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Trips', icon: <TruckIcon />, path: '/trips', subItems: [
      { text: 'Trips in Progress', icon: <InProgressIcon />, path: '/trips/in-progress' },
      { text: 'Completed Trips', icon: <CompletedIcon />, path: '/trips/completed' },
    ]},
    { text: 'Alerts', icon: <AlertsIcon />, path: '/alerts' },
    { text: 'Camera Feeds', icon: <CameraIcon />, path: '/camera-feeds' },
    { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Help/Support', icon: <HelpIcon />, path: '/help' },
  ];

  const handleClearSearch = () => {
    setSearchValue('');
  };

  const isActive = (path: string) => {
    return location.pathname === path || 
      (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <Drawer
      sx={{
        width: open ? drawerWidth : closedDrawerWidth,
        flexShrink: 0,
        height: '100%',
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : closedDrawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderRight: '1px solid',
          borderColor: 'grey.200',
          overflowX: 'hidden',
          backgroundColor: 'background.paper',
          transition: 'width 0.3s ease-in-out'
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: open ? 3 : 1.5,
          py: 2,
          mb: 2
        }}
      >
        <Logo>
          <Box 
            component="img"
            src={open ? "/acei logo 44.svg" : "/ACEI Logo closed.svg"} 
            alt="AECI Logo" 
            sx={{ 
              height: open ? 45 : 40,
              display: 'block',
              transition: 'height 0.3s'
            }}
          />
        </Logo>
      </Box>
      {open && (
        <Box sx={{ px: 3, pt: 0, pb: 1 }}>
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: 'grey.500', fontSize: 20 }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              endAdornment={
                searchValue && (
                  <IconButton size="small" onClick={handleClearSearch} sx={{ mr: 1 }}>
                    <CloseIcon fontSize="small" sx={{ color: 'grey.500' }} />
                  </IconButton>
                )
              }
              fullWidth
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchContainer>
        </Box>
      )}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <List sx={{ px: open ? 2 : 1 }}>
          {menuItems.map((item) => (
            item.subItems ? (
              <React.Fragment key={item.text}>
                <ListItem disablePadding>
                  <Tooltip title={open ? '' : item.text} placement="right">
                    <ListItemButton 
                      onClick={handleTripsClick}
                      sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        py: 1,
                        px: open ? 2 : 1,
                        justifyContent: open ? 'initial' : 'center',
                        color: isActive(item.path) ? 'error.main' : 'grey.700',
                        '&:hover': {
                          bgcolor: 'grey.100',
                        },
                      }}
                    >
                      {isActive(item.path) ? (
                        <StyledActiveListItemIcon sx={{ minWidth: open ? 42 : 0, mr: open ? 3 : 0 }}>{item.icon}</StyledActiveListItemIcon>
                      ) : (
                        <StyledListItemIcon sx={{ minWidth: open ? 42 : 0, mr: open ? 3 : 0 }}>{item.icon}</StyledListItemIcon>
                      )}
                      {open && (
                        <ListItemText 
                          primary={
                            <Typography 
                              variant="body2" 
                              fontWeight={isActive(item.path) ? 600 : 500}
                            >
                              {item.text}
                            </Typography>
                          } 
                        />
                      )}
                      {open && (tripsOpen ? <ExpandLess sx={{ color: 'grey.500', fontSize: 20 }} /> : <ExpandMore sx={{ color: 'grey.500', fontSize: 20 }} />)}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
                <Collapse in={tripsOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem key={subItem.text} disablePadding>
                        <Tooltip title={open ? '' : subItem.text} placement="right">
                          <ListItemButton 
                            sx={{ 
                              pl: open ? 7 : 1,
                              borderRadius: 1,
                              py: 0.75,
                              mb: 0.5,
                              justifyContent: open ? 'initial' : 'center',
                              color: isActive(subItem.path) ? 'error.main' : 'grey.700',
                              '&:hover': {
                                bgcolor: 'grey.100',
                              },
                            }}
                            onClick={() => navigate(subItem.path)}
                          >
                            <ListItemIcon sx={{ minWidth: open ? 30 : 0, color: 'inherit', mr: open ? 2 : 0 }}>
                              {subItem.icon}
                            </ListItemIcon>
                            {open && (
                              <ListItemText 
                                primary={
                                  <Typography 
                                    variant="body2" 
                                    fontWeight={isActive(subItem.path) ? 600 : 500}
                                    fontSize="0.875rem"
                                  >
                                    {subItem.text}
                                  </Typography>
                                } 
                              />
                            )}
                          </ListItemButton>
                        </Tooltip>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : (
              <ListItem key={item.text} disablePadding>
                <Tooltip title={open ? '' : item.text} placement="right">
                  <ListItemButton 
                    onClick={() => navigate(item.path)}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      py: 1,
                      px: open ? 2 : 1,
                      justifyContent: open ? 'initial' : 'center',
                      color: isActive(item.path) ? 'error.main' : 'grey.700',
                      '&:hover': {
                        bgcolor: 'grey.100',
                      },
                    }}
                  >
                    {isActive(item.path) ? (
                      <StyledActiveListItemIcon sx={{ minWidth: open ? 42 : 0, mr: open ? 3 : 0 }}>{item.icon}</StyledActiveListItemIcon>
                    ) : (
                      <StyledListItemIcon sx={{ minWidth: open ? 42 : 0, mr: open ? 3 : 0 }}>{item.icon}</StyledListItemIcon>
                    )}
                    {open && (
                      <ListItemText 
                        primary={
                          <Typography 
                            variant="body2" 
                            fontWeight={isActive(item.path) ? 600 : 500}
                          >
                            {item.text}
                          </Typography>
                        } 
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            )
          ))}
        </List>
      </Box>
      <UserProfileSection>
        <Avatar sx={{ width: 40, height: 40, bgcolor: 'grey.100', mr: 2, border: '1px solid', borderColor: 'grey.200' }}>
          <PersonIcon sx={{ color: 'grey.600' }} />
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight={600} color="text.primary">John Smith</Typography>
          <Typography variant="caption" color="text.secondary">Administrator</Typography>
        </Box>
        <Tooltip title="Settings">
          <IconButton size="small" sx={{ ml: 'auto' }}>
            <SettingsIcon fontSize="small" sx={{ color: 'grey.500' }} />
          </IconButton>
        </Tooltip>
      </UserProfileSection>
    </Drawer>
  );
}

export default Sidebar;
