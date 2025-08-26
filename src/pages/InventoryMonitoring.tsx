import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
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
  Alert,
  OutlinedInput,
  InputAdornment,
  Tooltip,
  Stack,
  Divider,
  Avatar,
  LinearProgress,
  Badge,
  Fab,
  Tabs,
  Tab,
  Paper,
  Menu,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ModernTable from '../components/ModernTable';
import YouTubeEmbed from '../components/camera/YouTubeEmbed';
import {
  Inventory as InventoryIcon,
  Videocam as VideocamIcon,
  Business as SuppliersIcon,
  LocationOn as LocationIcon,
  Assessment as ReportsIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  LocalShipping as DeliveryIcon,
  Storage as StorageIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';

// Mock data for inventory monitoring
const mockVideoFeeds = [
  {
    id: 'VID-001',
    title: 'Main Kitchen Inventory Tracking',
    location: 'Main Kitchen',
    supplier: 'Fresh Foods Inc.',
    timestamp: '2024-01-15 14:30',
    status: 'Active',
    videoUrl: 'https://www.youtube.com/watch?v=qLkACxD6wNY',
    description: 'Real-time monitoring of ingredient usage and inventory levels',
    activity: 'High Usage Period'
  },
  {
    id: 'VID-002',
    title: 'Dry Storage Monitoring',
    location: 'Dry Storage',
    supplier: 'Bulk Supplies Co.',
    timestamp: '2024-01-15 14:25',
    status: 'Active',
    videoUrl: 'https://www.youtube.com/watch?v=dHcxTmU6atk',
    description: 'Automated tracking of dry goods inventory and stock rotation',
    activity: 'Normal Operations'
  },
  {
    id: 'VID-003',
    title: 'Freezer Inventory Control',
    location: 'Walk-in Freezer',
    supplier: 'Frozen Foods Ltd.',
    timestamp: '2024-01-15 14:20',
    status: 'Active',
    videoUrl: 'https://www.youtube.com/watch?v=zolQCp3OTMI',
    description: 'Temperature-controlled inventory monitoring with AI detection',
    activity: 'Stock Rotation'
  },
  {
    id: 'VID-004',
    title: 'Receiving Bay Tracking',
    location: 'Receiving Bay',
    supplier: 'Metro Distributors',
    timestamp: '2024-01-15 14:15',
    status: 'Active',
    videoUrl: 'https://www.youtube.com/shorts/tJOHCAOSgSQ',
    description: 'Delivery tracking and inventory intake monitoring',
    activity: 'Delivery Processing'
  }
];

const mockSuppliers = [
  { id: 'SUP-001', name: 'Fresh Foods Inc.', category: 'Produce', deliveries: 24, onTime: '96%', quality: 'Excellent' },
  { id: 'SUP-002', name: 'Bulk Supplies Co.', category: 'Dry Goods', deliveries: 18, onTime: '94%', quality: 'Good' },
  { id: 'SUP-003', name: 'Frozen Foods Ltd.', category: 'Frozen', deliveries: 15, onTime: '98%', quality: 'Excellent' },
  { id: 'SUP-004', name: 'Metro Distributors', category: 'Mixed', deliveries: 32, onTime: '92%', quality: 'Good' },
  { id: 'SUP-005', name: 'Ocean Fresh Seafood', category: 'Seafood', deliveries: 12, onTime: '89%', quality: 'Excellent' },
  { id: 'SUP-006', name: 'Prime Meat Co.', category: 'Meat', deliveries: 28, onTime: '95%', quality: 'Excellent' },
  { id: 'SUP-007', name: 'Dairy Valley Farms', category: 'Dairy', deliveries: 22, onTime: '97%', quality: 'Good' },
  { id: 'SUP-008', name: 'Organic Harvest', category: 'Produce', deliveries: 16, onTime: '93%', quality: 'Excellent' },
  { id: 'SUP-009', name: 'Spice World Trading', category: 'Spices', deliveries: 8, onTime: '91%', quality: 'Good' },
  { id: 'SUP-010', name: 'Bakery Essentials', category: 'Baking', deliveries: 14, onTime: '96%', quality: 'Good' },
  { id: 'SUP-011', name: 'Global Food Imports', category: 'International', deliveries: 20, onTime: '88%', quality: 'Good' },
  { id: 'SUP-012', name: 'Local Farm Co-op', category: 'Produce', deliveries: 30, onTime: '99%', quality: 'Excellent' },
  { id: 'SUP-013', name: 'Beverage Solutions', category: 'Beverages', deliveries: 25, onTime: '94%', quality: 'Good' },
  { id: 'SUP-014', name: 'Specialty Oils Ltd.', category: 'Oils', deliveries: 10, onTime: '92%', quality: 'Excellent' },
  { id: 'SUP-015', name: 'Protein Plus', category: 'Meat', deliveries: 19, onTime: '90%', quality: 'Good' },
];

const mockLocations = [
  { id: 'LOC-001', name: 'Main Kitchen', cameras: 4, inventory: '2,450 items', utilization: '87%', status: 'Optimal' },
  { id: 'LOC-002', name: 'Dry Storage', cameras: 3, inventory: '1,850 items', utilization: '72%', status: 'Good' },
  { id: 'LOC-003', name: 'Walk-in Freezer', cameras: 2, inventory: '980 items', utilization: '65%', status: 'Good' },
  { id: 'LOC-004', name: 'Receiving Bay', cameras: 2, inventory: '320 items', utilization: '45%', status: 'Low' },
  { id: 'LOC-005', name: 'Cold Storage A', cameras: 3, inventory: '1,650 items', utilization: '78%', status: 'Good' },
  { id: 'LOC-006', name: 'Prep Station 1', cameras: 2, inventory: '890 items', utilization: '92%', status: 'Optimal' },
  { id: 'LOC-007', name: 'Prep Station 2', cameras: 2, inventory: '750 items', utilization: '68%', status: 'Good' },
  { id: 'LOC-008', name: 'Pantry Storage', cameras: 1, inventory: '1,200 items', utilization: '55%', status: 'Low' },
  { id: 'LOC-009', name: 'Beverage Cooler', cameras: 1, inventory: '450 items', utilization: '82%', status: 'Good' },
  { id: 'LOC-010', name: 'Meat Locker', cameras: 2, inventory: '680 items', utilization: '89%', status: 'Optimal' },
  { id: 'LOC-011', name: 'Produce Cooler', cameras: 2, inventory: '1,100 items', utilization: '75%', status: 'Good' },
  { id: 'LOC-012', name: 'Loading Dock', cameras: 3, inventory: '280 items', utilization: '35%', status: 'Low' },
];

const mockReports = [
  { id: 'RPT-001', title: 'Weekly Inventory Analysis', date: '2024-01-15', type: 'Inventory Levels', status: 'Completed', insights: 8 },
  { id: 'RPT-002', title: 'Supplier Performance Review', date: '2024-01-14', type: 'Supplier Analysis', status: 'In Progress', insights: 12 },
  { id: 'RPT-003', title: 'Usage Pattern Analysis', date: '2024-01-13', type: 'Usage Tracking', status: 'Completed', insights: 15 },
  { id: 'RPT-004', title: 'Waste Reduction Report', date: '2024-01-12', type: 'Efficiency', status: 'Pending Review', insights: 6 },
  { id: 'RPT-005', title: 'Monthly Cost Analysis', date: '2024-01-11', type: 'Financial', status: 'Completed', insights: 22 },
  { id: 'RPT-006', title: 'Temperature Monitoring Log', date: '2024-01-10', type: 'Compliance', status: 'Completed', insights: 5 },
  { id: 'RPT-007', title: 'Delivery Performance Metrics', date: '2024-01-09', type: 'Logistics', status: 'In Progress', insights: 18 },
  { id: 'RPT-008', title: 'Quality Control Summary', date: '2024-01-08', type: 'Quality', status: 'Completed', insights: 11 },
  { id: 'RPT-009', title: 'Seasonal Demand Forecast', date: '2024-01-07', type: 'Forecasting', status: 'Pending Review', insights: 9 },
  { id: 'RPT-010', title: 'Equipment Utilization Report', date: '2024-01-06', type: 'Operations', status: 'Completed', insights: 14 },
  { id: 'RPT-011', title: 'Staff Productivity Analysis', date: '2024-01-05', type: 'HR Analytics', status: 'In Progress', insights: 7 },
  { id: 'RPT-012', title: 'Energy Consumption Report', date: '2024-01-04', type: 'Sustainability', status: 'Completed', insights: 13 },
  { id: 'RPT-013', title: 'Vendor Compliance Audit', date: '2024-01-03', type: 'Compliance', status: 'Pending Review', insights: 16 },
  { id: 'RPT-014', title: 'Customer Satisfaction Survey', date: '2024-01-02', type: 'Customer', status: 'Completed', insights: 20 },
  { id: 'RPT-015', title: 'Inventory Turnover Analysis', date: '2024-01-01', type: 'Inventory Levels', status: 'Completed', insights: 10 },
];

// Oxford Blue, Grey Blue, White Color Palette
const colors = {
  oxfordBlue: '#002147',
  greyBlue: '#475569',
  lightGreyBlue: '#64748B',
  veryLightGreyBlue: '#94A3B8',
  paleGreyBlue: '#CBD5E1',
  white: '#FFFFFF',
  lightGrey: '#F8FAFC',
  mediumGrey: '#F1F5F9',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6'
};

// Styled components following Untitled UI patterns
const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #f2f4f7',
  boxShadow: 'none',
  backgroundColor: '#ffffff',
  height: '100%',
}));

