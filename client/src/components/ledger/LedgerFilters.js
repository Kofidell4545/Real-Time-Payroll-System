import React from 'react';
import {
  Paper,
  Box,
  TextField,
  Stack,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const LedgerFilters = ({ filters, onFilterChange }) => {
  const theme = useTheme();

  const handleDateChange = (type) => (date) => {
    const newDateRange = [...filters.dateRange];
    newDateRange[type === 'start' ? 0 : 1] = date;
    onFilterChange({
      ...filters,
      dateRange: newDateRange,
    });
  };

  const handleSearchChange = (event) => {
    onFilterChange({
      ...filters,
      searchQuery: event.target.value,
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', md: 'center' }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ flex: 1 }}
          >
            <DatePicker
              label="Start Date"
              value={filters.dateRange[0]}
              onChange={handleDateChange('start')}
              renderInput={(params) => (
                <TextField {...params} fullWidth size="small" />
              )}
            />
            <DatePicker
              label="End Date"
              value={filters.dateRange[1]}
              onChange={handleDateChange('end')}
              renderInput={(params) => (
                <TextField {...params} fullWidth size="small" />
              )}
            />
          </Stack>
        </LocalizationProvider>
        
        <TextField
          fullWidth
          size="small"
          label="Search by Employee or Wallet"
          value={filters.searchQuery}
          onChange={handleSearchChange}
          sx={{ flex: 1 }}
          placeholder="Name or 0x..."
        />
      </Stack>
    </Paper>
  );
};

export default LedgerFilters;
