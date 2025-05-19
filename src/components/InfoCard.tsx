import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface InfoCardProps {
  label: string;
  value: string;
}

export default function InfoCard({ label, value }: InfoCardProps) {
  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent>
        {/* label */}
        <Typography
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
          sx={{ textTransform: 'uppercase' }}
        >
          {label}
        </Typography>

        <Typography
          variant="h5"
          fontWeight={600}
          sx={{
            fontSize: {
              xs: '1.4rem',   
              sm: '1.6rem',  
              md: '1.75rem', 
            },
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
