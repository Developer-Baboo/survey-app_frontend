// HeaderNavbar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderNavbarProps {
  userName?: string;
  onLogout: () => void;
}

const HeaderNavbar: React.FC<HeaderNavbarProps> = ({ userName, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
      localStorage.removeItem('user');
      navigate('/login'); // Redirect to login page on success
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Dashboard</a>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {userName || 'Super Admin'}
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
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
  );
};

export default HeaderNavbar;