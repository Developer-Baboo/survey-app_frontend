import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';

interface AdminDashboardProps {
  userName?: string; // Optional userName prop
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ userName }) => {
  // console.log(userName,"username--")
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login page on success
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
                  {userName || 'Admin'} {/* Display username or fallback */}
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

      {/* ... (Rest of your component code) */}

      <div className="main-content">
        <div className="container-fluid">
          <h1 className="mt-4">Dashboard</h1>
          <p>Welcome, {userName || 'Admin'}!</p> {/* Display username or fallback */}
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

export default AdminDashboard;