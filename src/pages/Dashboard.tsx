import React, { useState, useMemo } from 'react';
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
  Paper,
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
  Pagination,
  Alert,
  OutlinedInput,
  InputAdornment,
  Tooltip,
  Stack,
  Divider,
  Avatar,
  LinearProgress,
  Badge,
  Fab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  GetApp as ExportIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Inventory as InventoryIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Schedule as ScheduleIcon,
  Clear as ClearIcon,
  Visibility as VisibilityIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

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
  backgroundColor: '#ffffff',
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

const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '16px 24px',
  backgroundColor: colors.white,
  border: '1px solid #e4e7ec',
  borderRadius: '12px',
  marginBottom: '24px'
}));

// Interfaces
interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  location: string;
  supplier: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';
  lastUpdated: string;
  cost: number;
}

interface FilterState {
  search: string;
  category: string;
  status: string;
  location: string;
  dateRange: {
    start: string;
    end: string;
  };
}

interface DialogState {
  open: boolean;
  mode: 'add' | 'edit' | 'delete' | 'view';
  item: InventoryItem | null;
}

// Mock data
const mockInventoryData: InventoryItem[] = [
  {
    id: '1',
    name: 'Burger Patties',
    category: 'Meat',
    quantity: 120,
    unit: 'pieces',
    expiryDate: '2024-01-15',
    location: 'Truck #001',
    supplier: 'Premium Beef Co.',
    status: 'in-stock',
    lastUpdated: '2024-01-10',
    cost: 1.25
  },
  {
    id: '2',
    name: 'French Fries',
    category: 'Frozen',
    quantity: 8,
    unit: 'kg',
    expiryDate: '2024-01-12',
    location: 'Truck #002',
    supplier: 'Golden Potato Ltd.',
    status: 'low-stock',
    lastUpdated: '2024-01-09',
    cost: 3.50
  },
  {
    id: '3',
    name: 'Chicken Wings',
    category: 'Meat',
    quantity: 0,
    unit: 'kg',
    expiryDate: '2024-01-08',
    location: 'Truck #003',
    supplier: 'Wings Express Co.',
    status: 'out-of-stock',
    lastUpdated: '2024-01-05',
    cost: 4.75
  }
];