const MetricCard = styled(Card)(({ theme }) => ({
  borderRadius: '8px',
  border: '1px solid #f2f4f7',
  boxShadow: 'none',
  backgroundColor: '#ffffff',
  transition: 'border-color 0.2s ease-in-out',
  '&:hover': {
    borderColor: '#e4e7ec',
  },
  height: '100%',
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px'
}));

const StatsIconBox = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
}));

const StatsValue = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '30px',
  lineHeight: '38px',
  color: colors.oxfordBlue,
  marginBottom: '4px'
}));

const StatsLabel = styled(Typography)(({ theme }) => ({
  color: colors.greyBlue,
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px'
}));

const ModernButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '14px',
  padding: '10px 16px',
  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  '&.MuiButton-contained': {
    backgroundColor: colors.oxfordBlue,
    color: colors.white,
    '&:hover': {
      backgroundColor: '#001a38',
      boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)'
    }
  },
  '&.MuiButton-outlined': {
    borderColor: colors.paleGreyBlue,
    color: colors.greyBlue,
    '&:hover': {
      backgroundColor: colors.lightGrey,
      borderColor: colors.veryLightGreyBlue
    }
  }
}));

const ModernTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: colors.oxfordBlue,
    height: '2px'
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '14px',
    color: colors.greyBlue,
    minHeight: '44px',
    '&.Mui-selected': {
      color: colors.oxfordBlue,
      fontWeight: 600
    }
  }
}));

const ModernTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableCell-head': {
    backgroundColor: colors.lightGrey,
    color: colors.greyBlue,
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: `1px solid ${colors.paleGreyBlue}`,
    padding: '12px 16px'
  }
}));

const ModernTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: colors.lightGrey
  },
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${colors.paleGreyBlue}`,
    padding: '16px',
    fontSize: '14px',
    color: colors.oxfordBlue
  }
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: colors.white,
    '& fieldset': {
      borderColor: colors.paleGreyBlue
    },
    '&:hover fieldset': {
      borderColor: colors.veryLightGreyBlue
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.oxfordBlue,
      borderWidth: '2px'
    }
  },
  '& .MuiInputBase-input': {
    fontSize: '14px',
    color: colors.oxfordBlue
  }
}));

const InventoryMonitoring: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addReportDialog, setAddReportDialog] = useState(false);
  const [addMonitorDialog, setAddMonitorDialog] = useState(false);
  const [supplierProfileDialog, setSupplierProfileDialog] = useState(false);
  const [locationOverviewDialog, setLocationOverviewDialog] = useState(false);
  const [reportOverviewDialog, setReportOverviewDialog] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleActionClick = (event: React.MouseEvent<HTMLElement>, item: any) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedItem(item);
  };

  const handleActionClose = () => {
    setActionMenuAnchor(null);
    setSelectedItem(null);
  };

  const handleView = () => {
    setViewDialog(true);
    handleActionClose();
  };

  const handleEdit = () => {
    setEditDialog(true);
    handleActionClose();
  };

  const handleDelete = () => {
    setDeleteDialog(true);
    handleActionClose();
  };

  const handleCloseDialogs = () => {
    setViewDialog(false);
    setEditDialog(false);
    setDeleteDialog(false);
    setAddReportDialog(false);
    setAddMonitorDialog(false);
    setSupplierProfileDialog(false);
    setLocationOverviewDialog(false);
    setReportOverviewDialog(false);
    setSelectedItem(null);
  };

  const handleSupplierProfile = () => {
    console.log('Opening supplier profile with item:', selectedItem);
    setSupplierProfileDialog(true);
    handleActionClose();
  };

  const handleLocationOverview = () => {
    setLocationOverviewDialog(true);
    handleActionClose();
  };

  const handleReportOverview = () => {
    setReportOverviewDialog(true);
    handleActionClose();
  };

  const handleExport = (type: string) => {
    setToastMessage(`${type} exported successfully!`);
    setToastOpen(true);
  };

  const handleAddReport = () => {
    setAddReportDialog(true);
  };

  const handleAddMonitor = () => {
    setAddMonitorDialog(true);
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  // Calculate analytics values
  const totalCameras = mockLocations.reduce((sum, loc) => sum + loc.cameras, 0);
  const totalInventoryItems = mockVideoFeeds.length;
  const activeSuppliers = mockSuppliers.length;
  const completedReports = mockReports.filter(report => report.status === 'Completed').length;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: '100%' }}>
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
            Inventory Monitoring
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
            View your team's inventory tracking and monitoring activities.
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
            <SearchField
              placeholder="Search for inventory..."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: colors.veryLightGreyBlue, fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 320 }}
            />
            <ModernButton 
              variant="outlined" 
              startIcon={<FilterIcon />}
              size="medium"
            >
              Filters
            </ModernButton>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <ModernButton 
              variant="outlined" 
              startIcon={<DownloadIcon />}
              size="medium"
            >
              Export
            </ModernButton>
            <ModernButton 
              variant="contained" 
              startIcon={<AddIcon />}
              size="medium"
            >
              Add monitor
            </ModernButton>
          </Box>
        </Box>
      </Box>

      {/* Modern Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <CardContent sx={{ p: 3 }}>
              <StatsContainer>
                <StatsBox>
                  <StatsIconBox sx={{ backgroundColor: colors.info + '15' }}>
                    <VideocamIcon sx={{ color: colors.info, fontSize: 24 }} />
                  </StatsIconBox>
                  <Box>
                    <StatsValue>{totalCameras}</StatsValue>
                    <StatsLabel>Active Cameras</StatsLabel>
                  </Box>
                </StatsBox>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <ArrowUpwardIcon sx={{ color: colors.success, fontSize: 16 }} />
                  <Typography sx={{ 
                    color: colors.success, 
                    fontSize: '14px', 
                    fontWeight: 600 
                  }}>
                    2%
                  </Typography>
                </Stack>
              </StatsContainer>
            </CardContent>
          </MetricCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <CardContent sx={{ p: 3 }}>
              <StatsContainer>
                <StatsBox>
                  <StatsIconBox sx={{ backgroundColor: colors.warning + '15' }}>
                    <InventoryIcon sx={{ color: colors.warning, fontSize: 24 }} />
                  </StatsIconBox>
                  <Box>
                    <StatsValue>{totalInventoryItems}</StatsValue>
                    <StatsLabel>Monitored Areas</StatsLabel>
                  </Box>
                </StatsBox>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <ArrowUpwardIcon sx={{ color: colors.success, fontSize: 16 }} />
                  <Typography sx={{ 
                    color: colors.success, 
                    fontSize: '14px', 
                    fontWeight: 600 
                  }}>
                    8%
                  </Typography>
                </Stack>
              </StatsContainer>
            </CardContent>
          </MetricCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <CardContent sx={{ p: 3 }}>
              <StatsContainer>
                <StatsBox>
                  <StatsIconBox sx={{ backgroundColor: colors.success + '15' }}>
                    <SuppliersIcon sx={{ color: colors.success, fontSize: 24 }} />
                  </StatsIconBox>
                  <Box>
                    <StatsValue>{activeSuppliers}</StatsValue>
                    <StatsLabel>Active Suppliers</StatsLabel>
                  </Box>
                </StatsBox>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <ArrowUpwardIcon sx={{ color: colors.success, fontSize: 16 }} />
                  <Typography sx={{ 
                    color: colors.success, 
                    fontSize: '14px', 
                    fontWeight: 600 
                  }}>
                    5%
                  </Typography>
                </Stack>
              </StatsContainer>
            </CardContent>
          </MetricCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <CardContent sx={{ p: 3 }}>
              <StatsContainer>
                <StatsBox>
                  <StatsIconBox sx={{ backgroundColor: colors.oxfordBlue + '15' }}>
                    <ReportsIcon sx={{ color: colors.oxfordBlue, fontSize: 24 }} />
                  </StatsIconBox>
                  <Box>
                    <StatsValue>{completedReports}</StatsValue>
                    <StatsLabel>Reports Generated</StatsLabel>
                  </Box>
                </StatsBox>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <ArrowUpwardIcon sx={{ color: colors.success, fontSize: 16 }} />
                  <Typography sx={{ 
                    color: colors.success, 
                    fontSize: '14px', 
                    fontWeight: 600 
                  }}>
                    12%
                  </Typography>
                </Stack>
              </StatsContainer>
            </CardContent>
          </MetricCard>
        </Grid>
      </Grid>

      {/* Modern Navigation Tabs */}
      <SectionPaper sx={{ mb: 3, p: 0 }}>
        <Box sx={{ px: 3, pt: 3, pb: 0 }}>
          <ModernTabs value={tabValue} onChange={handleTabChange} aria-label="inventory monitoring tabs">
            <Tab label="Video Monitoring" icon={<VideocamIcon />} iconPosition="start" />
            <Tab label="Suppliers" icon={<SuppliersIcon />} iconPosition="start" />
            <Tab label="Locations" icon={<LocationIcon />} iconPosition="start" />
            <Tab label="Reports" icon={<ReportsIcon />} iconPosition="start" />
          </ModernTabs>
        </Box>
        <Divider sx={{ borderColor: colors.paleGreyBlue }} />

        {/* Video Monitoring Tab */}
        {tabValue === 0 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  fontSize: '18px', 
                  color: colors.oxfordBlue,
                  mb: 0.5
                }}>
                  AI-Powered Facility Monitoring
                </Typography>
                <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                  Real-time video feeds with intelligent monitoring capabilities
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <ModernButton variant="outlined" size="small" startIcon={<ShareIcon />}>
                  Share
                </ModernButton>
                <ModernButton variant="outlined" size="small" startIcon={<MoreVertIcon />}>
                  More
                </ModernButton>
              </Stack>
            </Box>
            <Grid container spacing={3}>
              {mockVideoFeeds.map((feed) => (
                <Grid item xs={12} md={6} key={feed.id}>
                  <Card sx={{ 
                    borderRadius: '12px', 
                    border: `1px solid ${colors.paleGreyBlue}`,
                    boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
                    height: '100%',
                    backgroundColor: colors.white,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0px 4px 8px rgba(16, 24, 40, 0.1), 0px 2px 4px rgba(16, 24, 40, 0.06)'
                    }
                  }}>
                  <Box sx={{ position: 'relative' }}>
                    <Box sx={{ height: 220 }}>
                      <YouTubeEmbed 
                        videoUrl={feed.videoUrl}
                        title={feed.title}
                        autoplay={true}
                        loop={true}
                        height="220px"
                      />
                    </Box>
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 12, 
                        left: 12,
                        display: 'flex',
                        gap: 1
                      }}
                    >
                      <Chip 
                        label={feed.status} 
                        size="small"
                        sx={{ 
                          backgroundColor: colors.success,
                          color: colors.white,
                          fontWeight: 600,
                          fontSize: '12px',
                          height: '24px',
                          borderRadius: '6px'
                        }}
                      />
                      <Chip 
                        label={feed.activity} 
                        size="small"
                        sx={{ 
                          backgroundColor: feed.activity === 'High Usage Period' ? colors.warning : 
                                         feed.activity === 'Delivery Processing' ? colors.info : colors.greyBlue,
                          color: colors.white,
                          fontWeight: 600,
                          fontSize: '12px',
                          height: '24px',
                          borderRadius: '6px'
                        }}
                      />
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600, 
                      fontSize: '16px',
                      color: colors.oxfordBlue,
                      mb: 2,
                      lineHeight: '24px'
                    }}>
                      {feed.title}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      py: 1.5, 
                      px: 2, 
                      mb: 2, 
                      backgroundColor: colors.mediumGrey, 
                      borderRadius: '8px',
                      border: `1px solid ${colors.paleGreyBlue}`
                    }}>
                      <Typography variant="body2" sx={{ 
                        color: colors.greyBlue,
                        fontSize: '13px',
                        fontWeight: 500
                      }}>
                        {feed.location} • {feed.supplier} • {feed.timestamp}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: colors.lightGreyBlue,
                      mb: 3, 
                      lineHeight: '20px',
                      fontSize: '14px'
                    }}>
                      {feed.description}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <ModernButton 
                        variant="outlined" 
                        size="small" 
                        startIcon={<VisibilityIcon />}
                        sx={{ flex: 1 }}
                      >
                        View Details
                      </ModernButton>
                      <ModernButton 
                        variant="contained" 
                        size="small" 
                        startIcon={<TrendingUpIcon />}
                        sx={{ flex: 1 }}
                      >
                        Analytics
                      </ModernButton>
                    </Stack>
                  </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Suppliers Tab */}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <ModernTable
              title="Supplier Performance Monitoring"
              subtitle="Track delivery performance and quality metrics"
              searchPlaceholder="Search suppliers..."
              data={mockSuppliers}
              filterOptions={[
                {
                  key: 'category',
                  label: 'Category',
                  values: ['Produce', 'Dry Goods', 'Frozen', 'Mixed', 'Seafood', 'Meat', 'Dairy', 'Spices', 'Baking', 'International', 'Beverages', 'Oils']
                },
                {
                  key: 'quality',
                  label: 'Quality Rating',
                  values: ['Excellent', 'Good']
                }
              ]}
              columns={[
                { id: 'name', label: 'Supplier Name', sortable: true },
                { id: 'category', label: 'Category' },
                { id: 'deliveries', label: 'Deliveries', align: 'center', sortable: true },
                { id: 'onTime', label: 'On-Time Rate', sortable: true },
                { id: 'quality', label: 'Quality Rating' },
                { id: 'actions', label: 'Actions', align: 'right' }
              ]}
              renderRow={(supplier, index) => (
                <TableRow 
                  key={supplier.id}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: '#f9fafb' 
                    },
                    borderBottom: index === mockSuppliers.length - 1 ? 'none' : '1px solid #e4e7ec'
                  }}
                >
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Avatar sx={{ 
                        width: 40, 
                        height: 40, 
                        backgroundColor: '#1e3a8a',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: 600
                      }}>
                        {supplier.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 500, 
                          color: '#101828',
                          fontSize: '14px',
                          lineHeight: '20px'
                        }}>
                          {supplier.name}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: '#667085',
                          fontSize: '12px',
                          lineHeight: '18px'
                        }}>
                          Verified Supplier
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Chip
                      label={supplier.category}
                      size="small"
                      sx={{
                        backgroundColor: supplier.category === 'Produce' ? '#dcfce7' :
                                       supplier.category === 'Meat' ? '#fee2e2' :
                                       supplier.category === 'Dairy' ? '#dbeafe' :
                                       supplier.category === 'Seafood' ? '#e0f2fe' :
                                       supplier.category === 'Frozen' ? '#f0f9ff' :
                                       supplier.category === 'Dry Goods' ? '#fef3c7' :
                                       supplier.category === 'Spices' ? '#fdf4ff' :
                                       supplier.category === 'Baking' ? '#fff7ed' :
                                       supplier.category === 'International' ? '#f3e8ff' :
                                       supplier.category === 'Beverages' ? '#ecfdf5' :
                                       supplier.category === 'Oils' ? '#fffbeb' : '#f2f4f7',
                        color: supplier.category === 'Produce' ? '#166534' :
                               supplier.category === 'Meat' ? '#dc2626' :
                               supplier.category === 'Dairy' ? '#1d4ed8' :
                               supplier.category === 'Seafood' ? '#0369a1' :
                               supplier.category === 'Frozen' ? '#0284c7' :
                               supplier.category === 'Dry Goods' ? '#92400e' :
                               supplier.category === 'Spices' ? '#7c2d12' :
                               supplier.category === 'Baking' ? '#ea580c' :
                               supplier.category === 'International' ? '#7c3aed' :
                               supplier.category === 'Beverages' ? '#059669' :
                               supplier.category === 'Oils' ? '#d97706' : '#344054',
                        fontWeight: 500,
                        fontSize: '12px',
                        height: '22px',
                        borderRadius: '6px',
                        border: 'none',
                        '& .MuiChip-label': {
                          px: 2
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ 
                      color: '#101828',
                      fontWeight: 500,
                      fontSize: '14px'
                    }}>
                      {supplier.deliveries}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ 
                        color: '#101828',
                        fontWeight: 500,
                        fontSize: '14px'
                      }}>
                        {supplier.onTime}
                      </Typography>
                      <Box sx={{ 
                        width: 16, 
                        height: 16, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}>
                        <TrendingUpIcon sx={{ 
                          fontSize: 14, 
                          color: '#12b76a' 
                        }} />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Chip
                      label={supplier.quality}
                      size="small"
                      sx={{
                        backgroundColor: supplier.quality === 'Excellent' ? '#ecfdf3' : '#eff6ff',
                        color: supplier.quality === 'Excellent' ? '#027a48' : '#1d4ed8',
                        fontWeight: 500,
                        fontSize: '12px',
                        height: '22px',
                        borderRadius: '6px',
                        '& .MuiChip-label': {
                          px: 2
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'right' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setSelectedItem(supplier);
                          handleSupplierProfile();
                        }}
                        sx={{
                          borderColor: '#d0d5dd',
                          color: '#344054',
                          fontSize: '14px',
                          fontWeight: 500,
                          textTransform: 'none',
                          px: 2,
                          py: 1,
                          height: '32px',
                          borderRadius: '6px',
                          '&:hover': {
                            borderColor: '#98a2b3',
                            backgroundColor: '#f9fafb'
                          }
                        }}
                      >
                        View Profile
                      </Button>
                      <IconButton
                        size="small"
                        onClick={(e) => handleActionClick(e, supplier)}
                        sx={{
                          color: '#667085',
                          '&:hover': {
                            backgroundColor: '#f9fafb'
                          }
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            />
          </Box>
        )}

        {/* Locations Tab */}
        {tabValue === 2 && (
          <Box sx={{ p: 3 }}>
            <ModernTable
              title="Location Monitoring Overview"
              subtitle="Monitor inventory levels and utilization across all locations"
              searchPlaceholder="Search locations..."
              data={mockLocations}
              filterOptions={[
                {
                  key: 'status',
                  label: 'Status',
                  values: ['Optimal', 'Good', 'Low']
                }
              ]}
              columns={[
                { id: 'name', label: 'Location Name', sortable: true },
                { id: 'cameras', label: 'Cameras', align: 'center' },
                { id: 'inventory', label: 'Inventory Count', sortable: true },
                { id: 'utilization', label: 'Utilization', sortable: true },
                { id: 'status', label: 'Status' },
                { id: 'actions', label: 'Actions', align: 'right' }
              ]}
              renderRow={(location, index) => (
                <TableRow 
                  key={location.id}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: '#f9fafb' 
                    },
                    borderBottom: index === mockLocations.length - 1 ? 'none' : '1px solid #e4e7ec'
                  }}
                >
                  <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ 
                        width: 40, 
                        height: 40, 
                        backgroundColor: '#1e3a8a', 
                        fontSize: '14px',
                        fontWeight: 600
                      }}>
                        {location.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ 
                          color: '#101828',
                          fontWeight: 500,
                          fontSize: '14px'
                        }}>
                          {location.name}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: '#667085',
                          fontSize: '12px'
                        }}>
                          ID: {location.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 3, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <VideocamIcon sx={{ color: '#667085', fontSize: 16 }} />
                      <Typography variant="body2" sx={{ 
                        color: '#101828',
                        fontWeight: 500,
                        fontSize: '14px'
                      }}>
                        {location.cameras}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                    <Typography variant="body2" sx={{ 
                      color: '#101828',
                      fontWeight: 500,
                      fontSize: '14px'
                    }}>
                      {location.inventory}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ 
                        color: '#101828',
                        fontWeight: 500,
                        fontSize: '14px'
                      }}>
                        {location.utilization}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={parseInt(location.utilization)} 
                        sx={{ 
                          width: 60,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: '#f2f4f7',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: parseInt(location.utilization) > 80 ? '#10b981' : 
                                           parseInt(location.utilization) > 60 ? '#f59e0b' : '#ef4444',
                            borderRadius: 3
                          }
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                    <Chip
                      label={location.status}
                      size="small"
                      sx={{
                        backgroundColor: location.status === 'Optimal' ? '#dcfce7' : 
                                       location.status === 'Good' ? '#fef3c7' : '#fee2e2',
                        color: location.status === 'Optimal' ? '#166534' : 
                               location.status === 'Good' ? '#92400e' : '#dc2626',
                        fontWeight: 500,
                        fontSize: '12px',
                        height: '24px',
                        borderRadius: '6px',
                        border: 'none'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 3, px: 3, borderBottom: 'none', textAlign: 'right' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setSelectedItem(location);
                          handleLocationOverview();
                        }}
                        sx={{
                          borderColor: '#d0d5dd',
                          color: '#344054',
                          fontSize: '14px',
                          fontWeight: 500,
                          textTransform: 'none',
                          px: 2,
                          py: 1,
                          height: '32px',
                          borderRadius: '6px',
                          '&:hover': {
                            borderColor: '#98a2b3',
                            backgroundColor: '#f9fafb'
                          }
                        }}
                      >
                        Overview
                      </Button>
                      <IconButton
                        size="small"
                        onClick={(e) => handleActionClick(e, location)}
                        sx={{
                          color: '#667085',
                          '&:hover': {
                            backgroundColor: '#f9fafb'
                          }
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              actions={
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleExport('Location Monitoring Data')}
                    sx={{
                      borderColor: '#d0d5dd',
                      color: '#344054',
                      fontSize: '14px',
                      fontWeight: 500,
                      textTransform: 'none',
                      px: 3,
                      py: 1,
                      height: '40px',
                      borderRadius: '8px',
                      '&:hover': {
                        borderColor: '#98a2b3',
                        backgroundColor: '#f9fafb'
                      }
                    }}
                  >
                    Export
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddMonitor}
                    sx={{
                      backgroundColor: '#1e3a8a',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: 500,
                      textTransform: 'none',
                      px: 3,
                      py: 1,
                      height: '40px',
                      borderRadius: '8px',
                      '&:hover': {
                        backgroundColor: '#1e40af'
                      }
                    }}
                  >
                    Add Monitor
                  </Button>
                </Stack>
              }
            />
          </Box>
        )}

        {/* Reports Tab */}
        {tabValue === 3 && (
          <Box sx={{ p: 3 }}>
            <ModernTable
              title="Monitoring Reports & Analytics"
              subtitle="Generate and manage detailed monitoring reports"
              searchPlaceholder="Search reports..."
              data={mockReports}
              filterOptions={[
                {
                  key: 'type',
                  label: 'Report Type',
                  values: ['Inventory Levels', 'Supplier Analysis', 'Usage Tracking', 'Efficiency', 'Financial', 'Compliance', 'Logistics', 'Quality', 'Forecasting', 'Operations', 'HR Analytics', 'Sustainability', 'Customer']
                },
                {
                  key: 'status',
                  label: 'Status',
                  values: ['Completed', 'In Progress', 'Pending Review']
                }
              ]}
              columns={[
                { id: 'title', label: 'Report Title', sortable: true },
                { id: 'date', label: 'Date', sortable: true },
                { id: 'type', label: 'Type' },
                { id: 'status', label: 'Status' },
                { id: 'insights', label: 'File Size', align: 'center' },
                { id: 'actions', label: 'Actions', align: 'right' }
              ]}
              renderRow={(report, index) => (
                <TableRow 
                  key={report.id}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: '#f9fafb' 
                    },
                    borderBottom: index === mockReports.length - 1 ? 'none' : '1px solid #e4e7ec'
                  }}
                >
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '8px',
                        backgroundColor: '#fef3c7',
                        border: '1px solid #e4e7ec',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <ReportsIcon sx={{ color: '#d97706', fontSize: 18 }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 500, 
                          color: '#101828',
                          fontSize: '14px',
                          lineHeight: '20px'
                        }}>
                          {report.title}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: '#667085',
                          fontSize: '12px',
                          lineHeight: '18px'
                        }}>
                          PDF Document
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Typography variant="body2" sx={{ 
                      color: '#667085',
                      fontSize: '14px'
                    }}>
                      {report.date}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Chip
                      label={report.type}
                      size="small"
                      sx={{
                        backgroundColor: report.type === 'Inventory Levels' ? '#dcfce7' :
                                       report.type === 'Supplier Analysis' ? '#dbeafe' :
                                       report.type === 'Usage Tracking' ? '#fef3c7' :
                                       report.type === 'Efficiency' ? '#ecfdf5' :
                                       report.type === 'Financial' ? '#fee2e2' :
                                       report.type === 'Compliance' ? '#f3e8ff' :
                                       report.type === 'Logistics' ? '#e0f2fe' :
                                       report.type === 'Quality' ? '#fdf4ff' :
                                       report.type === 'Forecasting' ? '#f0f9ff' :
                                       report.type === 'Operations' ? '#fff7ed' :
                                       report.type === 'HR Analytics' ? '#fef3c7' :
                                       report.type === 'Sustainability' ? '#ecfdf5' :
                                       report.type === 'Customer' ? '#fffbeb' : '#f2f4f7',
                        color: report.type === 'Inventory Levels' ? '#166534' :
                               report.type === 'Supplier Analysis' ? '#1d4ed8' :
                               report.type === 'Usage Tracking' ? '#92400e' :
                               report.type === 'Efficiency' ? '#059669' :
                               report.type === 'Financial' ? '#dc2626' :
                               report.type === 'Compliance' ? '#7c3aed' :
                               report.type === 'Logistics' ? '#0369a1' :
                               report.type === 'Quality' ? '#a21caf' :
                               report.type === 'Forecasting' ? '#0284c7' :
                               report.type === 'Operations' ? '#ea580c' :
                               report.type === 'HR Analytics' ? '#d97706' :
                               report.type === 'Sustainability' ? '#10b981' :
                               report.type === 'Customer' ? '#f59e0b' : '#344054',
                        fontWeight: 500,
                        fontSize: '12px',
                        height: '22px',
                        borderRadius: '6px',
                        border: 'none',
                        '& .MuiChip-label': {
                          px: 2
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Chip
                      label={report.status}
                      size="small"
                      sx={{
                        backgroundColor: report.status === 'Completed' ? '#ecfdf3' :
                                       report.status === 'In Progress' ? '#eff6ff' : '#fef3c7',
                        color: report.status === 'Completed' ? '#027a48' :
                               report.status === 'In Progress' ? '#1d4ed8' : '#92400e',
                        fontWeight: 500,
                        fontSize: '12px',
                        height: '22px',
                        borderRadius: '6px',
                        '& .MuiChip-label': {
                          px: 2
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ 
                      color: '#101828',
                      fontWeight: 500,
                      fontSize: '14px'
                    }}>
                      {report.insights} KB
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'right' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setSelectedItem(report);
                          handleReportOverview();
                        }}
                        sx={{
                          borderColor: '#d0d5dd',
                          color: '#344054',
                          fontSize: '14px',
                          fontWeight: 500,
                          textTransform: 'none',
                          px: 2,
                          py: 1,
                          height: '32px',
                          borderRadius: '6px',
                          '&:hover': {
                            borderColor: '#98a2b3',
                            backgroundColor: '#f9fafb'
                          }
                        }}
                      >
                        Overview
                      </Button>
                      <IconButton
                        size="small"
                        onClick={(e) => handleActionClick(e, report)}
                        sx={{
                          color: '#667085',
                          '&:hover': {
                            backgroundColor: '#f9fafb'
                          }
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              actions={
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleExport('Supplier Performance Report')}
                    sx={{
                      borderColor: '#d0d5dd',
                      color: '#344054',
                      fontSize: '14px',
                      fontWeight: 500,
                      textTransform: 'none',
                      px: 3,
                      py: 1,
                      height: '40px',
                      borderRadius: '8px',
                      '&:hover': {
                        borderColor: '#98a2b3',
                        backgroundColor: '#f9fafb'
                      }
                    }}
                  >
                    Export All
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddReport}
                    sx={{
                      backgroundColor: '#1e3a8a',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: 500,
                      textTransform: 'none',
                      px: 3,
                      py: 1,
                      height: '40px',
                      borderRadius: '8px',
                      '&:hover': {
                        backgroundColor: '#1e40af'
                      }
                    }}
                  >
                    Add New Report
                  </Button>
                </Stack>
              }
            />
          </Box>
        )}
      </SectionPaper>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 160,
            borderRadius: '8px',
            border: '1px solid #e4e7ec',
            boxShadow: '0px 4px 8px rgba(16, 24, 40, 0.1)'
          }
        }}
      >
        <MenuItem onClick={handleView} sx={{ py: 1.5, px: 2 }}>
          <VisibilityIcon sx={{ mr: 2, fontSize: 18, color: '#667085' }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleEdit} sx={{ py: 1.5, px: 2 }}>
          <EditIcon sx={{ mr: 2, fontSize: 18, color: '#667085' }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ py: 1.5, px: 2, color: '#dc2626' }}>
          <DeleteIcon sx={{ mr: 2, fontSize: 18, color: '#dc2626' }} />
          Delete
        </MenuItem>
      </Menu>

      {/* View Dialog */}
      <Dialog open={viewDialog} onClose={handleCloseDialogs} maxWidth="md" fullWidth>
        <DialogTitle sx={{ 
          fontWeight: 600, 
          fontSize: '18px', 
          color: '#101828',
          borderBottom: '1px solid #e4e7ec'
        }}>
          View Details
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedItem && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: '#101828' }}>
                {selectedItem.name || selectedItem.title}
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(selectedItem).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Typography variant="body2" sx={{ color: '#667085', mb: 0.5 }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#101828' }}>
                      {String(value)}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #e4e7ec' }}>
          <Button onClick={handleCloseDialogs} sx={{ color: '#667085' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onClose={handleCloseDialogs} maxWidth="md" fullWidth>
        <DialogTitle sx={{ 
          fontWeight: 600, 
          fontSize: '18px', 
          color: '#101828',
          borderBottom: '1px solid #e4e7ec'
        }}>
          Edit Item
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedItem && (
            <Box>
              <Typography variant="body1" sx={{ mb: 3, color: '#667085' }}>
                Edit the details for: {selectedItem.name || selectedItem.title}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    defaultValue={selectedItem.name || selectedItem.title}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Status"
                    defaultValue={selectedItem.status}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Category/Type"
                    defaultValue={selectedItem.category || selectedItem.type}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #e4e7ec' }}>
          <Button onClick={handleCloseDialogs} sx={{ color: '#667085' }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleCloseDialogs}
            sx={{ 
              backgroundColor: '#1e3a8a',
              '&:hover': { backgroundColor: '#1e40af' }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog} onClose={handleCloseDialogs} maxWidth="sm">
        <DialogTitle sx={{ 
          fontWeight: 600, 
          fontSize: '18px', 
          color: '#101828'
        }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: '#667085' }}>
            Are you sure you want to delete "{selectedItem?.name || selectedItem?.title}"? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialogs} sx={{ color: '#667085' }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleCloseDialogs}
            sx={{ 
              backgroundColor: '#dc2626',
              '&:hover': { backgroundColor: '#b91c1c' }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Supplier Profile Dialog */}
      <Dialog 
        open={supplierProfileDialog} 
        onClose={handleCloseDialogs} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ p: 0 }}>
          {selectedItem ? (
            <>
              {/* Header with gradient */}
              <Box sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                height: '120px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Avatar sx={{ 
                  width: 64, 
                  height: 64,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#ffffff'
                }}>
                  {selectedItem?.name?.charAt(0) || 'S'}
                </Avatar>
              </Box>

              {/* Content */}
              <Box sx={{ p: 4, pb: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ 
                    color: '#111827', 
                    fontWeight: 600,
                    mb: 0.5
                  }}>
                    {selectedItem.name}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#6b7280',
                    mb: 2
                  }}>
                    Verified Supplier • {selectedItem?.category || 'N/A'}
                  </Typography>
                </Box>

                <Stack spacing={2.5}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #f3f4f6'
                  }}>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      backgroundColor: '#10b981',
                      mr: 2
                    }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>
                        Supplier ID
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {selectedItem.id}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #f3f4f6'
                  }}>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      backgroundColor: '#3b82f6',
                      mr: 2
                    }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>
                        Total Deliveries
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {selectedItem.deliveries} completed
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #f3f4f6'
                  }}>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      backgroundColor: '#10b981',
                      mr: 2
                    }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>
                        On-Time Performance
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {selectedItem.onTime} • {selectedItem.quality}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>

                {/* Actions */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  mt: 4,
                  pt: 3,
                  borderTop: '1px solid #f3f4f6'
                }}>
                  <Button 
                    variant="outlined" 
                    onClick={handleCloseDialogs}
                    sx={{ 
                      flex: 1,
                      color: '#6b7280',
                      borderColor: '#d1d5db',
                      '&:hover': {
                        borderColor: '#9ca3af',
                        backgroundColor: '#f9fafb'
                      }
                    }}
                  >
                    Close
                  </Button>
                  <Button 
                    variant="contained"
                    sx={{ 
                      flex: 1,
                      backgroundColor: '#1f2937',
                      '&:hover': { 
                        backgroundColor: '#111827' 
                      }
                    }}
                  >
                    Contact
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                No supplier selected
              </Typography>
            </Box>
          )}
        </Box>
      </Dialog>

      {/* Location Overview Dialog */}
      <Dialog 
        open={locationOverviewDialog} 
        onClose={handleCloseDialogs} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ p: 0 }}>
          {selectedItem && (
            <>
              {/* Search-like header */}
              <Box sx={{ 
                p: 3, 
                pb: 2,
                borderBottom: '1px solid #f3f4f6'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  p: 2,
                  border: '1px solid #e5e7eb'
                }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    borderRadius: '4px',
                    backgroundColor: '#1f2937',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    <Typography sx={{ 
                      color: '#ffffff', 
                      fontSize: '12px', 
                      fontWeight: 600 
                    }}>
                      {selectedItem.name?.charAt(0)}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ 
                    color: '#111827', 
                    fontWeight: 500,
                    flex: 1
                  }}>
                    {selectedItem.name}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#6b7280',
                    fontSize: '12px'
                  }}>
                    ⌘/
                  </Typography>
                </Box>
              </Box>

              {/* Content */}
              <Box sx={{ p: 3, pt: 2 }}>
                <Typography variant="body2" sx={{ 
                  color: '#6b7280', 
                  mb: 2,
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Location Details
                </Typography>

                <Stack spacing={1}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: '6px',
                    '&:hover': {
                      backgroundColor: '#f9fafb'
                    }
                  }}>
                    <Box sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '6px',
                      backgroundColor: '#dbeafe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3
                    }}>
                      <Typography sx={{ fontSize: '14px' }}>🏢</Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ 
                        color: '#111827', 
                        fontWeight: 500,
                        mb: 0.5
                      }}>
                        Location ID
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {selectedItem.id}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: '#9ca3af',
                      fontSize: '11px'
                    }}>
                      ⌘K
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: '6px',
                    '&:hover': {
                      backgroundColor: '#f9fafb'
                    }
                  }}>
                    <Box sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '6px',
                      backgroundColor: '#fef3c7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3
                    }}>
                      <Typography sx={{ fontSize: '14px' }}>📹</Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ 
                        color: '#111827', 
                        fontWeight: 500,
                        mb: 0.5
                      }}>
                        Active Cameras
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {selectedItem.cameras} cameras monitoring
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: '#9ca3af',
                      fontSize: '11px'
                    }}>
                      ⌘C
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: '6px',
                    '&:hover': {
                      backgroundColor: '#f9fafb'
                    }
                  }}>
                    <Box sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '6px',
                      backgroundColor: '#dcfce7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3
                    }}>
                      <Typography sx={{ fontSize: '14px' }}>📦</Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ 
                        color: '#111827', 
                        fontWeight: 500,
                        mb: 0.5
                      }}>
                        Inventory Count
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {selectedItem.inventory} • {selectedItem.utilization} utilized
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: '#9ca3af',
                      fontSize: '11px'
                    }}>
                      ⌘I
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: '6px',
                    '&:hover': {
                      backgroundColor: '#f9fafb'
                    }
                  }}>
                    <Box sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '6px',
                      backgroundColor: selectedItem.status === 'Optimal' ? '#dcfce7' : '#fef3c7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3
                    }}>
                      <Typography sx={{ fontSize: '14px' }}>
                        {selectedItem.status === 'Optimal' ? '✅' : '⚠️'}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ 
                        color: '#111827', 
                        fontWeight: 500,
                        mb: 0.5
                      }}>
                        Status
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {selectedItem.status} performance
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: '#9ca3af',
                      fontSize: '11px'
                    }}>
                      ⌘S
                    </Typography>
                  </Box>
                </Stack>

                {/* Footer */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: 3,
                  pt: 2,
                  borderTop: '1px solid #f3f4f6'
                }}>
                  <Typography variant="body2" sx={{ 
                    color: '#9ca3af',
                    fontSize: '11px'
                  }}>
                    ↑ ↓ to navigate • ⏎ to select • esc to close
                  </Typography>
                  <Button 
                    size="small"
                    onClick={handleCloseDialogs}
                    sx={{ 
                      color: '#6b7280',
                      fontSize: '11px',
                      minWidth: 'auto',
                      p: 0.5
                    }}
                  >
                    esc
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Dialog>

      {/* Report Overview Dialog */}
      <Dialog 
        open={reportOverviewDialog} 
        onClose={handleCloseDialogs} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ p: 0 }}>
          {selectedItem && (
            <>
              {/* Search-like header */}
              <Box sx={{ 
                p: 3, 
                pb: 2,
                borderBottom: '1px solid #f3f4f6'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  p: 2,
                  border: '1px solid #e5e7eb'
                }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    borderRadius: '4px',
                    backgroundColor: '#1f2937',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    <Typography sx={{ 
                      color: '#ffffff', 
                      fontSize: '12px', 
                      fontWeight: 600 
                    }}>
                      📊
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ 
                    color: '#111827', 
                    fontWeight: 500,
                    flex: 1
                  }}>
                    {selectedItem.title}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#6b7280',
                    fontSize: '12px'
                  }}>
                    ⌘/
                  </Typography>
                </Box>
              </Box>

              {/* Content */}
              <Box sx={{ p: 3, pt: 2 }}>
                <Typography variant="body2" sx={{ 
                  color: '#6b7280', 
                  mb: 2,
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Report Details
                </Typography>

                <Stack spacing={1}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: '6px',
                    '&:hover': {
                      backgroundColor: '#f9fafb'
                    }
                  }}>
                    <Box sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '6px',
                      backgroundColor: '#dbeafe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3
                    }}>
                      <Typography sx={{ fontSize: '14px' }}>📄</Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ 
                        color: '#111827', 
                        fontWeight: 500,
                        mb: 0.5
                      }}>
                        Report ID
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {selectedItem.id}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: '#9ca3af',
                      fontSize: '11px'
                    }}>
                      ⌘R
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: '6px',
                    '&:hover': {
                      backgroundColor: '#f9fafb'
                    }
                  }}>
                    <Box sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '6px',
                      backgroundColor: '#f3e8ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3
                    }}>
                      <Typography sx={{ fontSize: '14px' }}>📅</Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ 
                        color: '#111827', 
                        fontWeight: 500,
                        mb: 0.5
                      }}>
                        Generated Date
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {selectedItem.date} • {selectedItem.type}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: '#9ca3af',
                      fontSize: '11px'
                    }}>
                      ⌘D
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: '6px',
                    '&:hover': {
                      backgroundColor: '#f9fafb'
                    }
                  }}>
                    <Box sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '6px',
                      backgroundColor: selectedItem.status === 'Completed' ? '#dcfce7' : '#fef3c7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3
                    }}>
                      <Typography sx={{ fontSize: '14px' }}>
                        {selectedItem.status === 'Completed' ? '✅' : '⏳'}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ 
                        color: '#111827', 
                        fontWeight: 500,
                        mb: 0.5
                      }}>
                        Status
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {selectedItem.status} • {selectedItem.insights} insights
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: '#9ca3af',
                      fontSize: '11px'
                    }}>
                      ⌘S
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: '6px',
                    '&:hover': {
                      backgroundColor: '#f9fafb'
                    }
                  }}>
                    <Box sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '6px',
                      backgroundColor: '#fef3c7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3
                    }}>
                      <Typography sx={{ fontSize: '14px' }}>💾</Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ 
                        color: '#111827', 
                        fontWeight: 500,
                        mb: 0.5
                      }}>
                        File Size
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {selectedItem.insights} KB • 1,247 data points
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: '#9ca3af',
                      fontSize: '11px'
                    }}>
                      ⌘F
                    </Typography>
                  </Box>
                </Stack>

                {/* Actions section */}
                <Typography variant="body2" sx={{ 
                  color: '#6b7280', 
                  mb: 2,
                  mt: 3,
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Actions
                </Typography>

                <Stack spacing={1}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f9fafb'
                    }
                  }}
                  onClick={() => handleExport('Report PDF')}
                  >
                    <Box sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '6px',
                      backgroundColor: '#dbeafe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3
                    }}>
                      <Typography sx={{ fontSize: '14px' }}>⬇️</Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ 
                        color: '#111827', 
                        fontWeight: 500,
                        mb: 0.5
                      }}>
                        Download PDF
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        Export report as PDF document
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: '#9ca3af',
                      fontSize: '11px'
                    }}>
                      ⌘⇧E
                    </Typography>
                  </Box>
                </Stack>

                {/* Footer */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: 3,
                  pt: 2,
                  borderTop: '1px solid #f3f4f6'
                }}>
                  <Typography variant="body2" sx={{ 
                    color: '#9ca3af',
                    fontSize: '11px'
                  }}>
                    ↑ ↓ to navigate • ⏎ to select • esc to close
                  </Typography>
                  <Button 
                    size="small"
                    onClick={handleCloseDialogs}
                    sx={{ 
                      color: '#6b7280',
                      fontSize: '11px',
                      minWidth: 'auto',
                      p: 0.5
                    }}
                  >
                    esc
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Dialog>

      {/* Add New Report Dialog */}
      <Dialog open={addReportDialog} onClose={handleCloseDialogs} maxWidth="md" fullWidth>
        <DialogTitle sx={{ 
          fontWeight: 600, 
          fontSize: '18px', 
          color: '#101828',
          borderBottom: '1px solid #e4e7ec'
        }}>
          Add New Report
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Report Title"
                placeholder="Enter report title"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Report Type</InputLabel>
                <Select label="Report Type">
                  <MenuItem value="Inventory Levels">Inventory Levels</MenuItem>
                  <MenuItem value="Supplier Performance">Supplier Performance</MenuItem>
                  <MenuItem value="Location Analysis">Location Analysis</MenuItem>
                  <MenuItem value="Operational Efficiency">Operational Efficiency</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Analysis Period</InputLabel>
                <Select label="Analysis Period">
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Quarterly">Quarterly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                placeholder="Enter report description"
                multiline
                rows={3}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #e4e7ec' }}>
          <Button onClick={handleCloseDialogs} sx={{ color: '#667085' }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={() => {
              handleCloseDialogs();
              setToastMessage('New report created successfully!');
              setToastOpen(true);
            }}
            sx={{ 
              backgroundColor: '#1e3a8a',
              '&:hover': { backgroundColor: '#1e40af' }
            }}
          >
            Create Report
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Monitor Dialog */}
      <Dialog open={addMonitorDialog} onClose={handleCloseDialogs} maxWidth="md" fullWidth>
        <DialogTitle sx={{ 
          fontWeight: 600, 
          fontSize: '18px', 
          color: '#101828',
          borderBottom: '1px solid #e4e7ec'
        }}>
          Add New Monitor
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location Name"
                placeholder="Enter location name"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number of Cameras"
                type="number"
                placeholder="0"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Initial Status</InputLabel>
                <Select label="Initial Status">
                  <MenuItem value="Optimal">Optimal</MenuItem>
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location Address"
                placeholder="Enter full address"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                placeholder="Additional notes about this location"
                multiline
                rows={2}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #e4e7ec' }}>
          <Button onClick={handleCloseDialogs} sx={{ color: '#667085' }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={() => {
              handleCloseDialogs();
              setToastMessage('New monitor location added successfully!');
              setToastOpen(true);
            }}
            sx={{ 
              backgroundColor: '#1e3a8a',
              '&:hover': { backgroundColor: '#1e40af' }
            }}
          >
            Add Monitor
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleToastClose} 
          severity="success" 
          sx={{ 
            width: '100%',
            backgroundColor: '#dcfce7',
            color: '#16a34a',
            '& .MuiAlert-icon': {
              color: '#16a34a'
            }
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>

      </Box>
    </Box>
  );
};

export default InventoryMonitoring;
