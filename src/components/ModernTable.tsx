import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Stack,
  Card,
  Tooltip,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

interface Column {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  width?: string;
}

interface FilterOption {
  key: string;
  label: string;
  values: string[];
}

interface ModernTableProps {
  columns: Column[];
  data: any[];
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  renderRow: (item: any, index: number) => React.ReactNode;
  actions?: React.ReactNode;
  itemsPerPage?: number;
  showSearch?: boolean;
  showFilter?: boolean;
  showPagination?: boolean;
  filterOptions?: FilterOption[];
}

const ModernTable: React.FC<ModernTableProps> = ({
  columns,
  data,
  title,
  subtitle,
  searchPlaceholder = "Search...",
  onSearch,
  onFilter,
  renderRow,
  actions,
  itemsPerPage = 5,
  showSearch = true,
  showFilter = true,
  showPagination = true,
  filterOptions = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[filterKey]) {
        newFilters[filterKey] = [];
      }
      
      if (newFilters[filterKey].includes(value)) {
        newFilters[filterKey] = newFilters[filterKey].filter(v => v !== value);
      } else {
        newFilters[filterKey] = [...newFilters[filterKey], value];
      }
      
      if (newFilters[filterKey].length === 0) {
        delete newFilters[filterKey];
      }
      
      return newFilters;
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply column filters
    Object.entries(activeFilters).forEach(([filterKey, filterValues]) => {
      if (filterValues.length > 0) {
        result = result.filter(item =>
          filterValues.includes(String(item[filterKey]))
        );
      }
    });

    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        const aValue = String(a[sortColumn]);
        const bValue = String(b[sortColumn]);
        
        if (sortDirection === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }

    return result;
  }, [data, searchQuery, activeFilters, sortColumn, sortDirection]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const activeFilterCount = Object.values(activeFilters).reduce((count, filters) => count + filters.length, 0);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            fontSize: '18px', 
            color: '#101828',
            mb: 0.5
          }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ color: '#667085' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          {showSearch && (
            <TextField
              placeholder={searchPlaceholder}
              size="small"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              sx={{ 
                width: 240,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#d0d5dd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#98a2b3',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#7c3aed',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#667085', fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
          {showFilter && (
            <>
              <Button
                variant="outlined"
                size="small"
                startIcon={<FilterIcon />}
                onClick={handleFilterClick}
                sx={{
                  borderColor: activeFilterCount > 0 ? '#1e3a8a' : '#d0d5dd',
                  color: activeFilterCount > 0 ? '#1e3a8a' : '#344054',
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  height: '40px',
                  borderRadius: '8px',
                  position: 'relative',
                  '&:hover': {
                    borderColor: activeFilterCount > 0 ? '#1e40af' : '#98a2b3',
                    backgroundColor: '#f9fafb'
                  }
                }}
              >
                Filters
                {activeFilterCount > 0 && (
                  <Chip
                    label={activeFilterCount}
                    size="small"
                    sx={{
                      ml: 1,
                      height: '20px',
                      backgroundColor: '#1e3a8a',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 600,
                      '& .MuiChip-label': {
                        px: 1
                      }
                    }}
                  />
                )}
              </Button>
              {(activeFilterCount > 0 || searchQuery) && (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ClearIcon />}
                  onClick={clearFilters}
                  sx={{
                    borderColor: '#d0d5dd',
                    color: '#344054',
                    fontSize: '14px',
                    fontWeight: 500,
                    textTransform: 'none',
                    px: 2,
                    py: 1,
                    height: '40px',
                    borderRadius: '8px',
                    '&:hover': {
                      borderColor: '#98a2b3',
                      backgroundColor: '#f9fafb'
                    }
                  }}
                >
                  Clear
                </Button>
              )}
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={handleFilterClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 250,
                    borderRadius: '8px',
                    border: '1px solid #e4e7ec',
                    boxShadow: '0px 4px 8px rgba(16, 24, 40, 0.1)'
                  }
                }}
              >
                {filterOptions.map((filter) => (
                  <Box key={filter.key} sx={{ p: 2, borderBottom: '1px solid #f2f4f7' }}>
                    <Typography variant="subtitle2" sx={{ 
                      fontWeight: 600, 
                      color: '#101828',
                      mb: 1,
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {filter.label}
                    </Typography>
                    {filter.values.map((value) => (
                      <MenuItem
                        key={value}
                        onClick={() => handleFilterChange(filter.key, value)}
                        sx={{ 
                          px: 0, 
                          py: 0.5,
                          minHeight: 'auto',
                          '&:hover': {
                            backgroundColor: '#f9fafb'
                          }
                        }}
                      >
                        <Checkbox
                          checked={activeFilters[filter.key]?.includes(value) || false}
                          size="small"
                          sx={{ 
                            p: 0.5,
                            '&.Mui-checked': {
                              color: '#1e3a8a'
                            }
                          }}
                        />
                        <ListItemText 
                          primary={value}
                          primaryTypographyProps={{
                            fontSize: '14px',
                            color: '#344054'
                          }}
                        />
                      </MenuItem>
                    ))}
                  </Box>
                ))}
              </Menu>
            </>
          )}
          {actions}
        </Stack>
      </Box>

      {/* Table */}
      <Card sx={{ 
        border: '1px solid #e4e7ec', 
        borderRadius: '12px',
        boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
        overflow: 'hidden'
      }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: '#f9fafb',
                borderBottom: '1px solid #e4e7ec'
              }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    sx={{ 
                      fontWeight: 600, 
                      color: '#667085',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      py: 3,
                      px: 3,
                      borderBottom: 'none',
                      cursor: column.sortable ? 'pointer' : 'default',
                      width: column.width,
                      '&:hover': column.sortable ? {
                        backgroundColor: '#f2f4f7'
                      } : {}
                    }}
                    onClick={() => column.sortable && handleSort(column.id)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {column.label}
                      {column.sortable && sortColumn === column.id && (
                        sortDirection === 'asc' ? 
                          <ArrowUpIcon sx={{ fontSize: 14 }} /> : 
                          <ArrowDownIcon sx={{ fontSize: 14 }} />
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item, index) => renderRow(item, index))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {showPagination && totalPages > 1 && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            px: 3,
            py: 3,
            borderTop: '1px solid #e4e7ec'
          }}>
            <Typography variant="body2" sx={{ color: '#667085', fontSize: '14px' }}>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
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
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page: number;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setCurrentPage(page)}
                    sx={{
                      borderColor: currentPage === page ? '#1e3a8a' : '#d0d5dd',
                      backgroundColor: currentPage === page ? '#1e3a8a' : 'transparent',
                      color: currentPage === page ? '#ffffff' : '#344054',
                      fontSize: '14px',
                      fontWeight: 500,
                      textTransform: 'none',
                      minWidth: '36px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      '&:hover': {
                        borderColor: currentPage === page ? '#1e40af' : '#98a2b3',
                        backgroundColor: currentPage === page ? '#1e40af' : '#f9fafb'
                      }
                    }}
                  >
                    {page}
                  </Button>
                );
              })}
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
        )}
      </Card>
    </Box>
  );
};

export default ModernTable;
