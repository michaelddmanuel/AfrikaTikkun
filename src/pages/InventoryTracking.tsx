import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  TablePagination,
  styled,
  Tooltip,
  Avatar,
  Card,
  CardContent,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  CloudDownload as CloudDownloadIcon,
  Visibility as VisibilityIcon,
  History as HistoryIcon,
  Search as SearchIcon,
  GetApp as ExportIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { mockInventory } from '../mock-data/inventory';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Mock data for activity history
const mockActivityHistory = [
  { 
    id: 1, 
    date: new Date('2025-08-20T10:30:00'), 
    item: 'Chicken Breast', 
    type: 'Usage', 
    quantity: 5, 
    reason: 'Production', 
    notes: 'Used for daily special' 
  },
  { 
    id: 2, 
    date: new Date('2025-08-20T11:15:00'), 
    item: 'Tomatoes', 
    type: 'Damaged', 
    quantity: 3, 
    reason: 'Quality Issue', 
    notes: 'Found moldy upon delivery' 
  },
  { 
    id: 3, 
    date: new Date('2025-08-19T09:45:00'), 
    item: 'Flour', 
    type: 'Usage', 
    quantity: 10, 
    reason: 'Production', 
    notes: 'For bread baking' 
  },
  { 
    id: 4, 
    date: new Date('2025-08-18T14:20:00'), 
    item: 'Milk', 
    type: 'Usage', 
    quantity: 4, 
    reason: 'Production', 
    notes: 'For dessert preparation' 
  },
  { 
    id: 5, 
    date: new Date('2025-08-18T16:30:00'), 
    item: 'Eggs', 
    type: 'Lost', 
    quantity: 12, 
    reason: 'Breakage', 
    notes: 'Dropped during inventory transfer' 
  },
];

// Enhanced inventory items with usage data
const enhancedInventory = mockInventory.map(item => ({
  id: Number(item.id),
  name: item.itemId, // Using itemId as name
  category: item.locationId, // Using locationId as category for demo
  quantity: Number(item.unitCost) * 100, // Generating a quantity for demo
  unit: item.unitType,
  price: Number(item.unitCost),
  supplier: item.supplierId,
  used: Math.floor(Math.random() * 50) + 10,
  damaged: Math.floor(Math.random() * 10),
  currentStock: Number(item.unitCost) * 100 - (Math.floor(Math.random() * 50) + 10) - Math.floor(Math.random() * 10)
}));

// Activity types for dropdown
const activityTypes = ['Usage', 'Damaged', 'Lost', 'Received', 'Returned'];
const reasonTypes = ['Production', 'Quality Issue', 'Breakage', 'Spoilage', 'Expiration', 'Other'];

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

// Styled components
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
  marginBottom: theme.spacing(3)
}));

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  height: '100%',
  marginBottom: theme.spacing(3)
}));

interface StatusChipProps {
  theme: any;
  status?: string;
}

const StatusChip = styled(Chip)<{ status?: string }>((props) => {  
  const { theme, status } = props;
  return {
    height: 24,
    fontWeight: 500,
    borderRadius: 8,
    fontSize: '0.75rem',
    ...(status === 'Low' && {
      backgroundColor: 'rgba(255, 159, 64, 0.1)',
      color: 'rgb(255, 159, 64)',
    }),
    ...(status === 'Good' && {
      backgroundColor: 'rgba(75, 192, 192, 0.1)',
      color: 'rgb(75, 192, 192)',
    }),
    ...(status === 'Critical' && {
      backgroundColor: 'rgba(255, 99, 132, 0.1)',
      color: 'rgb(255, 99, 132)',
    }),
  };
});

interface TypeChipProps {
  theme: any;
  type?: string;
}

