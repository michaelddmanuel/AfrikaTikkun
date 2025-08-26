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
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  LinearProgress,
  Alert,
  Avatar,
  Tooltip,
  Paper
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Visibility as ViewIcon,
  MoreVert as MoreIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Assessment as AssessmentIcon,
  AccountBalance as AccountBalanceIcon,
  Business as BusinessIcon,
  LocalShipping as ShippingIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  AttachMoney as MoneyIcon,
  ShoppingCart as CartIcon,
  DateRange as DateRangeIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Build as BuildIcon,
  Inventory as InventoryIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon,
  Pending as PendingIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, BarChart, Bar } from 'recharts';
import ModernTable from '../components/ModernTable';
import { styled } from '@mui/material/styles';

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
const mockPurchaseOrders = [
  {
    id: 'PO001',
    supplier: 'Fresh Produce Co.',
    category: 'Vegetables',
    items: 15,
    totalAmount: 12500,
    orderDate: '2024-08-20',
    expectedDelivery: '2024-08-25',
    status: 'Approved',
    approvedBy: 'Sarah Johnson',
    paymentTerms: '30 days',
    discount: 8
  },
  {
    id: 'PO002',
    supplier: 'Premium Meats Ltd.',
    category: 'Meat & Poultry',
    items: 8,
    totalAmount: 18750,
    orderDate: '2024-08-22',
    expectedDelivery: '2024-08-27',
    status: 'Pending Approval',
    approvedBy: null,
    paymentTerms: '15 days',
    discount: 5
  },
  {
    id: 'PO003',
    supplier: 'Dairy Delights',
    category: 'Dairy',
    items: 12,
    totalAmount: 8900,
    orderDate: '2024-08-23',
    expectedDelivery: '2024-08-28',
    status: 'Delivered',
    approvedBy: 'Mike Wilson',
    paymentTerms: '45 days',
    discount: 12
  }
];

const mockBudgetData = [
  { month: 'Jan', budget: 150000, actual: 142000, variance: -8000 },
  { month: 'Feb', budget: 155000, actual: 158000, variance: 3000 },
  { month: 'Mar', budget: 148000, actual: 145000, variance: -3000 },
  { month: 'Apr', budget: 162000, actual: 159000, variance: -3000 },
  { month: 'May', budget: 158000, actual: 165000, variance: 7000 },
  { month: 'Jun', budget: 160000, actual: 154000, variance: -6000 }
];

const mockVendorComparison = [
  {
    category: 'Vegetables',
    vendors: [
      { name: 'Fresh Produce Co.', price: 45.50, quality: 4.8, delivery: 95 },
      { name: 'Green Valley Farms', price: 42.75, quality: 4.6, delivery: 88 },
      { name: 'Organic Harvest', price: 52.00, quality: 4.9, delivery: 92 }
    ]
  },
  {
    category: 'Meat & Poultry',
    vendors: [
      { name: 'Premium Meats Ltd.', price: 125.00, quality: 4.9, delivery: 96 },
      { name: 'Quality Butchers', price: 118.50, quality: 4.7, delivery: 89 },
      { name: 'Farm Fresh Meats', price: 132.75, quality: 4.8, delivery: 94 }
    ]
  }
];

const mockCostCenters = [
  { name: 'Ingredients', budget: 450000, spent: 387000, percentage: 86 },
  { name: 'Equipment', budget: 120000, spent: 95000, percentage: 79 },
  { name: 'Services', budget: 80000, spent: 72000, percentage: 90 },
  { name: 'Utilities', budget: 65000, spent: 58000, percentage: 89 }
];

const mockProcurementPlanning = [
  {
    item: 'Fresh Vegetables',
    currentStock: 45,
    predictedDemand: 120,
    recommendedOrder: 85,
    priority: 'Low',
    leadTime: '3 days',
    supplier: 'Fresh Produce Co.'
  },
  {
    item: 'Premium Meat',
    currentStock: 28,
    predictedDemand: 75,
    recommendedOrder: 55,
    priority: 'Medium',
    leadTime: '2 days',
    supplier: 'Premium Meats Ltd.'
  },
  {
    item: 'Dairy Products',
    currentStock: 15,
    predictedDemand: 80,
    recommendedOrder: 65,
    priority: 'High',
    leadTime: '1 day',
    supplier: 'Fresh Dairy Co.'
  },
  {
    item: 'Grains & Cereals',
    currentStock: 120,
    predictedDemand: 90,
    recommendedOrder: 30,
    priority: 'Low',
    leadTime: '5 days',
    supplier: 'Grain Suppliers Ltd.'
  }
];

