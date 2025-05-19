import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  Stack,
} from '@mui/material';
import Header from '../components/Header';
import rawRows from '../data/budgets.json';

interface Budget {
  category: string;
  spent: number;
  limit: number;
}

const rows: Budget[] = (rawRows as Array<{ category: string; spent: string; limit: number }>).map(
  (r) => ({
    ...r,
    spent: Number(r.spent),
  })
);

export default function Budget() {
  return (
    <Box>
      <Header name="Adam" />

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Monthly Budget Assistant
        </Typography>

        <Stack spacing={2}>
          {rows.map((b) => {
            const pct = Math.min(100, Math.round((b.spent / b.limit) * 100));
            const color =
              pct < 75 ? 'primary' : pct < 100 ? 'warning' : 'error';

            return (
              <Paper key={b.category} variant="outlined" sx={{ p: 2 }}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  noWrap 
                >
                  {b.category} — ${b.spent} / ${b.limit}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  color={color as any}
                  sx={{ height: 8, borderRadius: 1 }}
                  aria-valuenow={pct}
                />
              </Paper>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
