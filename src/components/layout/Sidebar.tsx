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
  Tooltip,
  LinearProgress,
  Button,
  Alert
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Restaurant as FoodIcon,
  Notifications as AlertsIcon,
  LocalShipping as SuppliersIcon,
  Receipt as RecipesIcon,
  Settings as SettingsIcon,
  Assessment as ReportsIcon,
  Help as HelpIcon,
  Warning as WarningIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  LocationOn as LocationsIcon,
  ShoppingCart as PurchasesIcon,
  ExpandLess,
  ExpandMore,
  Person as PersonIcon,
  Videocam as VideocamIcon,
  Home as HomeIcon,
  Assignment as TasksIcon,
  People as UsersIcon,
  Support as SupportIcon,
  KeyboardArrowDown as ArrowDownIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
// Using logo from public directory

const drawerWidth = 320;
const closedDrawerWidth = 80;

// Untitled UI Color Palette
const colors = {
  oxfordBlue: '#002147',
  greyBlue: '#475569',
  lightGreyBlue: '#64748B',
  veryLightGreyBlue: '#94A3B8',
  paleGreyBlue: '#CBD5E1',
  white: '#FFFFFF',
  lightGrey: '#F8FAFC',
  mediumGrey: '#F1F5F9',
  borderGrey: '#E4E7EC',
  textPrimary: '#101828',
  textSecondary: '#667085',
  textTertiary: '#98A2B3',
  success: '#16a34a',
  warning: '#d97706',
  error: '#dc2626',
  purple: '#7C3AED'
};

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  backgroundColor: colors.lightGrey,
  border: `1px solid ${colors.borderGrey}`,
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(2),
  '&:hover': {
    borderColor: colors.textTertiary,
  },
  '&:focus-within': {
    borderColor: colors.oxfordBlue,
    backgroundColor: colors.white,
  },
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
  color: colors.textPrimary,
  fontSize: '14px',
  fontWeight: 400,
  '& .MuiInputBase-input': {
    padding: '10px 12px 10px 0',
    paddingLeft: '40px',
    transition: theme.transitions.create('width'),
    width: '100%',
    '&::placeholder': {
      color: colors.textTertiary,
      fontSize: '14px',
    },
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 20,
  '& .MuiSvgIcon-root': {
    color: colors.textSecondary,
    fontSize: 20,
  },
}));

const StyledActiveListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 20,
  '& .MuiSvgIcon-root': {
    color: colors.error,
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
  padding: '16px',
  marginTop: 'auto',
  borderTop: `1px solid ${colors.borderGrey}`,
  backgroundColor: colors.white,
}));

const MenuItemButton = styled(ListItemButton)(({ theme, active }: { theme?: any; active?: boolean }) => ({
  borderRadius: '8px',
  marginBottom: '4px',
  padding: '12px 16px',
  minHeight: '44px',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: colors.lightGrey,
  },
  '& .MuiListItemText-primary': {
    fontSize: '16px',
    fontWeight: 500,
    color: colors.textPrimary,
    lineHeight: '24px',
  },
}));

const UsageCard = styled(Box)(({ theme }) => ({
  backgroundColor: colors.lightGrey,
  borderRadius: '12px',
  padding: '16px',
  margin: '16px 0',
  border: `1px solid ${colors.borderGrey}`,
}));

const UserCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  borderRadius: '8px',
  backgroundColor: colors.lightGrey,
  border: `1px solid ${colors.borderGrey}`,
  margin: '16px 0',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: colors.mediumGrey,
  },
}));

interface SidebarProps {
  open: boolean;
  toggleDrawer: () => void;
}

