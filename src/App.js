import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Welcome from './components/Welcome';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';
import IntroTrailer from './components/IntroTrailer';

const App = () => {
  const [showTrailer, setShowTrailer] = useState(true);
  const [theme, setTheme] = useState('light');

  const darkTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  useEffect(() => {
    // Auto-hide trailer after it finishes
    const timer = setTimeout(() => {
      setShowTrailer(false);
    }, 10000); // 10 seconds for trailer duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        {showTrailer ? (
          <IntroTrailer onComplete={() => setShowTrailer(false)} />
        ) : (
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/user" element={<UserPanel />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
};

export default App;
