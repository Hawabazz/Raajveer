import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Grid,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';

const ADMIN_CODE = '88552200';

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    subscription: 'Active',
    expiryDate: '2025-02-25',
    lastLogin: '2025-01-25 15:30',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    subscription: 'Expired',
    expiryDate: '2025-01-20',
    lastLogin: '2025-01-24 10:15',
  },
];

const AdminPanel = () => {
  const [code, setCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState(mockUsers);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    subscription: '',
    expiryDate: '',
  });

  const handleLogin = () => {
    if (code === ADMIN_CODE) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid admin code');
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers([
      ...users,
      {
        id: users.length + 1,
        ...newUser,
        lastLogin: 'Never',
      },
    ]);
    setNewUser({
      name: '',
      email: '',
      subscription: '',
      expiryDate: '',
    });
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleBlockUser = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, subscription: user.subscription === 'Blocked' ? 'Active' : 'Blocked' }
          : user
      )
    );
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
          >
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Admin Login
              </Typography>
              <TextField
                fullWidth
                type="password"
                label="Admin Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                error={!!error}
                helperText={error}
              />
              <Button variant="contained" color="primary" onClick={handleLogin} size="large">
                Login
              </Button>
            </Paper>
          </motion.div>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Paper sx={{ width: '100%', mb: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Overview" />
            <Tab label="User Management" />
            <Tab label="Subscriptions" />
            <Tab label="Reports" />
          </Tabs>
        </Paper>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Users
                  </Typography>
                  <Typography variant="h3">{users.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Active Subscriptions
                  </Typography>
                  <Typography variant="h3">
                    {users.filter((user) => user.subscription === 'Active').length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Recent Activities
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="New user registration" secondary="5 minutes ago" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Subscription renewal" secondary="1 hour ago" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Add New User
                </Typography>
                <form onSubmit={handleAddUser}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Subscription"
                        value={newUser.subscription}
                        onChange={(e) => setNewUser({ ...newUser, subscription: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Expiry Date"
                        type="date"
                        value={newUser.expiryDate}
                        onChange={(e) => setNewUser({ ...newUser, expiryDate: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Add User
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  User List
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Subscription</TableCell>
                        <TableCell>Expiry Date</TableCell>
                        <TableCell>Last Login</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.subscription}</TableCell>
                          <TableCell>{user.expiryDate}</TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleBlockUser(user.id)}>
                              {user.subscription === 'Blocked' ? (
                                <CheckCircleIcon color="primary" />
                              ) : (
                                <BlockIcon color="warning" />
                              )}
                            </IconButton>
                            <IconButton onClick={() => handleDeleteUser(user.id)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Subscription Management
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Plan</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Active Users</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Basic</TableCell>
                        <TableCell>1 Month</TableCell>
                        <TableCell>$500</TableCell>
                        <TableCell>15</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Standard</TableCell>
                        <TableCell>6 Months</TableCell>
                        <TableCell>$3000</TableCell>
                        <TableCell>8</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Premium</TableCell>
                        <TableCell>12 Months</TableCell>
                        <TableCell>$6000</TableCell>
                        <TableCell>5</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 3 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Reports
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="User Activity Report"
                      secondary="Detailed user login and activity statistics"
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <DownloadIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Subscription Report"
                      secondary="Overview of active and expired subscriptions"
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <DownloadIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Revenue Report"
                      secondary="Monthly revenue and subscription statistics"
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <DownloadIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default AdminPanel;
