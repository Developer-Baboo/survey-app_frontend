import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './admin-dashboard'
import SuperAdminDashboard from './super-admin-dashboard';
import UserDashboard from './user-dashboard';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (e.g., check localStorage for token)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = (token: string) => {
    fetch('http://localhost:8000/api/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('User info:', data);
        // Set isAdmin and isSuperAdmin based on user role
        setIsAdmin(data.role === 'admin');
        setIsSuperAdmin(data.role === 'super admin');
        setIsUser(data.role === 'user');
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <Router>
      <Routes>
        {/* Uncomment and adjust the login route as needed */}
        {/* <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} /> */}
        <Route
          path="/user-dashboard"
          element={isLoggedIn && isUser ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin-dashboard"
          element={isLoggedIn && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/super-admin-dashboard"
          element={isLoggedIn && isSuperAdmin ? <SuperAdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? (isAdmin ? "/admin-dashboard" : isSuperAdmin ? "/super-admin-dashboard" : "/user-dashboard") : "/login"} />}
        />
      </Routes>
      </Router>
  );
};

export default App;
