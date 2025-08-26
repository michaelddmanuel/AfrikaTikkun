import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Avatar,
  IconButton,
  Tooltip,
  Alert,
  Badge,
  styled,
  InputAdornment
} from '@mui/material';
import ModernTable from '../components/ModernTable';
import {
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Assessment as AssessmentIcon,
  Build as BuildIcon,
  Security as SecurityIcon,
  People as PeopleIcon,
  Kitchen as KitchenIcon,
  Warehouse as WarehouseIcon,
  Restaurant as RestaurantIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Power as EnergyIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, BarChart, Bar } from 'recharts';

// Styled components and colors
const colors = {
  oxfordBlue: '#002147',
  greyBlue: '#475569',
  success: '#16a34a',
  warning: '#d97706',
  error: '#dc2626'
};

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  backgroundColor: '#ffffff',
  border: '1px solid #e4e7ec',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  '&:hover': {
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  }
}));

// Mock data
const mockLocations = [
  {
    id: 'LOC001',
    name: 'Main Kitchen - Johannesburg',
    type: 'Kitchen',
    address: '123 Main Street, Johannesburg, 2001',
    capacity: 500,
    currentUtilization: 78,
    staff: 24,
    equipment: 15,
    lastInspection: '2024-07-15',
    inspectionScore: 95,
    energyUsage: 2450,
    status: 'Operational',
    manager: 'Sarah Johnson',
    operatingHours: '06:00 - 22:00'
  },
  {
    id: 'LOC002',
    name: 'Storage Facility - Cape Town',
    type: 'Storage',
    address: '456 Industrial Ave, Cape Town, 8001',
    capacity: 1200,
    currentUtilization: 65,
    staff: 8,
    equipment: 6,
    lastInspection: '2024-06-20',
    inspectionScore: 88,
    energyUsage: 1850,
    status: 'Operational',
    manager: 'Mike Wilson',
    operatingHours: '24/7'
  },
  {
    id: 'LOC003',
    name: 'Dining Hall - Durban',
    type: 'Dining',
    address: '789 University Road, Durban, 4001',
    capacity: 300,
    currentUtilization: 92,
    staff: 12,
    equipment: 8,
    lastInspection: '2024-08-01',
    inspectionScore: 82,
    energyUsage: 1650,
    status: 'High Utilization',
    manager: 'Lisa Chen',
    operatingHours: '07:00 - 21:00'
  }
];

const mockCapacityData = [
  { hour: '06:00', kitchen: 45, dining: 20, storage: 60 },
  { hour: '08:00', kitchen: 78, dining: 85, storage: 62 },
  { hour: '10:00', kitchen: 65, dining: 45, storage: 58 },
  { hour: '12:00', kitchen: 95, dining: 98, storage: 65 },
  { hour: '14:00', kitchen: 88, dining: 92, storage: 70 },
  { hour: '16:00', kitchen: 72, dining: 75, storage: 68 },
  { hour: '18:00', kitchen: 85, dining: 95, storage: 72 },
  { hour: '20:00', kitchen: 60, dining: 80, storage: 65 }
];

const mockMaintenanceSchedule = [
  {
    id: 'MAINT001',
    location: 'Main Kitchen - Johannesburg',
    equipment: 'Industrial Oven #3',
    type: 'Preventive',
    scheduledDate: '2024-09-15',
    priority: 'Medium',
    estimatedDuration: '4 hours',
    technician: 'John Smith',
    status: 'Scheduled'
  },
  {
    id: 'MAINT002',
    location: 'Storage Facility - Cape Town',
    equipment: 'Refrigeration Unit #2',
    type: 'Emergency',
    scheduledDate: '2024-08-30',
    priority: 'High',
    estimatedDuration: '6 hours',
    technician: 'Mike Johnson',
    status: 'In Progress'
  }
];

const mockSafetyMetrics = [
  { location: 'Main Kitchen', incidents: 2, inspectionScore: 95, complianceRate: 98 },
  { location: 'Storage Facility', incidents: 0, inspectionScore: 88, complianceRate: 94 },
  { location: 'Dining Hall', incidents: 1, inspectionScore: 82, complianceRate: 91 }
];

const mockEnergyUsage = [
  { month: 'Jan', kitchen: 2200, storage: 1600, dining: 1400 },
  { month: 'Feb', kitchen: 2350, storage: 1750, dining: 1500 },
  { month: 'Mar', kitchen: 2100, storage: 1650, dining: 1350 },
  { month: 'Apr', kitchen: 2450, storage: 1850, dining: 1650 },
  { month: 'May', kitchen: 2300, storage: 1700, dining: 1550 },
  { month: 'Jun', kitchen: 2400, storage: 1800, dining: 1600 }
];