const TypeChip = styled(Chip)<{ type?: string }>((props) => {
  const { theme, type } = props;
  return {
    height: 24,
    fontWeight: 500,
    borderRadius: 8,
    fontSize: '0.75rem',
    ...(type === 'Usage' && {
      backgroundColor: 'rgba(54, 162, 235, 0.1)',
      color: 'rgb(54, 162, 235)',
    }),
    ...(type === 'Damaged' || type === 'Lost' ? {
      backgroundColor: 'rgba(255, 99, 132, 0.1)',
      color: 'rgb(255, 99, 132)',
    } : {}),
    ...(type === 'Received' && {
      backgroundColor: 'rgba(75, 192, 192, 0.1)',
      color: 'rgb(75, 192, 192)',
    }),
    ...(type === 'Returned' && {
      backgroundColor: 'rgba(153, 102, 255, 0.1)', 
      color: 'rgb(153, 102, 255)',
    }),
  };
});

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  supplier: string;
  used?: number;
  damaged?: number;
  currentStock?: number;
}

interface ActivityItem {
  id: number;
  date: Date;
  item: string;
  type: string;
  quantity: number;
  reason: string;
  notes: string;
}

interface DialogState {
  open: boolean;
  mode: 'create' | 'edit' | 'view' | 'delete';
  itemType: 'inventory' | 'activity';
  item?: InventoryItem | ActivityItem | null;
}

