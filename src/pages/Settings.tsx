import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Paper,
  Switch,
  FormControlLabel,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  Tooltip,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Security as SecurityIcon,
  VolumeUp as VolumeUpIcon,
  Speed as SpeedIcon,
  Map as MapIcon,
  DataUsage as DataUsageIcon,
  AccountCircle as AccountCircleIcon,
  Save as SaveIcon
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [smsNotificationsEnabled, setSmsNotificationsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mapStyle, setMapStyle] = useState('standard');
  const [dataUsage, setDataUsage] = useState('balanced');
  const [refreshRate, setRefreshRate] = useState(30);
  const [language, setLanguage] = useState('english');
  const [cameraQuality, setCameraQuality] = useState('medium');
  const [alertVolume, setAlertVolume] = useState(75);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSaveSettings = () => {
    // Here you would save settings to the backend
    console.log('Saving settings...');
    setShowSavedMessage(true);
  };

  const handleCloseSnackbar = () => {
    setShowSavedMessage(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Settings
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<SaveIcon />}
          onClick={handleSaveSettings}
        >
          Save Changes
        </Button>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ display: 'flex' }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={activeTab}
          onChange={handleTabChange}
          sx={{ 
            borderRight: 1, 
            borderColor: 'divider',
            minWidth: 200,
            '& .MuiTab-root': {
              alignItems: 'flex-start',
              textAlign: 'left',
              pl: 2
            }
          }}
        >
          <Tab 
            icon={<AccountCircleIcon />} 
            iconPosition="start" 
            label="Account" 
          />
          <Tab 
            icon={<NotificationsIcon />} 
            iconPosition="start" 
            label="Notifications" 
          />
          <Tab 
            icon={<PaletteIcon />} 
            iconPosition="start" 
            label="Appearance" 
          />
          <Tab 
            icon={<MapIcon />} 
            iconPosition="start" 
            label="Map Settings" 
          />
          <Tab 
            icon={<LanguageIcon />} 
            iconPosition="start" 
            label="Language" 
          />
          <Tab 
            icon={<DataUsageIcon />} 
            iconPosition="start" 
            label="Data Usage" 
          />
          <Tab 
            icon={<SpeedIcon />} 
            iconPosition="start" 
            label="Performance" 
          />
          <Tab 
            icon={<SecurityIcon />} 
            iconPosition="start" 
            label="Security" 
          />
        </Tabs>
        
        <Box sx={{ flexGrow: 1 }}>
          {/* Account Settings */}
          <TabPanel value={activeTab} index={0}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Account Information
            </Typography>
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    defaultValue="John Doe"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    defaultValue="Fleet Manager"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company"
                    defaultValue="ACEI Mining Corporation"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
            
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Preferences
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    color="primary"
                  />
                }
                label="Dark Mode"
              />
            </Paper>
          </TabPanel>
          
          {/* Notification Settings */}
          <TabPanel value={activeTab} index={1}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Notifications
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Enable Notifications" 
                    secondary="Receive alerts and updates about truck trips"
                  />
                  <Switch 
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    color="primary"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Email Notifications" 
                    secondary="Receive notifications via email"
                  />
                  <Switch 
                    checked={emailNotificationsEnabled}
                    onChange={(e) => setEmailNotificationsEnabled(e.target.checked)}
                    disabled={!notificationsEnabled}
                    color="primary"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="SMS Notifications" 
                    secondary="Receive notifications via SMS"
                  />
                  <Switch 
                    checked={smsNotificationsEnabled}
                    onChange={(e) => setSmsNotificationsEnabled(e.target.checked)}
                    disabled={!notificationsEnabled}
                    color="primary"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Alert Volume" 
                    secondary="Volume level for alert sounds"
                  />
                  <Box sx={{ width: 180, ml: 2, display: 'flex', alignItems: 'center' }}>
                    <VolumeUpIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Slider
                      value={alertVolume}
                      onChange={(e, newValue) => setAlertVolume(newValue as number)}
                      disabled={!notificationsEnabled}
                      aria-labelledby="alert-volume-slider"
                    />
                  </Box>
                </ListItem>
              </List>
            </Paper>
          </TabPanel>
          
          {/* Appearance Settings */}
          <TabPanel value={activeTab} index={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Theme
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    color="primary"
                  />
                }
                label="Dark Mode"
              />
              
              <Typography variant="subtitle1" sx={{ mt: 3 }}>
                Color Theme
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item>
                  <Tooltip title="Purple (Default)">
                    <Box 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        bgcolor: '#6E36CA', 
                        borderRadius: '50%', 
                        cursor: 'pointer',
                        border: '2px solid #000'
                      }} 
                    />
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Blue">
                    <Box 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        bgcolor: '#1976d2', 
                        borderRadius: '50%', 
                        cursor: 'pointer' 
                      }} 
                    />
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Green">
                    <Box 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        bgcolor: '#2e7d32', 
                        borderRadius: '50%', 
                        cursor: 'pointer' 
                      }} 
                    />
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Orange">
                    <Box 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        bgcolor: '#ed6c02', 
                        borderRadius: '50%', 
                        cursor: 'pointer' 
                      }} 
                    />
                  </Tooltip>
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>
          
          {/* Map Settings */}
          <TabPanel value={activeTab} index={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Map Display
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="map-style-label">Map Style</InputLabel>
                <Select
                  labelId="map-style-label"
                  value={mapStyle}
                  label="Map Style"
                  onChange={(e) => setMapStyle(e.target.value)}
                >
                  <MenuItem value="standard">Standard</MenuItem>
                  <MenuItem value="satellite">Satellite</MenuItem>
                  <MenuItem value="terrain">Terrain</MenuItem>
                  <MenuItem value="night">Night Mode</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={true}
                    color="primary"
                  />
                }
                label="Show Traffic"
              />
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={true}
                    color="primary"
                  />
                }
                label="Show Route Markers"
              />
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={true}
                    color="primary"
                  />
                }
                label="Show Distance Metrics"
              />
            </Paper>
          </TabPanel>
          
          {/* Language Settings */}
          <TabPanel value={activeTab} index={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Language & Region
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="language-label">Language</InputLabel>
                <Select
                  labelId="language-label"
                  value={language}
                  label="Language"
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="spanish">Spanish</MenuItem>
                  <MenuItem value="french">French</MenuItem>
                  <MenuItem value="german">German</MenuItem>
                  <MenuItem value="portuguese">Portuguese</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel id="time-format-label">Time Format</InputLabel>
                <Select
                  labelId="time-format-label"
                  defaultValue="24"
                  label="Time Format"
                >
                  <MenuItem value="12">12-hour (AM/PM)</MenuItem>
                  <MenuItem value="24">24-hour</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </TabPanel>
          
          {/* Data Usage Settings */}
          <TabPanel value={activeTab} index={5}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Data Usage
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="data-usage-label">Data Saving Mode</InputLabel>
                <Select
                  labelId="data-usage-label"
                  value={dataUsage}
                  label="Data Saving Mode"
                  onChange={(e) => setDataUsage(e.target.value)}
                >
                  <MenuItem value="off">Off (Maximum Quality)</MenuItem>
                  <MenuItem value="balanced">Balanced</MenuItem>
                  <MenuItem value="save">Data Saver</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="camera-quality-label">Camera Feed Quality</InputLabel>
                <Select
                  labelId="camera-quality-label"
                  value={cameraQuality}
                  label="Camera Feed Quality"
                  onChange={(e) => setCameraQuality(e.target.value)}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
              
              <Typography gutterBottom>Automatic Download</Typography>
              <FormControlLabel
                control={
                  <Switch 
                    checked={true}
                    color="primary"
                  />
                }
                label="Download map data for offline use"
              />
            </Paper>
          </TabPanel>
          
          {/* Performance Settings */}
          <TabPanel value={activeTab} index={6}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Dashboard Performance
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography gutterBottom>Map Refresh Rate (seconds)</Typography>
              <Slider
                value={refreshRate}
                onChange={(e, newValue) => setRefreshRate(newValue as number)}
                aria-labelledby="refresh-rate-slider"
                valueLabelDisplay="auto"
                step={5}
                marks
                min={5}
                max={60}
                sx={{ mb: 3 }}
              />
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={true}
                    color="primary"
                  />
                }
                label="Enable Animations"
              />
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={true}
                    color="primary"
                  />
                }
                label="Optimize for Mobile Data"
              />
            </Paper>
          </TabPanel>
          
          {/* Security Settings */}
          <TabPanel value={activeTab} index={7}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Security & Privacy
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Password
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                sx={{ mb: 3 }}
              >
                Change Password
              </Button>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Two-Factor Authentication
              </Typography>
              <FormControlLabel
                control={
                  <Switch 
                    checked={false}
                    color="primary"
                  />
                }
                label="Enable Two-Factor Authentication"
              />
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Session
              </Typography>
              <Button 
                variant="outlined" 
                color="error"
              >
                Sign Out from All Devices
              </Button>
            </Paper>
          </TabPanel>
        </Box>
      </Box>
      
      <Snackbar
        open={showSavedMessage}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
