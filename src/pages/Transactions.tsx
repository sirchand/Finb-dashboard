import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip, TextField } from '@mui/material';
import React, { useState } from 'react';
import Header from '../components/Header';
import rawRows from '../data/transactions.json';

interface Transaction { date: string; category: string; description: string; amount: number; }
const rows = rawRows as Transaction[];

export default function Transactions() {
  const [filter, setFilter] = useState('');
  const filtered = rows.filter(r =>
    r.description.toLowerCase().includes(filter.toLowerCase()) ||
    r.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box>
      <Header name="Adam" />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Transactions</Typography>
        <TextField label="Search" variant="outlined" size="small" value={filter} onChange={e => setFilter(e.target.value)} sx={{ mb: 2, width: 300 }} />

        <Table>
          <TableHead>
            <TableRow>{['Date', 'Category', 'Description', 'Amount'].map(h => (<TableCell key={h}>{h}</TableCell>))}</TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(r => (
              <TableRow key={r.date + r.description}>
                <TableCell>{new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</TableCell>
                <TableCell><Chip label={r.category} color={r.category === 'Income' ? 'success' : 'error'} size="small" /></TableCell>
                <TableCell>{r.description}</TableCell>
                <TableCell sx={{ fontWeight: 500, color: r.amount > 0 ? 'success.main' : 'error.main' }}>
                  {r.amount > 0 ? `+$${r.amount}` : `-$${Math.abs(r.amount)}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

