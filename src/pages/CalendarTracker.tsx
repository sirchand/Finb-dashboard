import React, { useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Badge,
} from '@mui/material';
import {
  DateCalendar,
  PickersDay,
  PickersDayProps,
  pickersDayClasses,
} from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, isSameDay } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';
import rawDailyTx from '../data/dailyTransactions.json';

type Transaction = { description: string; amount: number };
const dailyTx = rawDailyTx as Record<string, Transaction[]>;
interface ExtraDayProps {
  hasSpending?: boolean;
}
function CustomPickersDay(
  props: PickersDayProps & ExtraDayProps,
) {
  const { hasSpending, day, outsideCurrentMonth, ...other } = props;

  return (
    <Badge
      overlap="circular"
      color="secondary"
      variant="dot"
      invisible={!hasSpending}
    >
      <PickersDay
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        {...other}
        sx={{
          [`&.${pickersDayClasses.today}`]: {
            border: '1px solid',
          },
          ...(hasSpending && {
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': { backgroundColor: '#115293' },
          }),
        }}
      />
    </Badge>
  );
}

export default function CalendarTracker() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [open, setOpen] = useState(false);

  const selectedKey = date ? format(date, 'yyyy-MM-dd') : '';
  const dayTransactions = dailyTx[selectedKey] ?? [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Spending Calendar
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            setOpen(true);
          }}
          slots={{ day: CustomPickersDay }}
          slotProps={{
            day: (ownerState) => {
              const key = format(ownerState.day, 'yyyy-MM-dd');
              return { hasSpending: Boolean(dailyTx[key]) } as any;
            },
          }}
        />
      </LocalizationProvider>

      <Modal open={open} onClose={() => setOpen(false)}>
       <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 320,
            p: 2,
            maxHeight: '90vh',      
            overflowY: 'auto',
          }}
        
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Typography variant="h6">
              {date && format(date, 'MMMM do, yyyy')}
            </Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {dayTransactions.length ? (
            <List dense>
              {dayTransactions.map((tx, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={tx.description}
                    secondary={`$${tx.amount}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No transactions</Typography>
          )}
        </Paper>
      </Modal>
    </Box>
  );
}