const InventoryTracking: React.FC = () => {
  // State management
  const [inventory, setInventory] = useState<InventoryItem[]>(enhancedInventory);
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivityHistory);
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    mode: 'create',
    itemType: 'inventory',
    item: null
  });
  
  // Form state for new/edit items
  const [formItem, setFormItem] = useState<Record<string, any>>({});
  
  // Pagination state
  const [inventoryPage, setInventoryPage] = useState(0);
  const [inventoryRowsPerPage, setInventoryRowsPerPage] = useState(5);
  const [activityPage, setActivityPage] = useState(0);
  const [activityRowsPerPage, setActivityRowsPerPage] = useState(5);

  // Filter state
  const [inventoryFilter, setInventoryFilter] = useState('');
  const [activityFilter, setActivityFilter] = useState('');

  // Dialog handlers
  const handleOpenDialog = (mode: 'create' | 'edit' | 'view' | 'delete', itemType: 'inventory' | 'activity', item?: any) => {
    setDialog({
      open: true,
      mode,
      itemType,
      item
    });
    
    if (mode === 'edit' || mode === 'view') {
      setFormItem(item);
    } else if (mode === 'create') {
      setFormItem({});
    }
  };

  const handleCloseDialog = () => {
    setDialog({
      ...dialog,
      open: false
    });
    setFormItem({});
  };

  // Form handlers
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target;
    setFormItem({
      ...formItem,
      [name]: value
    });
  };

  // CRUD operations
  const handleSaveInventoryItem = () => {
    if (dialog.mode === 'create') {
      // Create new item with generated ID
      const newItem: InventoryItem = {
        id: Math.max(...inventory.map(item => item.id)) + 1,
        name: formItem.name || '',
        category: formItem.category || '',
        quantity: formItem.quantity || 0,
        unit: formItem.unit || '',
        price: formItem.price || 0,
        supplier: formItem.supplier || '',
        used: 0,
        damaged: 0,
        currentStock: formItem.quantity || 0
      };
      setInventory([...inventory, newItem]);
    } else if (dialog.mode === 'edit') {
      // Update existing item
      setInventory(inventory.map(item => {
        if (item.id === formItem.id) {
          return {
            ...item,
            name: formItem.name || item.name,
            category: formItem.category || item.category,
            quantity: formItem.quantity || item.quantity,
            unit: formItem.unit || item.unit,
            price: formItem.price || item.price,
            supplier: formItem.supplier || item.supplier,
            used: formItem.used || item.used || 0,
            damaged: formItem.damaged || item.damaged || 0,
            currentStock: formItem.currentStock || item.currentStock || 0
          };
        }
        return item;
      }));
    }
    handleCloseDialog();
  };

  const handleSaveActivityItem = () => {
    if (dialog.mode === 'create') {
      // Create new activity with generated ID
      const newActivity: ActivityItem = {
        id: Math.max(...activities.map(item => item.id)) + 1,
        date: formItem.date || new Date(),
        item: formItem.item || '',
        type: formItem.type || '',
        quantity: formItem.quantity || 0,
        reason: formItem.reason || '',
        notes: formItem.notes || ''
      };
      setActivities([...activities, newActivity]);
      
      // Update inventory based on activity type
      if (formItem.type === 'Usage' || formItem.type === 'Damaged' || formItem.type === 'Lost') {
        setInventory(inventory.map(item => {
          if (item.name === formItem.item) {
            // Create a proper copy with all required fields
            const updatedItem: InventoryItem = { ...item };
            
            if (formItem.type === 'Usage') {
              updatedItem.used = (updatedItem.used || 0) + (formItem.quantity || 0);
            } else {
              updatedItem.damaged = (updatedItem.damaged || 0) + (formItem.quantity || 0);
            }
            
            updatedItem.currentStock = updatedItem.quantity - (updatedItem.used || 0) - (updatedItem.damaged || 0);
            return updatedItem;
          }
          return item;
        }));
      }
    } else if (dialog.mode === 'edit') {
      // Update existing activity
      setActivities(activities.map(activity => {
        if (activity.id === formItem.id) {
          return {
            ...activity,
            date: formItem.date || activity.date,
            item: formItem.item || activity.item,
            type: formItem.type || activity.type,
            quantity: formItem.quantity || activity.quantity,
            reason: formItem.reason || activity.reason,
            notes: formItem.notes || activity.notes
          };
        }
        return activity;
      }));
    }
    handleCloseDialog();
  };

  const handleDeleteItem = () => {
    if (dialog.itemType === 'inventory') {
      setInventory(inventory.filter(item => item.id !== dialog.item?.id));
    } else {
      setActivities(activities.filter(activity => activity.id !== dialog.item?.id));
    }
    handleCloseDialog();
  };

  // Pagination handlers
  const handleInventoryPageChange = (event: unknown, newPage: number) => {
    setInventoryPage(newPage);
  };

  const handleInventoryRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInventoryRowsPerPage(parseInt(event.target.value, 10));
    setInventoryPage(0);
  };

  const handleActivityPageChange = (event: unknown, newPage: number) => {
    setActivityPage(newPage);
  };

  const handleActivityRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActivityRowsPerPage(parseInt(event.target.value, 10));
    setActivityPage(0);
  };

  // Filter handlers
  const filteredInventory = inventory.filter(
    item => item.name.toLowerCase().includes(inventoryFilter.toLowerCase()) ||
            item.category.toLowerCase().includes(inventoryFilter.toLowerCase())
  );

  const filteredActivities = activities.filter(
    activity => activity.item.toLowerCase().includes(activityFilter.toLowerCase()) ||
                activity.type.toLowerCase().includes(activityFilter.toLowerCase()) ||
                activity.reason.toLowerCase().includes(activityFilter.toLowerCase())
  );

  // Calculate inventory stock status
  const getStockStatus = (item: InventoryItem) => {
    const stockPercent = item.currentStock! / item.quantity;
    if (stockPercent < 0.2) return 'Critical';
    if (stockPercent < 0.5) return 'Low';
    return 'Good';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Modern Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography sx={{ 
              fontSize: '32px', 
              fontWeight: 600, 
              color: colors.textPrimary,
              lineHeight: '40px',
              mb: 1
            }}>
              Inventory Tracking
            </Typography>
            <Typography sx={{ 
              fontSize: '16px', 
              color: colors.textSecondary,
              lineHeight: '24px'
            }}>
              Monitor inventory usage, track activities, and manage stock levels in real-time
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined"
              component={Link}
              to="/dashboard"
              sx={{
                borderColor: colors.borderGrey,
                color: colors.textSecondary,
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'none',
                px: 3,
                py: 1.5,
                borderRadius: '8px',
                '&:hover': {
                  borderColor: colors.textTertiary,
                  backgroundColor: colors.lightGrey
                }
              }}
            >
              Dashboard
            </Button>
            <Button 
              variant="outlined"
              component={Link}
              to="/inventory-analytics"
              sx={{
                borderColor: colors.borderGrey,
                color: colors.textSecondary,
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'none',
                px: 3,
                py: 1.5,
                borderRadius: '8px',
                '&:hover': {
                  borderColor: colors.textTertiary,
                  backgroundColor: colors.lightGrey
                }
              }}
            >
              Analytics
            </Button>
            <Button 
              variant="contained"
              startIcon={<HistoryIcon />}
              onClick={() => handleOpenDialog('create', 'activity')}
              sx={{
                backgroundColor: colors.oxfordBlue,
                color: colors.white,
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'none',
                px: 3,
                py: 1.5,
                borderRadius: '8px',
                boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                '&:hover': {
                  backgroundColor: '#001a3a',
                  boxShadow: '0px 4px 8px rgba(16, 24, 40, 0.1)'
                }
              }}
            >
              Record Activity
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Current Inventory Status Section */}
      <StyledCard sx={{ overflow: 'hidden', mb: 4 }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, borderBottom: `1px solid ${colors.borderGrey}` }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography sx={{ 
                  fontSize: '20px', 
                  fontWeight: 600, 
                  color: colors.textPrimary,
                  lineHeight: '28px',
                  mb: 0.5
                }}>
                  Current Inventory Status
                </Typography>
                <Typography sx={{ 
                  fontSize: '14px', 
                  color: colors.textSecondary,
                  lineHeight: '20px'
                }}>
                  Track stock levels, usage, and damaged items across all inventory
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  size="small"
                  placeholder="Search inventory..."
                  value={inventoryFilter}
                  onChange={(e) => setInventoryFilter(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: colors.textTertiary, fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: '240px',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: colors.lightGrey,
                      borderRadius: '8px',
                      fontSize: '14px',
                      '& fieldset': {
                        borderColor: colors.borderGrey,
                      },
                      '&:hover fieldset': {
                        borderColor: colors.textTertiary,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: colors.oxfordBlue,
                      },
                    }
                  }}
                />
                <IconButton 
                  sx={{ 
                    color: colors.textTertiary,
                    '&:hover': { backgroundColor: colors.lightGrey }
                  }}
                >
                  <FilterIcon />
                </IconButton>
                <IconButton 
                  sx={{ 
                    color: colors.textTertiary,
                    '&:hover': { backgroundColor: colors.lightGrey }
                  }}
                >
                  <ExportIcon />
                </IconButton>
                <Button 
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('create', 'inventory')}
                  sx={{
                    backgroundColor: colors.oxfordBlue,
                    color: colors.white,
                    fontSize: '14px',
                    fontWeight: 500,
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                    '&:hover': {
                      backgroundColor: '#001a3a',
                      boxShadow: '0px 4px 8px rgba(16, 24, 40, 0.1)'
                    }
                  }}
                >
                  Add Item
                </Button>
              </Box>
            </Box>
          </Box>
        
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
                    Item Name
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
                    Category
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
                  }} align="right">
                    Total Stock
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
                  }} align="right">
                    Used
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
                  }} align="right">
                    Damaged/Lost
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
                  }} align="right">
                    Current Stock
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
                    Status
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
                  }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInventory
                  .slice(inventoryPage * inventoryRowsPerPage, inventoryPage * inventoryRowsPerPage + inventoryRowsPerPage)
                  .map((item, index) => (
                    <TableRow 
                      key={item.id}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: colors.lightGrey 
                        },
                        borderBottom: index === filteredInventory.slice(inventoryPage * inventoryRowsPerPage, inventoryPage * inventoryRowsPerPage + inventoryRowsPerPage).length - 1 ? 'none' : '1px solid #e4e7ec'
                      }}
                    >
                      <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ 
                            width: 32, 
                            height: 32, 
                            backgroundColor: colors.lightGrey,
                            border: '1px solid #e4e7ec',
                            color: colors.greyBlue,
                            fontSize: '12px',
                            fontWeight: 600
                          }}>
                            {item.name.charAt(0)}
                          </Avatar>
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
                      <TableCell align="right" sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                        <Typography sx={{ 
                          color: colors.oxfordBlue,
                          fontWeight: 500,
                          fontSize: '14px'
                        }}>
                          {item.quantity} {item.unit}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                        <Typography sx={{ 
                          color: colors.oxfordBlue,
                          fontWeight: 500,
                          fontSize: '14px'
                        }}>
                          {item.used} {item.unit}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                        <Typography sx={{ 
                          color: colors.oxfordBlue,
                          fontWeight: 500,
                          fontSize: '14px'
                        }}>
                          {item.damaged} {item.unit}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                        <Typography sx={{ 
                          color: colors.oxfordBlue,
                          fontWeight: 500,
                          fontSize: '14px'
                        }}>
                          {item.currentStock} {item.unit}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                        <Chip
                          label={getStockStatus(item)}
                          size="small"
                          sx={{
                            backgroundColor: getStockStatus(item) === 'Critical' ? '#fef2f2' : 
                                           getStockStatus(item) === 'Low' ? '#fefce8' : '#ecfdf3',
                            color: getStockStatus(item) === 'Critical' ? '#dc2626' : 
                                   getStockStatus(item) === 'Low' ? '#d97706' : '#027a48',
                            fontWeight: 500,
                            fontSize: '12px',
                            height: '20px',
                            borderRadius: '10px',
                            '& .MuiChip-label': {
                              px: 1.5
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleOpenDialog('view', 'inventory', item)}
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
                            View
                          </Button>
                          <IconButton 
                            size="small"
                            onClick={() => handleOpenDialog('edit', 'inventory', item)}
                            sx={{ 
                              color: colors.greyBlue,
                              width: 28,
                              height: 28,
                              '&:hover': {
                                backgroundColor: colors.lightGrey
                              }
                            }}
                          >
                            <EditIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                          <IconButton 
                            size="small"
                            onClick={() => handleOpenDialog('delete', 'inventory', item)}
                            sx={{ 
                              color: colors.greyBlue,
                              width: 28,
                              height: 28,
                              '&:hover': {
                                backgroundColor: colors.lightGrey
                              }
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ px: 3, py: 2, borderTop: `1px solid ${colors.borderGrey}` }}>
            <TablePagination
              component="div"
              count={filteredInventory.length}
              page={inventoryPage}
              onPageChange={handleInventoryPageChange}
              rowsPerPage={inventoryRowsPerPage}
              onRowsPerPageChange={handleInventoryRowsPerPageChange}
              rowsPerPageOptions={[5, 10, 25]}
              sx={{
                '& .MuiTablePagination-toolbar': {
                  paddingLeft: 0,
                  paddingRight: 0,
                },
                '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                  fontSize: '14px',
                  color: colors.textSecondary,
                },
                '& .MuiTablePagination-select': {
                  fontSize: '14px',
                }
              }}
            />
          </Box>
        </CardContent>
      </StyledCard>

      {/* Recent Activity History Section */}
      <StyledCard sx={{ overflow: 'hidden' }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, borderBottom: `1px solid ${colors.borderGrey}` }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography sx={{ 
                  fontSize: '20px', 
                  fontWeight: 600, 
                  color: colors.textPrimary,
                  lineHeight: '28px',
                  mb: 0.5
                }}>
                  Recent Activity History
                </Typography>
                <Typography sx={{ 
                  fontSize: '14px', 
                  color: colors.textSecondary,
                  lineHeight: '20px'
                }}>
                  Monitor all inventory activities, usage, and stock movements
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  size="small"
                  placeholder="Search activities..."
                  value={activityFilter}
                  onChange={(e) => setActivityFilter(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: colors.textTertiary, fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: '240px',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: colors.lightGrey,
                      borderRadius: '8px',
                      fontSize: '14px',
                      '& fieldset': {
                        borderColor: colors.borderGrey,
                      },
                      '&:hover fieldset': {
                        borderColor: colors.textTertiary,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: colors.oxfordBlue,
                      },
                    }
                  }}
                />
                <IconButton 
                  sx={{ 
                    color: colors.textTertiary,
                    '&:hover': { backgroundColor: colors.lightGrey }
                  }}
                >
                  <FilterIcon />
                </IconButton>
                <Button 
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('create', 'activity')}
                  sx={{
                    backgroundColor: colors.oxfordBlue,
                    color: colors.white,
                    fontSize: '14px',
                    fontWeight: 500,
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                    '&:hover': {
                      backgroundColor: '#001a3a',
                      boxShadow: '0px 4px 8px rgba(16, 24, 40, 0.1)'
                    }
                  }}
                >
                  Add Activity
                </Button>
              </Box>
            </Box>
          </Box>
        
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
                    Date
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
                    Item
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
                  }} align="right">
                    Quantity
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
                    Reason
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
                    Notes
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
                  }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredActivities
                  .slice(activityPage * activityRowsPerPage, activityPage * activityRowsPerPage + activityRowsPerPage)
                  .map((activity, index) => (
                    <TableRow 
                      key={activity.id}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: colors.lightGrey 
                        },
                        borderBottom: index === filteredActivities.slice(activityPage * activityRowsPerPage, activityPage * activityRowsPerPage + activityRowsPerPage).length - 1 ? 'none' : '1px solid #e4e7ec'
                      }}
                    >
                      <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                        <Typography sx={{ 
                          color: colors.oxfordBlue,
                          fontWeight: 400,
                          fontSize: '14px'
                        }}>
                          {activity.date.toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                        <Typography sx={{ 
                          color: colors.oxfordBlue,
                          fontWeight: 500,
                          fontSize: '14px'
                        }}>
                          {activity.item}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                        <Chip
                          label={activity.type}
                          size="small"
                          sx={{
                            backgroundColor: activity.type === 'Usage' ? '#eff6ff' : 
                                           activity.type === 'Damaged' || activity.type === 'Lost' ? '#fef2f2' : 
                                           activity.type === 'Received' ? '#ecfdf3' : '#f3f4f6',
                            color: activity.type === 'Usage' ? '#1d4ed8' : 
                                   activity.type === 'Damaged' || activity.type === 'Lost' ? '#dc2626' : 
                                   activity.type === 'Received' ? '#027a48' : '#374151',
                            fontWeight: 500,
                            fontSize: '12px',
                            height: '20px',
                            borderRadius: '10px',
                            '& .MuiChip-label': {
                              px: 1.5
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                        <Typography sx={{ 
                          color: colors.oxfordBlue,
                          fontWeight: 500,
                          fontSize: '14px'
                        }}>
                          {activity.quantity}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                        <Typography sx={{ 
                          color: colors.oxfordBlue,
                          fontWeight: 400,
                          fontSize: '14px'
                        }}>
                          {activity.reason}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                        <Typography sx={{ 
                          color: colors.greyBlue,
                          fontWeight: 400,
                          fontSize: '14px'
                        }}>
                          {activity.notes}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ py: 3, px: 3, borderBottom: 'none' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton 
                            size="small"
                            onClick={() => handleOpenDialog('edit', 'activity', activity)}
                            sx={{ 
                              color: colors.greyBlue,
                              width: 28,
                              height: 28,
                              '&:hover': {
                                backgroundColor: colors.lightGrey
                              }
                            }}
                          >
                            <EditIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                          <IconButton 
                            size="small"
                            onClick={() => handleOpenDialog('delete', 'activity', activity)}
                            sx={{ 
                              color: colors.greyBlue,
                              width: 28,
                              height: 28,
                              '&:hover': {
                                backgroundColor: colors.lightGrey
                              }
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ px: 3, py: 2, borderTop: `1px solid ${colors.borderGrey}` }}>
            <TablePagination
              component="div"
              count={filteredActivities.length}
              page={activityPage}
              onPageChange={handleActivityPageChange}
              rowsPerPage={activityRowsPerPage}
              onRowsPerPageChange={handleActivityRowsPerPageChange}
              rowsPerPageOptions={[5, 10, 25]}
              sx={{
                '& .MuiTablePagination-toolbar': {
                  paddingLeft: 0,
                  paddingRight: 0,
                },
                '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                  fontSize: '14px',
                  color: colors.textSecondary,
                },
                '& .MuiTablePagination-select': {
                  fontSize: '14px',
                }
              }}
            />
          </Box>
        </CardContent>
      </StyledCard>

      {/* Dialogs for CRUD operations */}
      {/* Inventory Item Dialog */}
      <Dialog open={dialog.open && dialog.itemType === 'inventory' && dialog.mode !== 'delete'} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>
          {dialog.mode === 'create' ? 'Add New Inventory Item' : 
           dialog.mode === 'edit' ? 'Edit Inventory Item' : 'View Inventory Item'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Item Name"
                name="name"
                value={formItem.name || ''}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
                disabled={dialog.mode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                name="category"
                value={formItem.category || ''}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
                disabled={dialog.mode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Total Quantity"
                name="quantity"
                type="number"
                value={formItem.quantity || ''}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
                disabled={dialog.mode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Unit"
                name="unit"
                value={formItem.unit || ''}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
                disabled={dialog.mode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price per Unit"
                name="price"
                type="number"
                value={formItem.price || ''}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
                disabled={dialog.mode === 'view'}
                InputProps={{
                  startAdornment: <Typography variant="body2">$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Supplier"
                name="supplier"
                value={formItem.supplier || ''}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                disabled={dialog.mode === 'view'}
              />
            </Grid>
            {dialog.mode !== 'create' && (
              <>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Used"
                    name="used"
                    type="number"
                    value={formItem.used || 0}
                    onChange={handleFormChange}
                    fullWidth
                    margin="normal"
                    disabled={dialog.mode === 'view'}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Damaged/Lost"
                    name="damaged"
                    type="number"
                    value={formItem.damaged || 0}
                    onChange={handleFormChange}
                    fullWidth
                    margin="normal"
                    disabled={dialog.mode === 'view'}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Current Stock"
                    type="number"
                    value={
                      (formItem.quantity || 0) - 
                      (formItem.used || 0) - 
                      (formItem.damaged || 0)
                    }
                    fullWidth
                    margin="normal"
                    disabled
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {dialog.mode !== 'view' && (
            <Button 
              onClick={handleSaveInventoryItem} 
              variant="contained" 
              color="primary"
            >
              {dialog.mode === 'create' ? 'Add Item' : 'Save Changes'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Activity Dialog */}
      <Dialog open={dialog.open && dialog.itemType === 'activity' && dialog.mode !== 'delete'} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>
          {dialog.mode === 'create' ? 'Record New Activity' : 
           dialog.mode === 'edit' ? 'Edit Activity Record' : 'View Activity Record'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={formItem.date || null}
                  onChange={(newValue) => {
                    setFormItem({
                      ...formItem,
                      date: newValue
                    });
                  }}
                  disabled={dialog.mode === 'view'}
                  slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Item</InputLabel>
                <Select
                  name="item"
                  value={formItem.item || ''}
                  onChange={handleFormChange}
                  disabled={dialog.mode === 'view'}
                  label="Item"
                >
                  {inventory.map(item => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Activity Type</InputLabel>
                <Select
                  name="type"
                  value={formItem.type || ''}
                  onChange={handleFormChange}
                  disabled={dialog.mode === 'view'}
                  label="Activity Type"
                >
                  {activityTypes.map(type => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={formItem.quantity || ''}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
                disabled={dialog.mode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Reason</InputLabel>
                <Select
                  name="reason"
                  value={formItem.reason || ''}
                  onChange={handleFormChange}
                  disabled={dialog.mode === 'view'}
                  label="Reason"
                >
                  {reasonTypes.map(reason => (
                    <MenuItem key={reason} value={reason}>
                      {reason}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                name="notes"
                value={formItem.notes || ''}
                onChange={handleFormChange}
                fullWidth
                multiline
                rows={3}
                margin="normal"
                disabled={dialog.mode === 'view'}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {dialog.mode !== 'view' && (
            <Button 
              onClick={handleSaveActivityItem} 
              variant="contained" 
              color="primary"
            >
              {dialog.mode === 'create' ? 'Record Activity' : 'Save Changes'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialog.open && dialog.mode === 'delete'} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this {dialog.itemType === 'inventory' ? 'inventory item' : 'activity record'}?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDeleteItem} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryTracking;
