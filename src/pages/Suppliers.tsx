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
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Alert,
  LinearProgress,
  Divider,
  InputAdornment
} from '@mui/material';
import ModernTable from '../components/ModernTable';
import {
  Business as BusinessIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Assessment as AssessmentIcon,
  Inventory as InventoryIcon,
  LocalShipping as LocalShippingIcon,
  Restaurant as RestaurantIcon,
  AttachMoney as AttachMoneyIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  FilterList as FilterListIcon,
  DateRange as DateRangeIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Star as StarIcon,
  Add as AddIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Cancel as CancelIcon,
  MoreVert as MoreIcon,
  StarBorder as StarBorderIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, BarChart, Bar } from 'recharts';

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
  purple: '#7C3AED'
};

const StyledCard = styled(Card)(({ theme }) => ({
  border: '1px solid #e4e7ec',
  borderRadius: '12px',
  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  '&:hover': {
    boxShadow: '0px 4px 8px rgba(16, 24, 40, 0.1)',
    transform: 'translateY(-2px)',
    transition: 'all 0.2s ease-in-out',
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
  '&:hover': {
    boxShadow: '0px 2px 4px rgba(16, 24, 40, 0.1)',
  },
}));

// Styled components
const SectionPaper = ({ children, ...props }: any) => (
  <Paper 
    elevation={2} 
    sx={{ 
      p: 3, 
      borderRadius: 3,
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      border: '1px solid rgba(0,0,0,0.05)',
      ...props.sx 
    }} 
    {...props}
  >
    {children}
  </Paper>
);

// Mock data
const mockSuppliers = [
  {
    id: 'SUP001',
    name: 'Fresh Produce Co.',
    category: 'Vegetables',
    contact: 'John Smith',
    email: 'john@freshproduce.co.za',
    phone: '+27 11 123 4567',
    location: 'Johannesburg',
    rating: 4.8,
    deliveryReliability: 95,
    qualityScore: 4.7,
    contractExpiry: '2024-12-31',
    status: 'Active',
    totalOrders: 156,
    avgDeliveryTime: 2.3,
    paymentTerms: '30 days'
  },
  {
    id: 'SUP002',
    name: 'Premium Meats Ltd.',
    category: 'Meat & Poultry',
    contact: 'Sarah Johnson',
    email: 'sarah@premiummeats.co.za',
    phone: '+27 21 987 6543',
    location: 'Cape Town',
    rating: 4.6,
    deliveryReliability: 88,
    qualityScore: 4.9,
    contractExpiry: '2024-06-15',
    status: 'Active',
    totalOrders: 89,
    avgDeliveryTime: 1.8,
    paymentTerms: '15 days'
  },
  {
    id: 'SUP003',
    name: 'Dairy Delights',
    category: 'Dairy',
    contact: 'Mike Wilson',
    email: 'mike@dairydelights.co.za',
    phone: '+27 31 456 7890',
    location: 'Durban',
    rating: 4.2,
    deliveryReliability: 92,
    qualityScore: 4.4,
    contractExpiry: '2024-03-20',
    status: 'Warning',
    totalOrders: 234,
    avgDeliveryTime: 3.1,
    paymentTerms: '45 days'
  }
];

const mockPerformanceData = [
  { month: 'Jan', deliveryTime: 2.1, qualityScore: 4.6, costIndex: 100 },
  { month: 'Feb', deliveryTime: 2.3, qualityScore: 4.7, costIndex: 102 },
  { month: 'Mar', deliveryTime: 2.0, qualityScore: 4.8, costIndex: 98 },
  { month: 'Apr', deliveryTime: 2.4, qualityScore: 4.5, costIndex: 105 },
  { month: 'May', deliveryTime: 2.2, qualityScore: 4.9, costIndex: 103 },
  { month: 'Jun', deliveryTime: 1.9, qualityScore: 4.7, costIndex: 97 }
];

const mockCostAnalysis = [
  { category: 'Vegetables', cost: 45000, savings: 8, trend: 'up' },
  { category: 'Meat & Poultry', cost: 78000, savings: 12, trend: 'down' },
  { category: 'Dairy', cost: 32000, savings: 5, trend: 'stable' },
  { category: 'Grains', cost: 28000, savings: 15, trend: 'down' }
];

const mockContracts = [
  {
    id: 'CON001',
    supplier: 'Fresh Produce Co.',
    type: 'Annual Supply',
    value: 540000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    autoRenewal: true,
    paymentTerms: '30 days',
    discountTier: '10% bulk discount'
  },
  {
    id: 'CON002',
    supplier: 'Premium Meats Ltd.',
    type: 'Quarterly Supply',
    value: 234000,
    startDate: '2024-01-01',
    endDate: '2024-06-15',
    status: 'Expiring Soon',
    autoRenewal: false,
    paymentTerms: '15 days',
    discountTier: '5% volume discount'
  }
];

export default function Suppliers() {
  const [tabValue, setTabValue] = useState(0);
  const [supplierDialogOpen, setSupplierDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Warning': return 'warning';
      case 'Inactive': return 'error';
      default: return 'default';
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon 
        key={i} 
        sx={{ 
          fontSize: 16, 
          color: i < Math.floor(rating) ? '#ffd700' : '#e0e0e0' 
        }} 
      />
    ));
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
            Suppliers
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
            Manage your supplier relationships and performance metrics.
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
              placeholder="Search suppliers..."
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
              onClick={() => setSupplierDialogOpen(true)}
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
              Add Supplier
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Key Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <Box>
                  <StatsValue>{mockSuppliers.filter(s => s.status === 'Active').length}</StatsValue>
                  <StatsLabel>Active Suppliers</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#dcfce7' }}>
                <CheckCircleIcon sx={{ color: colors.success, fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <Box>
                  <StatsValue>{(mockSuppliers.reduce((sum, s) => sum + s.rating, 0) / mockSuppliers.length).toFixed(1)}</StatsValue>
                  <StatsLabel>Avg Rating</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#fef3c7' }}>
                <StarIcon sx={{ color: colors.warning, fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <Box>
                  <StatsValue>{(mockSuppliers.reduce((sum, s) => sum + s.avgDeliveryTime, 0) / mockSuppliers.length).toFixed(1)} days</StatsValue>
                  <StatsLabel>Avg Delivery Time</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#f0f9ff' }}>
                <ScheduleIcon sx={{ color: '#0369a1', fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
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
            <Tab label="Supplier Management" />
            <Tab label="Performance Analytics" />
            <Tab label="Contract Management" />
            <Tab label="Quality Monitoring" />
          </Tabs>
        </Box>
      </StyledCard>

      {/* Supplier Management Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ p: 3 }}>
              <ModernTable
                title="Supplier Directory"
                subtitle="Manage your supplier relationships and performance metrics"
                searchPlaceholder="Search suppliers..."
                data={mockSuppliers}
                columns={[
                  { id: 'name', label: 'SUPPLIER', sortable: true },
                  { id: 'category', label: 'CATEGORY', sortable: true },
                  { id: 'contact', label: 'CONTACT', sortable: true },
                  { id: 'location', label: 'LOCATION', sortable: true },
                  { id: 'rating', label: 'RATING', sortable: true, align: 'center' },
                  { id: 'deliveryReliability', label: 'RELIABILITY', sortable: true, align: 'center' },
                  { id: 'status', label: 'STATUS', sortable: true },
                  { id: 'actions', label: 'ACTIONS', align: 'center' }
                ]}
                renderRow={(supplier, index) => (
                  <TableRow
                    key={supplier.id}
                    sx={{
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: index === mockSuppliers.length - 1 ? 'none' : '1px solid #e4e7ec'
                    }}
                  >
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar sx={{ width: 40, height: 40, backgroundColor: colors.oxfordBlue, color: '#fff', fontSize: 14, fontWeight: 600 }}>
                          {supplier.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>{supplier.name}</Typography>
                          <Typography variant="caption" sx={{ color: colors.greyBlue }}>{supplier.id}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Chip 
                        label={supplier.category} 
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
                        <Typography variant="body2" sx={{ fontWeight: 500, color: colors.oxfordBlue }}>{supplier.contact}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <EmailIcon sx={{ fontSize: 14, mr: 0.5, color: colors.greyBlue }} />
                          <Typography variant="caption" sx={{ color: colors.greyBlue }}>{supplier.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PhoneIcon sx={{ fontSize: 14, mr: 0.5, color: colors.greyBlue }} />
                          <Typography variant="caption" sx={{ color: colors.greyBlue }}>{supplier.phone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: colors.greyBlue }} />
                        <Typography variant="body2" sx={{ color: colors.greyBlue, fontWeight: 500 }}>{supplier.location}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {getRatingStars(supplier.rating)}
                        <Typography variant="body2" sx={{ ml: 1, color: colors.greyBlue, fontWeight: 500 }}>{supplier.rating}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: colors.oxfordBlue }}>{supplier.deliveryReliability}%</Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={supplier.deliveryReliability} 
                          sx={{ mt: 0.5, height: 4, borderRadius: 2, width: 60 }}
                          color={supplier.deliveryReliability >= 90 ? 'success' : 'warning'}
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Chip 
                        label={supplier.status} 
                        size="small"
                        sx={{
                          backgroundColor: supplier.status === 'Active' ? '#dcfce7' : supplier.status === 'Warning' ? '#fef3c7' : '#fecaca',
                          color: supplier.status === 'Active' ? colors.success : supplier.status === 'Warning' ? colors.warning : colors.error,
                          fontWeight: 500,
                          fontSize: '12px'
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Tooltip title="Edit Supplier">
                        <IconButton 
                          size="small" 
                          onClick={() => setSelectedSupplier(supplier)}
                          sx={{ 
                            mr: 1, 
                            color: colors.greyBlue,
                            '&:hover': { backgroundColor: '#f3f4f6' }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Supplier">
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: colors.error,
                            '&:hover': { backgroundColor: '#fef2f2' }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )}
              />
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Performance Analytics Tab */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Delivery Performance Trends</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="deliveryTime" stroke="#8884d8" name="Avg Delivery Time (days)" />
                    <Line type="monotone" dataKey="qualityScore" stroke="#82ca9d" name="Quality Score" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {/* Contract Management Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2">
                2 contracts are expiring within the next 90 days. Review renewal terms.
              </Typography>
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ p: 3 }}>
              <ModernTable
                title="Active Contracts"
                subtitle="Monitor contract terms, values, and renewal schedules"
                searchPlaceholder="Search contracts..."
                data={mockContracts}
                columns={[
                  { id: 'id', label: 'CONTRACT ID', sortable: true },
                  { id: 'supplier', label: 'SUPPLIER', sortable: true },
                  { id: 'type', label: 'TYPE', sortable: true },
                  { id: 'value', label: 'VALUE', sortable: true, align: 'right' },
                  { id: 'startDate', label: 'START DATE', sortable: true },
                  { id: 'endDate', label: 'END DATE', sortable: true },
                  { id: 'status', label: 'STATUS', sortable: true },
                  { id: 'autoRenewal', label: 'AUTO RENEWAL', sortable: true },
                  { id: 'actions', label: 'ACTIONS', align: 'center' }
                ]}
                renderRow={(contract, index) => (
                  <TableRow
                    key={contract.id}
                    sx={{
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: index === mockContracts.length - 1 ? 'none' : '1px solid #e4e7ec'
                    }}
                  >
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>{contract.id}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>{contract.supplier}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>{contract.type}</Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>R{contract.value.toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>{contract.startDate}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>{contract.endDate}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Chip 
                        label={contract.status}
                        size="small"
                        sx={{
                          backgroundColor: contract.status === 'Active' ? '#dcfce7' : '#fef3c7',
                          color: contract.status === 'Active' ? colors.success : colors.warning,
                          fontWeight: 500,
                          fontSize: '12px'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      {contract.autoRenewal ? (
                        <CheckCircleIcon sx={{ color: colors.success }} />
                      ) : (
                        <CancelIcon sx={{ color: colors.error }} />
                      )}
                    </TableCell>
                    <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <ModernButton 
                        variant="outlined" 
                        startIcon={<AssessmentIcon />}
                        sx={{
                          borderColor: '#d0d5dd',
                          color: colors.greyBlue,
                          fontSize: '12px',
                          padding: '6px 12px',
                          '&:hover': {
                            borderColor: '#98a2b3',
                            backgroundColor: '#f9fafb'
                          }
                        }}
                      >
                        Generate Report
                      </ModernButton>
                    </TableCell>
                  </TableRow>
                )}
              />
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Quality Monitoring Tab */}
      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Quality Score Distribution</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockSuppliers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="qualityScore" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Audit Results</Typography>
              {mockSuppliers.map((supplier, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: colors.oxfordBlue }}>{supplier.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getRatingStars(supplier.qualityScore)}
                      <Typography variant="body2" sx={{ ml: 1, color: colors.greyBlue }}>
                        {supplier.qualityScore}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                    Last audit: {new Date().toLocaleDateString()} • {supplier.totalOrders} orders completed
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={supplier.qualityScore * 20} 
                    sx={{ mt: 1, height: 6, borderRadius: 3 }}
                    color="primary"
                  />
                </Box>
              ))}
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {/* Add/Edit Supplier Dialog */}
      <Dialog open={supplierDialogOpen} onClose={() => setSupplierDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Supplier</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Supplier Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category">
                  <MenuItem value="vegetables">Vegetables</MenuItem>
                  <MenuItem value="meat">Meat & Poultry</MenuItem>
                  <MenuItem value="dairy">Dairy</MenuItem>
                  <MenuItem value="grains">Grains</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Contact Person" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Email" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Phone" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Location" variant="outlined" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSupplierDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setSupplierDialogOpen(false)}>
            Add Supplier
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
