import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar bg-dark text-light">
      <div className="p-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white">Dashboard</Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/surveys" className="nav-link text-white">View All Surveys</Link>
          </li> */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle text-white" href="#" id="surveyDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Survey
            </a>
            <ul className="dropdown-menu" aria-labelledby="surveyDropdown">
              <li><Link to="/surveys/view" className="dropdown-item">View Surveys</Link></li>
              <li><Link to="/surveys/add" className="dropdown-item">Add Surveys</Link></li>
              {/* <li><Link to="/surveys/add" className="dropdown-item">Add New Survey</Link></li> */}
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