const Dashboard: React.FC = () => {
  // State management
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventoryData);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    status: '',
    location: '',
    dateRange: { start: '', end: '' }
  });
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    mode: 'add',
    item: null
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<Partial<InventoryItem>>({});
  const itemsPerPage = 10;

  // Computed values
  const filteredInventory = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          item.category.toLowerCase().includes(filters.search.toLowerCase()) ||
                          item.supplier.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || item.category === filters.category;
      const matchesStatus = !filters.status || item.status === filters.status;
      const matchesLocation = !filters.location || item.location === filters.location;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
    });
  }, [inventory, filters]);

  const paginatedInventory = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredInventory.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredInventory, currentPage]);

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);

  // Metrics
  const metrics = useMemo(() => {
    const totalItems = inventory.length;
    const lowStockItems = inventory.filter(item => item.status === 'low-stock').length;
    const expiredItems = inventory.filter(item => item.status === 'expired').length;
    const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.cost), 0);

    return {
      totalItems,
      lowStockItems,
      expiredItems,
      totalValue
    };
  }, [inventory]);

  // Event handlers
  const handleFilterChange = (field: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      location: '',
      dateRange: { start: '', end: '' }
    });
    setCurrentPage(1);
  };

  const handleOpenDialog = (mode: DialogState['mode'], item?: InventoryItem) => {
    setDialog({ open: true, mode, item: item || null });
    if (item) {
      setFormData(item);
    } else {
      setFormData({});
    }
  };

  const handleCloseDialog = () => {
    setDialog({ open: false, mode: 'add', item: null });
    setFormData({});
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'success';
      case 'low-stock': return 'warning';
      case 'out-of-stock': return 'error';
      case 'expired': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return <CheckCircleIcon />;
      case 'low-stock': return <WarningIcon />;
      case 'out-of-stock': return <ErrorIcon />;
      case 'expired': return <ErrorIcon />;
      default: return <InventoryIcon />;
    }
  };

  return (
    <Box sx={{ p: 0, backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 600, 
            color: colors.oxfordBlue,
            mb: 1 
          }}
        >
          Food Inventory Dashboard
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: colors.greyBlue,
            mb: 3 
          }}
        >
          Monitor and manage your restaurant's inventory in real-time
        </Typography>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <Box>
                  <StatsValue>{metrics.totalItems}</StatsValue>
                  <StatsLabel>Total Items</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#e0f2fe' }}>
                <InventoryIcon sx={{ color: '#0284c7', fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <Box>
                  <StatsValue>{metrics.lowStockItems}</StatsValue>
                  <StatsLabel>Low Stock</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#fef3c7' }}>
                <WarningIcon sx={{ color: colors.warning, fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <Box>
                  <StatsValue>{metrics.expiredItems}</StatsValue>
                  <StatsLabel>Expired Items</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#fee2e2' }}>
                <ErrorIcon sx={{ color: colors.error, fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <Box>
                  <StatsValue>${metrics.totalValue.toFixed(2)}</StatsValue>
                  <StatsLabel>Total Value</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#dcfce7' }}>
                <TrendingUpIcon sx={{ color: colors.success, fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Filters and Actions */}
      <StyledCard sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
              Inventory Management
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <ModernButton
                variant="outlined"
                startIcon={<ExportIcon />}
                sx={{
                  borderColor: '#d0d5dd',
                  color: colors.greyBlue,
                  '&:hover': {
                    borderColor: '#98a2b3',
                    backgroundColor: colors.lightGrey
                  }
                }}
              >
                Export
              </ModernButton>
              <ModernButton
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('add')}
                sx={{
                  backgroundColor: colors.oxfordBlue,
                  '&:hover': {
                    backgroundColor: '#001a36'
                  }
                }}
              >
                Add Item
              </ModernButton>
            </Box>
          </Box>

          {/* Filter Controls */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search items..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#667085' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#d0d5dd',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.oxfordBlue,
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  <MenuItem value="Vegetables">Vegetables</MenuItem>
                  <MenuItem value="Meat">Meat</MenuItem>
                  <MenuItem value="Dairy">Dairy</MenuItem>
                  <MenuItem value="Grains">Grains</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="in-stock">In Stock</MenuItem>
                  <MenuItem value="low-stock">Low Stock</MenuItem>
                  <MenuItem value="out-of-stock">Out of Stock</MenuItem>
                  <MenuItem value="expired">Expired</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Location</InputLabel>
                <Select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="">All Locations</MenuItem>
                  <MenuItem value="Cold Storage A">Cold Storage A</MenuItem>
                  <MenuItem value="Freezer B">Freezer B</MenuItem>
                  <MenuItem value="Refrigerator C">Refrigerator C</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <ModernButton
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={handleClearFilters}
                  sx={{
                    borderColor: '#d0d5dd',
                    color: colors.greyBlue,
                    '&:hover': {
                      borderColor: '#98a2b3',
                      backgroundColor: colors.lightGrey
                    }
                  }}
                >
                  Clear
                </ModernButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>

      {/* Inventory Table */}
      <StyledCard sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: colors.lightGrey,
                borderBottom: '1px solid #e4e7ec'
              }}>
                <TableCell sx={{ 
                  fontWeight: 500, 
                  color: colors.greyBlue,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  py: 2,
                  px: 3,
                  borderBottom: 'none'
                }}>
                  Food Item
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 500, 
                  color: colors.greyBlue,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  py: 2,
                  px: 3,
                  borderBottom: 'none'
                }}>
                  Type
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 500, 
                  color: colors.greyBlue,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  py: 2,
                  px: 3,
                  borderBottom: 'none'
                }}>
                  Stock Level
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 500, 
                  color: colors.greyBlue,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  py: 2,
                  px: 3,
                  borderBottom: 'none'
                }}>
                  Availability
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 500, 
                  color: colors.greyBlue,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  py: 2,
                  px: 3,
                  borderBottom: 'none'
                }}>
                  Truck Location
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 500, 
                  color: colors.greyBlue,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  py: 2,
                  px: 3,
                  borderBottom: 'none'
                }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInventory.map((item, index) => (
                <TableRow 
                  key={item.id}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: colors.lightGrey 
                    },
                    borderBottom: index === paginatedInventory.length - 1 ? 'none' : '1px solid #e4e7ec'
                  }}
                >
                  <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                    <Box>
                      <Typography sx={{ 
                        fontWeight: 500, 
                        color: colors.oxfordBlue,
                        fontSize: '14px',
                        lineHeight: '20px'
                      }}>
                        {item.name}
                      </Typography>
                      <Typography sx={{ 
                        color: colors.greyBlue,
                        fontSize: '12px',
                        lineHeight: '18px'
                      }}>
                        {item.supplier}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                    <Typography sx={{ 
                      color: colors.oxfordBlue,
                      fontWeight: 400,
                      fontSize: '14px'
                    }}>
                      {item.category}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                    <Typography sx={{ 
                      color: colors.oxfordBlue,
                      fontWeight: 400,
                      fontSize: '14px'
                    }}>
                      {item.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                    <Typography sx={{ 
                      color: colors.oxfordBlue,
                      fontWeight: 400,
                      fontSize: '14px'
                    }}>
                      96%
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                    <Chip
                      label="Excellent"
                      size="small"
                      sx={{
                        backgroundColor: '#ecfdf3',
                        color: '#027a48',
                        fontWeight: 500,
                        fontSize: '12px',
                        height: '22px',
                        borderRadius: '6px',
                        border: 'none',
                        '& .MuiChip-label': {
                          px: 2,
                          py: 0
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                    <Typography sx={{ 
                      color: colors.greyBlue,
                      fontWeight: 400,
                      fontSize: '14px'
                    }}>
                      {item.location}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: '#d0d5dd',
                          color: colors.greyBlue,
                          fontSize: '12px',
                          fontWeight: 500,
                          textTransform: 'none',
                          minWidth: 'auto',
                          px: 2,
                          py: 0.5,
                          height: '28px',
                          borderRadius: '6px',
                          '&:hover': {
                            borderColor: '#98a2b3',
                            backgroundColor: colors.lightGrey
                          }
                        }}
                      >
                        View Profile
                      </Button>
                      <IconButton 
                        size="small"
                        sx={{ 
                          color: colors.greyBlue,
                          width: 28,
                          height: 28,
                          '&:hover': {
                            backgroundColor: colors.lightGrey
                          }
                        }}
                      >
                        <MoreVertIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          px: 3,
          py: 3,
          borderTop: '1px solid #e4e7ec'
        }}>
          <Typography variant="body2" sx={{ color: '#667085', fontSize: '14px' }}>
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredInventory.length)} of {filteredInventory.length} results
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              sx={{
                borderColor: '#d0d5dd',
                color: '#344054',
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'none',
                minWidth: 'auto',
                px: 2,
                py: 1,
                height: '36px',
                borderRadius: '6px',
                '&:hover': {
                  borderColor: '#98a2b3',
                  backgroundColor: '#f9fafb'
                },
                '&:disabled': {
                  borderColor: '#e4e7ec',
                  color: '#98a2b3'
                }
              }}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "contained" : "outlined"}
                size="small"
                onClick={() => setCurrentPage(page)}
                sx={{
                  backgroundColor: currentPage === page ? colors.oxfordBlue : 'transparent',
                  borderColor: currentPage === page ? colors.oxfordBlue : '#d0d5dd',
                  color: currentPage === page ? '#ffffff' : '#344054',
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'none',
                  minWidth: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  '&:hover': {
                    borderColor: currentPage === page ? colors.oxfordBlue : '#98a2b3',
                    backgroundColor: currentPage === page ? colors.oxfordBlue : '#f9fafb'
                  }
                }}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              sx={{
                borderColor: '#d0d5dd',
                color: '#344054',
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'none',
                minWidth: 'auto',
                px: 2,
                py: 1,
                height: '36px',
                borderRadius: '6px',
                '&:hover': {
                  borderColor: '#98a2b3',
                  backgroundColor: '#f9fafb'
                },
                '&:disabled': {
                  borderColor: '#e4e7ec',
                  color: '#98a2b3'
                }
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </StyledCard>

      {/* Dialog for Add/Edit/View/Delete */}
      <Dialog 
        open={dialog.open} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
          }
        }}
      >
        <DialogTitle sx={{ pb: 2, borderBottom: '1px solid #e4e7ec' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#101828' }}>
            {dialog.mode === 'add' && 'Add New Item'}
            {dialog.mode === 'edit' && 'Edit Item'}
            {dialog.mode === 'view' && 'Item Details'}
            {dialog.mode === 'delete' && 'Delete Item'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {dialog.mode === 'delete' ? (
            <Box>
              <Alert severity="warning" sx={{ mb: 2 }}>
                This action cannot be undone.
              </Alert>
              <Typography variant="body1" sx={{ color: '#344054' }}>
                Are you sure you want to delete "{dialog.item?.name}"?
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ color: '#667085' }}>
              {dialog.mode === 'view' ? 'Item details will be displayed here.' : 'Form fields will be displayed here.'}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #e4e7ec' }}>
          <Button 
            onClick={handleCloseDialog}
            sx={{ 
              color: '#344054',
              '&:hover': {
                backgroundColor: '#f9fafb'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            sx={{
              backgroundColor: dialog.mode === 'delete' ? '#dc2626' : '#7c3aed',
              '&:hover': {
                backgroundColor: dialog.mode === 'delete' ? '#b91c1c' : '#6d28d9'
              }
            }}
          >
            {dialog.mode === 'add' && 'Add Item'}
            {dialog.mode === 'edit' && 'Save Changes'}
            {dialog.mode === 'view' && 'Close'}
            {dialog.mode === 'delete' && 'Delete Item'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
