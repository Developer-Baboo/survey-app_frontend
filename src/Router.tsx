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
  const [userData, setUserData] = useState(null);

  const token = localStorage.getItem('token');
  useEffect(() => {
    // Check if user is already logged in (e.g., check localStorage for token)
    if (token) {
      console.log("DD1", token);
      setIsLoggedIn(true);
      
      fetchUserInfo(token);
    }
  }, []);
  console.log("isloged in: ",isLoggedIn);

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
      console.log("Data in router: ", data);
      setUserData(data);
      if(data.role === 'admin'){
        setIsAdmin(data.role === 'admin' ? true : false);
        console.log("isAdmin",isAdmin);
      }else if(data.role === 'super admin'){
        setIsSuperAdmin(data.role === 'super admin');
      }else if(data.role === 'user'){
        setIsUser(data.role === 'user');
      }
      /* setIsAdmin(data.role === 'admin');
      setIsSuperAdmin(data.role === 'super admin');
      setIsUser(data.role === 'user'); */
    })
    .catch((error) => console.error('Error:', error));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/Login"
          element={<Login />} 
        />
        <Route
          path="/user-dashboard"
          element={isLoggedIn && isUser ? <UserDashboard /> : <Navigate to="/Login" />}
        />
        <Route
          path="/admin-dashboard"
          element={isLoggedIn && isAdmin ? <AdminDashboard /> : <Navigate to="/Login" />}
        />
        <Route
          path="/super-admin-dashboard"
          element={isLoggedIn && isSuperAdmin ? <SuperAdminDashboard /> : <Navigate to="/Login" />}
        />
        {/* <Route
          path="*"
          element={<Navigate to={isLoggedIn ? (isAdmin ? "/admin-dashboard" : isSuperAdmin ? "/super-admin-dashboard" : "/user-dashboard") : "/Login"} />}
        /> */}
      </Routes>
      </Router>
  );
};

export default App;
