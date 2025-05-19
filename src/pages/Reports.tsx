import React, { useState } from 'react';
import {
  Box, Typography, ToggleButton, ToggleButtonGroup, Button,
} from '@mui/material';
import Header from '../components/Header';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, Tooltip,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import categories from '../data/categories.json';


const COLORS = ['#1976d2', '#dc004e', '#ffa000', '#388e3c', '#7b1fa2', '#f57c00', '#0288d1'];


export default function Reports() {

  const [period, setPeriod] = useState<'last' | 'month' | 'quarter'>('last');


  const [drill, setDrill] = useState<string | null>(null);

  const catData = (categories as Record<string, any[]>)[period];

  const dataToShow = drill
    ? catData.find((d) => d.name === drill)?.children ?? []
    : catData;

  return (
    <Box>
      <Header name="Adam" />

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Spending Report</Typography>

        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={(_, v) => v && setPeriod(v)}
          sx={{ mb: 3 }}
        >
          <ToggleButton value="last">Last month</ToggleButton>
          <ToggleButton value="month">This month</ToggleButton>
          <ToggleButton value="quarter">Last 3 months</ToggleButton>
        </ToggleButtonGroup>


        <Box sx={{ height: 200, mb: 5 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={catData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#1976d2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>


        <Box sx={{ height: 280 }}>
          <Typography variant="h6" gutterBottom>
            {drill ? `Breakdown – ${drill}` : 'Category Breakdown'}
          </Typography>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataToShow}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                label

                onClick={(event: React.MouseEvent<SVGElement, MouseEvent>, idx: number) => {
                  if (!drill) setDrill(catData[idx].name);
                }}
              >
                {dataToShow.map((_: any, i: number) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))
                }
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>


          {drill && (
            <Button
              onClick={() => setDrill(null)}
              size="small"
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Back
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
