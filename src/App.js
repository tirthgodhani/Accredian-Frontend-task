import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import ReferEarnPage from './components/ReferEarnPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/" /> : 
                <Login onSuccess={handleAuthSuccess} />
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? 
                <Navigate to="/" /> : 
                <Signup onSuccess={handleAuthSuccess} />
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? 
                <Profile /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
                <ReferEarnPage onLogout={handleLogout} /> : 
                <Navigate to="/login" />
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
