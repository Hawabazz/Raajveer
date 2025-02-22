import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Tab,
  Tabs,
  Card,
  CardContent,
  CardActions,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';

const subscriptionPlans = [
  { months: 1, price: 500 },
  { months: 2, price: 1000 },
  { months: 3, price: 1500 },
  { months: 6, price: 3000 },
  { months: 12, price: 6000 },
];

const UserPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    subscription: 'Active',
    balance: 1000,
    expiryDate: '2025-02-25',
  });
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [supportTicket, setSupportTicket] = useState({
    subject: '',
    message: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    // Here you would integrate with payment processing
    alert(`Processing payment for ${plan.months} month(s) plan: $${plan.price}`);
  };

  const handleSupportTicket = (e) => {
    e.preventDefault();
    alert('Support ticket submitted successfully!');
    setSupportTicket({ subject: '', message: '' });
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
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                User Login
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Username"
                  margin="normal"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  margin="normal"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Login
                </Button>
              </form>
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
          Welcome to Your Dashboard
        </Typography>
        <Paper sx={{ width: '100%', mb: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Dashboard" />
            <Tab label="Subscription" />
            <Tab label="Profile" />
            <Tab label="Support" />
          </Tabs>
        </Paper>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Account Overview
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Subscription Status" secondary={profile.subscription} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Account Balance" secondary={`$${profile.balance}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Expiry Date" secondary={profile.expiryDate} />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Last Login" secondary="Today, 3:45 PM" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Last Payment" secondary="$500 - 1 Month Subscription" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            {subscriptionPlans.map((plan) => (
              <Grid item xs={12} sm={6} md={4} key={plan.months}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {plan.months} Month{plan.months > 1 ? 's' : ''}
                    </Typography>
                    <Typography variant="h4" color="primary" gutterBottom>
                      ${plan.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Full access to all features
                      <br />
                      • 24/7 support
                      <br />
                      • Regular updates
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      color="primary"
                      onClick={() => handleSubscribe(plan)}
                    >
                      Subscribe
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {activeTab === 2 && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Avatar
                  sx={{ width: 100, height: 100, mb: 2 }}
                  alt={profile.name}
                  src="/avatar.jpg"
                />
                <Button variant="outlined" color="primary" sx={{ mb: 3 }}>
                  Change Picture
                </Button>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Name"
                  value={profile.name}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={profile.email}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 2, ml: 2 }}
                >
                  Reset Password
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}

        {activeTab === 3 && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Customer Support
            </Typography>
            <form onSubmit={handleSupportTicket}>
              <TextField
                fullWidth
                label="Subject"
                margin="normal"
                value={supportTicket.subject}
                onChange={(e) => setSupportTicket({ ...supportTicket, subject: e.target.value })}
              />
              <TextField
                fullWidth
                label="Message"
                margin="normal"
                multiline
                rows={4}
                value={supportTicket.message}
                onChange={(e) => setSupportTicket({ ...supportTicket, message: e.target.value })}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Submit Ticket
              </Button>
            </form>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>
              FAQs
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="How do I upgrade my subscription?"
                  secondary="Go to the Subscription tab and choose your preferred plan."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="What payment methods are accepted?"
                  secondary="We accept all major credit cards and PayPal."
                />
              </ListItem>
            </List>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default UserPanel;
