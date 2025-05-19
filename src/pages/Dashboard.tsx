import React from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import Notifications from '../components/Notifications';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import overview from '../data/overview.json';

const Dashboard: React.FC = () => {
  const { balance, income, expenses, savingsRatio, netWorth } = overview;

  return (
    <Box>
      <Header name="Adam" />

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Good evening, Adam
        </Typography>

        <Box
          component="section"
          sx={{
            display: 'grid',
            gap: 3,
            mt: 2,
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(5, 1fr)',
            },
          }}
        >
          <InfoCard label="Total Balance" value={`$${balance.toLocaleString()}`} />
          <InfoCard label="Monthly Income" value={`$${income.toLocaleString()}`} />
          <InfoCard label="Monthly Expenses" value={`$${expenses.toLocaleString()}`} />
          <InfoCard label="Savings Ratio" value={`${savingsRatio}%`} />

         
          <Notifications />
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Net Worth over Time
          </Typography>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={netWorth}>
              <defs>
                <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1976d2" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1976d2"
                strokeWidth={2.5}
                fill="url(#colorNet)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