function Sidebar({ open, toggleDrawer }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState<{[key: string]: boolean}>({});
  const [searchValue, setSearchValue] = useState('');

  const handleItemClick = (path: string, hasSubItems: boolean = false, itemId?: string) => {
    if (hasSubItems && itemId) {
      setOpenSubmenus(prev => ({
        ...prev,
        [itemId]: !prev[itemId]
      }));
      
      // Navigate only if we're closing the submenu or it's not open yet
      if (!openSubmenus[itemId]) {
        navigate(path);
      }
    } else {
      // Always navigate for regular menu items
      navigate(path);
    }
  };
  
  // Renamed but keeping the function for compatibility with existing code

  const menuItems = [
    { text: 'Inventory Dashboard', icon: <DashboardIcon />, path: '/dashboard', hasDropdown: true },
    { text: 'Inventory Management', icon: <InventoryIcon />, path: '/inventory-analytics', hasDropdown: true, subItems: [
      { text: 'Analytics Dashboard', icon: <DashboardIcon />, path: '/inventory-analytics' },
      { text: 'Usage Tracking', icon: <InventoryIcon />, path: '/inventory-tracking' },
    ]},
    { text: 'Inventory Monitoring', icon: <VideocamIcon />, path: '/inventory-monitoring', hasDropdown: false },
    { text: 'Outlier Detection', icon: <WarningIcon />, path: '/outlier-detection', hasDropdown: false },
    { text: 'Food Items', icon: <FoodIcon />, path: '/food-items', hasDropdown: false },
    { text: 'Recipes', icon: <RecipesIcon />, path: '/recipes', hasDropdown: false },
    { text: 'Suppliers', icon: <SuppliersIcon />, path: '/suppliers', hasDropdown: false },
    { text: 'Locations', icon: <LocationsIcon />, path: '/locations', hasDropdown: false },
    { text: 'Purchases', icon: <PurchasesIcon />, path: '/purchases', hasDropdown: false },
    { text: 'Reports', icon: <ReportsIcon />, path: '/reports', hasDropdown: false },
  ];

  const bottomMenuItems = [
    { text: 'Help/Support', icon: <SupportIcon />, path: '/help' },
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
      {/* Header Section */}
      <Box sx={{ p: 3, borderBottom: `1px solid ${colors.borderGrey}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: open ? 'flex-start' : 'center', mb: 2 }}>
          <Box 
            component="img"
            src={open ? "/Africa Logo open.svg" : "/Africa Logo closed.svg"}
            alt="Africa Logo" 
            sx={{ 
              height: open ? 'auto' : 32,
              width: open ? '100%' : 32,
              maxWidth: open ? '200px' : '32px'
            }}
          />
        </Box>
      </Box>
      {/* Search Section - Only show when sidebar is open */}
      {open && (
        <Box sx={{ px: 3, pt: 2, pb: 1 }}>
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: colors.textTertiary, fontSize: 20 }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
              fullWidth
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchContainer>
        </Box>
      )}
      {/* Main Navigation */}
      <Box sx={{ flex: 1, overflowY: open ? 'auto' : 'hidden', px: open ? 3 : 1 }}>
        <List sx={{ py: 1 }}>
          {menuItems.map((item) => (
            open ? (
              item.subItems ? (
                <React.Fragment key={item.text}>
                  <ListItem disablePadding>
                    <MenuItemButton 
                      onClick={() => handleItemClick(item.path, true, item.text)}
                      sx={{ width: '100%' }}
                    >
                      <ListItemIcon sx={{ minWidth: 24, mr: 2, color: colors.textSecondary }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontSize: '16px',
                            fontWeight: 500,
                            color: colors.textPrimary
                          }
                        }}
                      />
                      {openSubmenus[item.text] ? 
                        <ExpandLess sx={{ color: colors.textTertiary, fontSize: 20 }} /> : 
                        <ArrowDownIcon sx={{ color: colors.textTertiary, fontSize: 20 }} />
                      }
                    </MenuItemButton>
                  </ListItem>
                  <Collapse in={openSubmenus[item.text]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItem key={subItem.text} disablePadding>
                          <MenuItemButton 
                            onClick={() => handleItemClick(subItem.path)}
                            sx={{ 
                              pl: 6,
                              backgroundColor: isActive(subItem.path) ? colors.lightGrey : 'transparent',
                              '&:hover': {
                                backgroundColor: colors.lightGrey,
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 20, mr: 2, color: colors.textSecondary }}>
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText 
                              primary={subItem.text}
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  color: colors.textSecondary
                                }
                              }}
                            />
                          </MenuItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ) : (
                <ListItem key={item.text} disablePadding>
                  <MenuItemButton 
                    onClick={() => handleItemClick(item.path)}
                    sx={{ 
                      width: '100%',
                      backgroundColor: isActive(item.path) ? colors.lightGrey : 'transparent',
                      '&:hover': {
                        backgroundColor: colors.lightGrey,
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 24, mr: 2, color: colors.textSecondary }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '16px',
                          fontWeight: 500,
                          color: colors.textPrimary
                        }
                      }}
                    />
                  </MenuItemButton>
                </ListItem>
              )
            ) : (
              // Closed sidebar - only show main navigation icons centered
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <MenuItemButton 
                  onClick={() => handleItemClick(item.path)}
                  sx={{ 
                    width: '100%',
                    justifyContent: 'center',
                    minHeight: 48,
                    borderRadius: '8px',
                    backgroundColor: isActive(item.path) ? colors.lightGrey : 'transparent',
                    '&:hover': {
                      backgroundColor: colors.lightGrey,
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 'auto', 
                    color: isActive(item.path) ? colors.oxfordBlue : colors.textSecondary,
                    justifyContent: 'center'
                  }}>
                    {item.icon}
                  </ListItemIcon>
                </MenuItemButton>
              </ListItem>
            )
          ))}
        </List>

        {/* Bottom Menu Items - Only show in open state */}
        {open && (
          <Box sx={{ mt: 'auto', pt: 2, borderTop: `1px solid ${colors.borderGrey}` }}>
            <List sx={{ py: 0 }}>
              {bottomMenuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <MenuItemButton 
                    onClick={() => handleItemClick(item.path)}
                    sx={{ 
                      width: '100%',
                      backgroundColor: isActive(item.path) ? colors.lightGrey : 'transparent',
                      '&:hover': {
                        backgroundColor: colors.lightGrey,
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 24, mr: 2, color: colors.textSecondary }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '16px',
                          fontWeight: 500,
                          color: colors.textPrimary
                        }
                      }}
                    />
                  </MenuItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>

      {/* Usage Card and User Profile - Only show when sidebar is open */}
      {open && (
        <>
          {/* Usage Card */}
          <Box sx={{ p: 1.5 }}>
            <UsageCard>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>
                Alert Notification
              </Typography>
              <IconButton size="small" sx={{ p: 0 }}>
                <CloseIcon sx={{ fontSize: 16, color: colors.textTertiary }} />
              </IconButton>
            </Box>
            <Typography sx={{ fontSize: '14px', color: colors.textSecondary, mb: 2, lineHeight: '20px' }}>
              Outlier detection noted in location tracking. Review required.
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={80} 
              sx={{ 
                height: 8, 
                borderRadius: 4, 
                mb: 2,
                backgroundColor: colors.borderGrey,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#EF4444',
                  borderRadius: 4
                }
              }} 
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="text" 
                size="small" 
                sx={{ 
                  fontSize: '14px', 
                  fontWeight: 500, 
                  color: colors.textSecondary,
                  textTransform: 'none',
                  p: 0,
                  minWidth: 'auto'
                }}
              >
                Dismiss
              </Button>
              <Button 
                variant="text" 
                size="small" 
                sx={{ 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  color: '#EF4444',
                  textTransform: 'none',
                  p: 0,
                  minWidth: 'auto'
                }}
              >
                Review Details
              </Button>
            </Box>
          </UsageCard>
          </Box>

          {/* User Profile Section */}
          <Box sx={{ p: 3 }}>
            <UserCard>
              <Avatar 
                src="/api/placeholder/40/40" 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  mr: 2
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  color: colors.textPrimary,
                  lineHeight: '20px'
                }}>
                  John Smith
                </Typography>
                <Typography sx={{ 
                  fontSize: '14px', 
                  color: colors.textSecondary,
                  lineHeight: '20px'
                }}>
                  Administrator
                </Typography>
              </Box>
              <LogoutIcon sx={{ color: colors.textTertiary, fontSize: 20 }} />
            </UserCard>
          </Box>
        </>
      )}
    </Drawer>
  );
}

export default Sidebar;
