import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { NavLink as RouterNavLink } from 'react-router-dom';

interface HeaderProps {
  name: string;
}

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Transactions', to: '/transactions' },
  { label: 'Reports', to: '/reports' },
  { label: 'Calendar', to: '/calendar' },
   { label: 'Budget', to: '/budget' },
];

export default function Header({ name }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      )
        return;
      setDrawerOpen(open);
    };


  const drawerContent = (
    <Box
      role="presentation"
      sx={{ width: 240 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map(({ label, to }) => (
          <ListItemButton key={to} component={RouterNavLink} to={to}>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>

    </Box>
  );


  return (
    <>
      <AppBar position="static" elevation={0} color="inherit">
        <Toolbar sx={{ justifyContent: 'space-between' }}>

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Cash
          </Typography>


          {isMobile ? (

            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton edge="end" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <IconButton aria-label="notifications">
                <NotificationsNoneIcon />
              </IconButton>
              <Avatar alt={name} src="https://i.pravatar.cc/40" sx={{ width: 32, height: 32 }} />
            </Stack>
          ) : (

            <Stack direction="row" spacing={3} alignItems="center">
              {navItems.map(({ label, to }) => (
                <MuiLink
                  key={to}
                  component={RouterNavLink}
                  to={to}
                  underline="none"
                  color="text.primary"
                  sx={{
                    typography: 'body2',
                    '&.active': { fontWeight: 600, color: 'primary.main' },
                  }}
                >
                  {label}
                </MuiLink>
              ))}

              <IconButton aria-label="notifications">
                <NotificationsNoneIcon />
              </IconButton>

              <Avatar
                alt={name}
                src="https://i.pravatar.cc/40"
                sx={{ width: 36, height: 36 }}
              />
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
}
