import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderNavbar from '../../components/HeaderNavbar'; // Adjust the import path as necessary
import Sidebar from '../../components/Sidebar'; // Adjust the import path as necessary
import Footer from '../../components/Footer'; // Adjust the import path as necessary

interface Survey {
  id: number;
  type: string;
  name: string;
  order: number;
  full_reward: number;
  timer_hours: number;
}

const ViewSurvey: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/surveys');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSurveys(data.surveys); // Adjust this line based on your API response
      } catch (error) {
        console.error('Error fetching surveys:', error);
        // Handle error fetching data, e.g., show a toast or alert
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div className="dashboard-container d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header/Navbar */}
        <HeaderNavbar userName="Super Admin" onLogout={() => {/* Handle logout */}} />

        {/* Main Content */}
        <div className="main-content">
          <div className="container-fluid mt-4">
            <h1>View Surveys</h1>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Order</th>
                  <th>Full Reward</th>
                  <th>Timer Hours</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {surveys.map(survey => (
                  <tr key={survey.id}>
                    <td>{survey.id}</td>
                    <td>{survey.type}</td>
                    <td>{survey.name}</td>
                    <td>{survey.order}</td>
                    <td>{survey.full_reward}</td>
                    <td>{survey.timer_hours}</td>
                    <td>
                      <Link to={`/surveys/read/${survey.id}`} className="btn btn-primary btn-sm mr-2">Read</Link>
                      <button className="btn btn-warning btn-sm mr-2">Edit</button>
                      <button className="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default ViewSurvey;