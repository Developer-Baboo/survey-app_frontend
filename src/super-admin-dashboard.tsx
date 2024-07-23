import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HeaderNavbar from './components/HeaderNavbar';
import Footer from './components/Footer';

interface SuperAdminDashboardProps {
  userName?: string;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ userName }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Logout successful:', data);
      localStorage.removeItem('token');
      navigate('/login'); // Redirect to login page on success
    } catch (error) {
      console.error('Error:', error);
      alert('Logout failed. Please try again later.');
    }
  };

  return (
    <div className="dashboard-container d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header/Navbar */}
        <HeaderNavbar userName={userName} onLogout={handleLogout} />

        {/* Main Content */}
        <div className="main-content">
          <div className="container-fluid mt-4">
            {/* <h1>Dashboard</h1> */}
            <p>Welcome, {userName || 'Super Admin'}!</p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;