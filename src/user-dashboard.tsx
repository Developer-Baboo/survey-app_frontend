import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faCog, faSignOutAlt } from 'font-awesome-icon';

const UserDashboard: React.FC = () => {
  const adminName = 'Admin'; // Replace with actual admin name
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
      // Show an error message to the user, e.g., using an alert or toast
      alert('Logout failed. Please try again later.');
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Dashboard</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {adminName}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#"> Profile</a></li>
                  <li><a className="dropdown-item" href="#"> Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleLogout}>
                        Logout
                    </a>
                </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="sidebar">
        <ul className="list-group">
          <li className="list-group-item">
            <a href="#">Dashboard</a>
          </li>
          <li className="list-group-item">
            <a href="#">Analytics</a>
          </li>
          <li className="list-group-item dropdown">
            <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               Settings
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">General</a></li>
              <li><a className="dropdown-item" href="#">Security</a></li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="container-fluid">
          <h1 className="mt-4">Dashboard</h1>
          <p>Welcome, {adminName}!</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <span className="text-muted">Dummy Footer Text &copy; 2024</span>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;