export default function Locations() {
  const [tabValue, setTabValue] = useState(0);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational': return 'success';
      case 'High Utilization': return 'warning';
      case 'Maintenance': return 'error';
      default: return 'default';
    }
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'Kitchen': return <KitchenIcon />;
      case 'Storage': return <WarehouseIcon />;
      case 'Dining': return <RestaurantIcon />;
      default: return <BusinessIcon />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Untitled UI Style Header */}
      <Box sx={{ mb: 4 }}>
        {/* Page Title Section */}
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h4" 
            sx={{
              fontWeight: 600,
              fontSize: '30px',
              lineHeight: '38px',
              color: colors.oxfordBlue,
              mb: 1
            }}
          >
            Locations
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              color: colors.greyBlue,
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 400
            }}
          >
            Monitor and manage your facility locations and operations.
          </Typography>
        </Box>

        {/* Action Bar */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 0
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              placeholder="Search locations..."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: colors.greyBlue, fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                width: 320,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#d0d5dd'
                  },
                  '&:hover fieldset': {
                    borderColor: '#98a2b3'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: colors.oxfordBlue,
                    borderWidth: '2px'
                  }
                }
              }}
            />
            <Button 
              variant="outlined" 
              startIcon={<FilterListIcon />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '14px',
                padding: '10px 16px',
                borderColor: '#d0d5dd',
                color: colors.greyBlue,
                '&:hover': {
                  backgroundColor: '#f9fafb',
                  borderColor: '#98a2b3'
                }
              }}
            >
              Filters
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button 
              variant="outlined" 
              startIcon={<DownloadIcon />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '14px',
                padding: '10px 16px',
                borderColor: '#d0d5dd',
                color: colors.greyBlue,
                '&:hover': {
                  backgroundColor: '#f9fafb',
                  borderColor: '#98a2b3'
                }
              }}
            >
              Export
            </Button>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => setLocationDialogOpen(true)}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '14px',
                padding: '10px 16px',
                backgroundColor: colors.oxfordBlue,
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#001a38'
                }
              }}
            >
              Add Location
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: colors.oxfordBlue, mb: 0.5 }}>12</Typography>
                <Typography variant="body2" sx={{ color: colors.greyBlue, fontWeight: 500 }}>Total Locations</Typography>
              </Box>
              <Box sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                backgroundColor: '#e0f2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <LocationIcon sx={{ fontSize: 20, color: '#0284c7' }} />
              </Box>
            </Box>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: colors.oxfordBlue, mb: 0.5 }}>78%</Typography>
                <Typography variant="body2" sx={{ color: colors.greyBlue, fontWeight: 500 }}>Avg Utilization</Typography>
              </Box>
              <Box sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                backgroundColor: '#fef3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AssessmentIcon sx={{ fontSize: 20, color: '#d97706' }} />
              </Box>
            </Box>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: colors.oxfordBlue, mb: 0.5 }}>44</Typography>
                <Typography variant="body2" sx={{ color: colors.greyBlue, fontWeight: 500 }}>Total Staff</Typography>
              </Box>
              <Box sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                backgroundColor: '#fee2e2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <PeopleIcon sx={{ fontSize: 20, color: '#dc2626' }} />
              </Box>
            </Box>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: colors.oxfordBlue, mb: 0.5 }}>95%</Typography>
                <Typography variant="body2" sx={{ color: colors.greyBlue, fontWeight: 500 }}>Safety Score</Typography>
              </Box>
              <Box sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <SecurityIcon sx={{ fontSize: 20, color: '#16a34a' }} />
              </Box>
            </Box>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Tabs */}
      <StyledCard sx={{ mb: 3 }}>
        <Box sx={{ p: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                color: colors.greyBlue,
                minHeight: '48px',
                padding: '12px 16px',
                '&.Mui-selected': {
                  color: colors.oxfordBlue,
                  fontWeight: 600
                },
                '&:hover': {
                  color: colors.oxfordBlue,
                  backgroundColor: 'rgba(0, 33, 71, 0.04)'
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: colors.oxfordBlue,
                height: '3px',
                borderRadius: '2px'
              },
            }}
          >
            <Tab label="Facility Management" />
            <Tab label="Capacity Analytics" />
            <Tab label="Maintenance Tracking" />
            <Tab label="Safety Monitoring" />
          </Tabs>
        </Box>
      </StyledCard>

      {/* Facility Management Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ModernTable
              title="Facility Directory"
              subtitle="Manage and monitor all facility locations"
              searchPlaceholder="Search locations..."
              data={mockLocations}
              columns={[
                { id: 'location', label: 'Location', sortable: true },
                { id: 'type', label: 'Type', sortable: true },
                { id: 'manager', label: 'Manager', sortable: true },
                { id: 'capacity', label: 'Capacity', sortable: true },
                { id: 'utilization', label: 'Utilization', sortable: true },
                { id: 'staff', label: 'Staff', sortable: true },
                { id: 'status', label: 'Status', sortable: true },
                { id: 'actions', label: 'Actions', sortable: false }
              ]}
              renderRow={(location, index) => (
                <TableRow
                  key={location.id}
                  sx={{
                    '&:hover': { backgroundColor: '#f9fafb' },
                    borderBottom: index === mockLocations.length - 1 ? 'none' : '1px solid #e4e7ec'
                  }}
                >
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Avatar sx={{ width: 40, height: 40, backgroundColor: colors.oxfordBlue, color: '#fff' }}>
                        {getLocationIcon(location.type)}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue, mb: 0.5 }}>
                          {location.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                          {location.address}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Chip 
                      label={location.type} 
                      size="small" 
                      sx={{
                        backgroundColor: '#f3f4f6',
                        color: colors.greyBlue,
                        fontWeight: 500,
                        fontSize: '12px'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue, mb: 0.5 }}>
                        {location.manager}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                        {location.operatingHours}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue, mb: 0.5 }}>
                      {location.capacity}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                      seats/units
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue, mb: 1 }}>
                        {location.currentUtilization}%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={location.currentUtilization} 
                        sx={{ height: 6, borderRadius: 3 }}
                        color={location.currentUtilization >= 90 ? 'error' : location.currentUtilization >= 70 ? 'warning' : 'success'}
                      />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                      {location.staff}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Chip 
                      label={location.status}
                      size="small"
                      sx={{
                        backgroundColor: location.status === 'Operational' ? '#dcfce7' : location.status === 'High Utilization' ? '#fef3c7' : '#fecaca',
                        color: location.status === 'Operational' ? colors.success : location.status === 'High Utilization' ? colors.warning : colors.error,
                        fontWeight: 500,
                        fontSize: '12px'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Tooltip title="View Details">
                        <IconButton 
                          size="small" 
                          onClick={() => setSelectedLocation(location)}
                          sx={{ color: colors.greyBlue, '&:hover': { color: colors.oxfordBlue } }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Location">
                        <IconButton 
                          size="small"
                          sx={{ color: colors.greyBlue, '&:hover': { color: colors.oxfordBlue } }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Location">
                        <IconButton 
                          size="small" 
                          sx={{ color: colors.greyBlue, '&:hover': { color: colors.error } }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            />
          </Grid>
        </Grid>
      )}

      {/* Capacity Analytics Tab */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Daily Utilization Patterns</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockCapacityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="kitchen" stroke="#8884d8" name="Kitchen %" />
                    <Line type="monotone" dataKey="dining" stroke="#82ca9d" name="Dining %" />
                    <Line type="monotone" dataKey="storage" stroke="#ffc658" name="Storage %" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Peak Time Analysis</Typography>
              {mockLocations.map((location, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: colors.oxfordBlue }}>{location.name.split(' - ')[0]}</Typography>
                    <Typography variant="h6" sx={{ color: colors.oxfordBlue }}>{location.currentUtilization}%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                      Capacity: {location.capacity}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                      Staff: {location.staff}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={location.currentUtilization} 
                    sx={{ height: 6, borderRadius: 3 }}
                    color={location.currentUtilization >= 90 ? 'error' : location.currentUtilization >= 70 ? 'warning' : 'success'}
                  />
                </Box>
              ))}
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {/* Maintenance Tracking Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                2 maintenance tasks scheduled for this week. 1 emergency repair in progress.
              </Typography>
            </Alert>
          </Grid>
          <Grid item xs={12} md={8}>
            <ModernTable
              title="Maintenance Schedule"
              subtitle="Track and manage maintenance tasks"
              searchPlaceholder="Search maintenance tasks..."
              data={mockMaintenanceSchedule}
              columns={[
                { id: 'taskId', label: 'Task ID', sortable: true },
                { id: 'location', label: 'Location', sortable: true },
                { id: 'equipment', label: 'Equipment', sortable: true },
                { id: 'type', label: 'Type', sortable: true },
                { id: 'scheduledDate', label: 'Scheduled Date', sortable: true },
                { id: 'priority', label: 'Priority', sortable: true },
                { id: 'status', label: 'Status', sortable: true },
                { id: 'actions', label: 'Actions', sortable: false }
              ]}
              renderRow={(task, index) => (
                <TableRow
                  key={task.id}
                  sx={{
                    '&:hover': { backgroundColor: '#f9fafb' },
                    borderBottom: index === mockMaintenanceSchedule.length - 1 ? 'none' : '1px solid #e4e7ec'
                  }}
                >
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Avatar sx={{ width: 40, height: 40, backgroundColor: colors.oxfordBlue, color: '#fff' }}>
                        <BuildIcon />
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue, mb: 0.5 }}>
                          {task.id}
                        </Typography>
                        <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                          {task.estimatedDuration}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue, mb: 0.5 }}>
                      {task.location}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                      {task.technician}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                      {task.equipment}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Chip 
                      label={task.type}
                      size="small"
                      sx={{
                        backgroundColor: task.type === 'Emergency' ? '#fecaca' : '#dbeafe',
                        color: task.type === 'Emergency' ? colors.error : '#1d4ed8',
                        fontWeight: 500,
                        fontSize: '12px'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Typography sx={{ color: colors.greyBlue }}>{task.scheduledDate}</Typography>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Chip 
                      label={task.priority}
                      size="small"
                      sx={{
                        backgroundColor: task.priority === 'High' ? '#fecaca' : task.priority === 'Medium' ? '#fef3c7' : '#dcfce7',
                        color: task.priority === 'High' ? colors.error : task.priority === 'Medium' ? colors.warning : colors.success,
                        fontWeight: 500,
                        fontSize: '12px'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Chip 
                      label={task.status}
                      size="small"
                      sx={{
                        backgroundColor: task.status === 'In Progress' ? '#fef3c7' : '#f3f4f6',
                        color: task.status === 'In Progress' ? colors.warning : colors.greyBlue,
                        fontWeight: 500,
                        fontSize: '12px'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      sx={{
                        borderColor: colors.oxfordBlue,
                        color: colors.oxfordBlue,
                        '&:hover': {
                          backgroundColor: colors.oxfordBlue,
                          color: 'white'
                        }
                      }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Equipment Status</Typography>
              {mockLocations.map((location, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: colors.oxfordBlue }}>{location.name.split(' - ')[0]}</Typography>
                    <Typography variant="body2" sx={{ color: colors.oxfordBlue }}>{location.equipment} units</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: colors.success }}>
                      {Math.floor(location.equipment * 0.8)} operational
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.warning }}>
                      {location.equipment - Math.floor(location.equipment * 0.8)} maintenance
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={80} 
                    sx={{ height: 6, borderRadius: 3 }}
                    color="success"
                  />
                </Box>
              ))}
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {/* Safety Monitoring Tab */}
      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Safety Compliance Scores</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockSafetyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="inspectionScore" fill="#4caf50" name="Inspection Score" />
                    <Bar dataKey="complianceRate" fill="#2196f3" name="Compliance Rate" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Energy Usage Trends</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockEnergyUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="kitchen" stroke="#ff6b6b" name="Kitchen (kWh)" />
                    <Line type="monotone" dataKey="storage" stroke="#4ecdc4" name="Storage (kWh)" />
                    <Line type="monotone" dataKey="dining" stroke="#45b7d1" name="Dining (kWh)" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </StyledCard>
          </Grid>
          <Grid item xs={12}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Inspection History</Typography>
              {mockLocations.map((location, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: colors.oxfordBlue }}>{location.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h6" sx={{ color: colors.oxfordBlue, mr: 1 }}>
                        {location.inspectionScore}%
                      </Typography>
                      {location.inspectionScore >= 90 ? (
                        <CheckCircleIcon color="success" />
                      ) : location.inspectionScore >= 80 ? (
                        <WarningIcon color="warning" />
                      ) : (
                        <WarningIcon color="error" />
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                      Last inspection: {location.lastInspection}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                      Energy usage: {location.energyUsage} kWh/month
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={location.inspectionScore} 
                    sx={{ height: 6, borderRadius: 3 }}
                    color={location.inspectionScore >= 90 ? 'success' : location.inspectionScore >= 80 ? 'warning' : 'error'}
                  />
                </Box>
              ))}
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {/* Add/Edit Location Dialog */}
      <Dialog open={locationDialogOpen} onClose={() => setLocationDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Location</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Location Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select label="Type">
                  <MenuItem value="kitchen">Kitchen</MenuItem>
                  <MenuItem value="storage">Storage</MenuItem>
                  <MenuItem value="dining">Dining</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Capacity" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Staff Count" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Equipment Count" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Manager Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Operating Hours" variant="outlined" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLocationDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setLocationDialogOpen(false)}>
            Add Location
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