export default function Purchases() {
  const [tabValue, setTabValue] = useState(0);
  const [poDialogOpen, setPoDialogOpen] = useState(false);
  const [selectedPO, setSelectedPO] = useState<any>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Pending Approval': return 'warning';
      case 'Delivered': return 'info';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircleIcon />;
      case 'Pending Approval': return <PendingIcon />;
      case 'Delivered': return <CheckCircleIcon />;
      case 'Cancelled': return <CancelIcon />;
      default: return <PendingIcon />;
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
            Purchases
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
            Manage purchase orders, vendor relationships, and procurement analytics.
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
              placeholder="Search purchase orders..."
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
              startIcon={<FilterIcon />}
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
              onClick={() => setPoDialogOpen(true)}
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
              Create Purchase Order
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
                <Typography variant="h4" sx={{ fontWeight: 700, color: colors.oxfordBlue, mb: 0.5 }}>156</Typography>
                <Typography variant="body2" sx={{ color: colors.greyBlue, fontWeight: 500 }}>Active POs</Typography>
              </Box>
              <Box sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                backgroundColor: '#e0f2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShoppingCartIcon sx={{ fontSize: 20, color: '#0284c7' }} />
              </Box>
            </Box>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: colors.oxfordBlue, mb: 0.5 }}>R1.8M</Typography>
                <Typography variant="body2" sx={{ color: colors.greyBlue, fontWeight: 500 }}>Monthly Spend</Typography>
              </Box>
              <Box sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AttachMoneyIcon sx={{ fontSize: 20, color: '#16a34a' }} />
              </Box>
            </Box>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: colors.oxfordBlue, mb: 0.5 }}>12%</Typography>
                <Typography variant="body2" sx={{ color: colors.greyBlue, fontWeight: 500 }}>Avg Savings</Typography>
              </Box>
              <Box sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingUpIcon sx={{ fontSize: 20, color: '#16a34a' }} />
              </Box>
            </Box>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: colors.oxfordBlue, mb: 0.5 }}>24</Typography>
                <Typography variant="body2" sx={{ color: colors.greyBlue, fontWeight: 500 }}>Pending Approvals</Typography>
              </Box>
              <Box sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                backgroundColor: '#fef3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ScheduleIcon sx={{ fontSize: 20, color: '#d97706' }} />
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
            <Tab label="Purchase Orders" />
            <Tab label="Budget Analytics" />
            <Tab label="Vendor Comparison" />
            <Tab label="Procurement Planning" />
          </Tabs>
        </Box>
      </StyledCard>

      {/* Purchase Orders Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                24 purchase orders require approval. Total pending value: R485,000
              </Typography>
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <ModernTable
              title="Purchase Order Management"
              subtitle="Track and manage all purchase orders"
              searchPlaceholder="Search purchase orders..."
              data={mockPurchaseOrders}
              columns={[
                { id: 'po', label: 'PO Number', sortable: true },
                { id: 'supplier', label: 'Supplier', sortable: true },
                { id: 'category', label: 'Category', sortable: true },
                { id: 'amount', label: 'Amount', sortable: true },
                { id: 'orderDate', label: 'Order Date', sortable: true },
                { id: 'delivery', label: 'Expected Delivery', sortable: true },
                { id: 'status', label: 'Status', sortable: true },
                { id: 'actions', label: 'Actions', sortable: false }
              ]}
              renderRow={(po, index) => (
                <TableRow
                  key={po.id}
                  sx={{
                    '&:hover': { backgroundColor: '#f9fafb' },
                    borderBottom: index === mockPurchaseOrders.length - 1 ? 'none' : '1px solid #e4e7ec'
                  }}
                >
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Avatar sx={{ width: 40, height: 40, backgroundColor: colors.oxfordBlue, color: '#fff' }}>
                        <ShoppingCartIcon />
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue, mb: 0.5 }}>
                          {po.id}
                        </Typography>
                        <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                          {po.items} items
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                      {po.supplier}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Chip 
                      label={po.category} 
                      size="small" 
                      sx={{
                        backgroundColor: '#f3f4f6',
                        color: colors.greyBlue,
                        fontWeight: 500,
                        fontSize: '12px'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'right' }}>
                    <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue, mb: 0.5 }}>
                      R{po.totalAmount.toLocaleString()}
                    </Typography>
                    {po.discount > 0 && (
                      <Typography variant="body2" sx={{ color: colors.success }}>
                        {po.discount}% discount
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Typography sx={{ color: colors.greyBlue }}>{po.orderDate}</Typography>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Typography sx={{ color: colors.greyBlue }}>{po.expectedDelivery}</Typography>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Chip 
                      label={po.status}
                      size="small"
                      sx={{
                        backgroundColor: po.status === 'Approved' ? '#dcfce7' : po.status === 'Pending Approval' ? '#fef3c7' : po.status === 'Delivered' ? '#dbeafe' : '#fecaca',
                        color: po.status === 'Approved' ? colors.success : po.status === 'Pending Approval' ? colors.warning : po.status === 'Delivered' ? '#1d4ed8' : colors.error,
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
                          onClick={() => setSelectedPO(po)}
                          sx={{ color: colors.greyBlue, '&:hover': { color: colors.oxfordBlue } }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit PO">
                        <IconButton 
                          size="small"
                          sx={{ color: colors.greyBlue, '&:hover': { color: colors.oxfordBlue } }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {po.status === 'Pending Approval' && (
                        <Tooltip title="Approve">
                          <IconButton 
                            size="small" 
                            sx={{ color: colors.greyBlue, '&:hover': { color: colors.success } }}
                          >
                            <CheckCircleIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            />
          </Grid>
        </Grid>
      )}

      {/* Budget Analytics Tab */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Budget vs Actual Spending</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockBudgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip formatter={(value: any) => [`R${value.toLocaleString()}`, '']} />
                    <Legend />
                    <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                    <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Cost Center Breakdown</Typography>
              {mockCostCenters.map((center, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: colors.oxfordBlue }}>{center.name}</Typography>
                    <Typography variant="h6" sx={{ color: colors.oxfordBlue }}>
                      R{center.spent.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                      Budget: R{center.budget.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: center.percentage > 85 ? colors.warning : colors.success }}>
                      {center.percentage}% used
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={center.percentage} 
                    sx={{ height: 6, borderRadius: 3 }}
                    color={center.percentage > 85 ? 'warning' : 'success'}
                  />
                </Box>
              ))}
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {/* Vendor Comparison Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {mockVendorComparison.map((category, categoryIndex) => (
                <ModernTable
                  key={categoryIndex}
                  title={`${category.category} - Vendor Price Comparison`}
                  subtitle="Compare vendors by price, quality, and delivery performance"
                  searchPlaceholder="Search vendors..."
                  data={category.vendors.map(vendor => ({
                    ...vendor,
                    score: ((vendor.quality * 20) + (vendor.delivery * 0.8) + ((100 - ((vendor.price / Math.min(...category.vendors.map(v => v.price))) * 100)) * 0.2)).toFixed(1)
                  }))}
                  columns={[
                    { id: 'vendor', label: 'Vendor', sortable: true },
                    { id: 'price', label: 'Price (R)', sortable: true },
                    { id: 'quality', label: 'Quality Rating', sortable: true },
                    { id: 'delivery', label: 'Delivery %', sortable: true },
                    { id: 'score', label: 'Score', sortable: true },
                    { id: 'actions', label: 'Actions', sortable: false }
                  ]}
                  renderRow={(vendor: any, index: number) => {
                    const vendorData = category.vendors[index];
                    const score = ((vendorData.quality * 20) + (vendorData.delivery * 0.8) + ((100 - ((vendorData.price / Math.min(...category.vendors.map(v => v.price))) * 100)) * 0.2)).toFixed(1);
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          '&:hover': { backgroundColor: '#f9fafb' },
                          borderBottom: index === category.vendors.length - 1 ? 'none' : '1px solid #e4e7ec'
                        }}
                      >
                        <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Avatar sx={{ width: 40, height: 40, backgroundColor: colors.oxfordBlue, color: '#fff' }}>
                              <BusinessIcon />
                            </Avatar>
                            <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                              {vendorData.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                          <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                            R{vendorData.price.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue, mr: 1 }}>
                              {vendorData.quality}/5.0
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              {[...Array(5)].map((_, i) => (
                                <Box
                                  key={i}
                                  sx={{
                                    fontSize: '16px',
                                    color: i < vendorData.quality ? '#fbbf24' : '#e5e7eb'
                                  }}
                                >
                                  ★
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                          <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                            {vendorData.delivery}%
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                          <Chip 
                            label={score}
                            size="small"
                            sx={{
                              backgroundColor: parseFloat(score) > 90 ? '#dcfce7' : parseFloat(score) > 80 ? '#fef3c7' : '#fecaca',
                              color: parseFloat(score) > 90 ? colors.success : parseFloat(score) > 80 ? colors.warning : colors.error,
                              fontWeight: 600,
                              fontSize: '12px',
                              minWidth: '50px'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                          <IconButton 
                            size="small"
                            sx={{
                              color: colors.greyBlue,
                              '&:hover': {
                                color: colors.oxfordBlue,
                                backgroundColor: '#f9fafb'
                              }
                            }}
                          >
                            <MoreIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Procurement Planning Tab */}
      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ModernTable
              title="Demand Forecasting & Recommendations"
              subtitle="AI-powered demand predictions and procurement recommendations"
              searchPlaceholder="Search items..."
              data={mockProcurementPlanning}
              columns={[
                { id: 'item', label: 'Item', sortable: true },
                { id: 'currentStock', label: 'Current Stock', sortable: true },
                { id: 'predictedDemand', label: 'Predicted Demand', sortable: true },
                { id: 'recommendedOrder', label: 'Recommended Order', sortable: true },
                { id: 'priority', label: 'Priority', sortable: true },
                { id: 'leadTime', label: 'Lead Time', sortable: true },
                { id: 'actions', label: 'Actions', sortable: false }
              ]}
              renderRow={(item: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:hover': { backgroundColor: '#f9fafb' },
                    borderBottom: index === mockProcurementPlanning.length - 1 ? 'none' : '1px solid #e4e7ec'
                  }}
                >
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Avatar sx={{ width: 40, height: 40, backgroundColor: colors.oxfordBlue, color: '#fff' }}>
                        <InventoryIcon />
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue, mb: 0.5 }}>
                          {item.item}
                        </Typography>
                        <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                          Category: {item.category || 'General'}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                      {item.currentStock}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                        {item.predictedDemand}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.greyBlue }}>
                        Next 30 days
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 600, color: colors.success, fontSize: '16px' }}>
                      {item.recommendedOrder}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                    <Chip 
                      label={item.priority}
                      size="small"
                      sx={{
                        backgroundColor: item.priority === 'High' ? '#fecaca' : item.priority === 'Medium' ? '#fef3c7' : '#dcfce7',
                        color: item.priority === 'High' ? colors.error : item.priority === 'Medium' ? colors.warning : colors.success,
                        fontWeight: 500,
                        fontSize: '12px'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                    <Typography sx={{ color: colors.greyBlue }}>
                      {item.leadTime}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 4, px: 3, borderBottom: 'none', textAlign: 'center' }}>
                    <IconButton 
                      size="small"
                      sx={{
                        color: colors.greyBlue,
                        '&:hover': {
                          color: colors.oxfordBlue,
                          backgroundColor: '#f9fafb'
                        }
                      }}
                    >
                      <MoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Seasonal Insights</Typography>
              <Box sx={{ mb: 2, p: 2, bgcolor: 'info.50', borderRadius: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" color="info.main">
                  Summer Season Approaching
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Increase vegetable orders by 20% for seasonal demand
                </Typography>
              </Box>
              <Box sx={{ mb: 2, p: 2, bgcolor: 'warning.50', borderRadius: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" color="warning.main">
                  Bulk Order Opportunity
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  15% discount available for meat orders over R50,000
                </Typography>
              </Box>
              <Box sx={{ mb: 2, p: 2, bgcolor: 'success.50', borderRadius: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" color="success.main">
                  Cost Optimization
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Switch to Green Valley Farms for 6% savings on vegetables
                </Typography>
              </Box>
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {/* Create Purchase Order Dialog */}
      <Dialog open={poDialogOpen} onClose={() => setPoDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Purchase Order</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Supplier</InputLabel>
                <Select label="Supplier">
                  <MenuItem value="fresh-produce">Fresh Produce Co.</MenuItem>
                  <MenuItem value="premium-meats">Premium Meats Ltd.</MenuItem>
                  <MenuItem value="dairy-delights">Dairy Delights</MenuItem>
                </Select>
              </FormControl>
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
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Number of Items" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Total Amount (R)" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Expected Delivery" type="date" variant="outlined" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Notes" multiline rows={3} variant="outlined" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPoDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setPoDialogOpen(false)}>
            Create Purchase Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
