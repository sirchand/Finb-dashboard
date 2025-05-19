
import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Chip,
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import rawData from '../data/notifications.json';


interface Alert {
    type: 'alert' | 'pending' | 'tip';
    message: string;
}


const rows = rawData as Alert[];


export default function Notifications() {
    return (
        <Card elevation={0} sx={{ height: '100%' }}>

            <CardHeader
                title="Notifications & Tips"
                sx={{
                    py: 1,
                    '& .MuiCardHeader-title': {
                        fontSize: '0.9rem',
                        fontWeight: 600,
                    },
                }}
            />

            <CardContent sx={{ pt: 0 }}>
                {rows.length ? (
                    <List dense>
                        {rows.map((a, i) => (
                            <ListItem
                                key={i}
                                disablePadding
                                alignItems="flex-start"
                                sx={{ mb: 0.5 }}
                            >
                                <ListItemIcon sx={{ minWidth: 32, mt: 0.3 }}>
                                    {a.type === 'tip' ? (
                                        <LightbulbIcon color="warning" fontSize="small" />
                                    ) : (
                                        <NotificationsActiveIcon
                                            color={a.type === 'alert' ? 'error' : 'warning'}
                                            fontSize="small"
                                        />
                                    )}
                                </ListItemIcon>

                                <ListItemText
                                    primary={
                                        <>
                                            <Typography variant="body2" component="span">
                                                {a.message}
                                            </Typography>
                                            {a.type === 'pending' && (
                                                <Chip
                                                    label="Pending"
                                                    size="small"
                                                    color="warning"
                                                    sx={{ ml: 1 }}
                                                />
                                            )}
                                        </>
                                    }
                                />


                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2">कोई नई सूचना नहीं</Typography>
                )}
            </CardContent>
        </Card>
    );
}
