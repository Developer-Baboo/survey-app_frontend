import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderNavbar from '../../components/HeaderNavbar'; // Adjust the import path as necessary
import Sidebar from '../../components/Sidebar'; // Adjust the import path as necessary
import Footer from '../../components/Footer'; // Adjust the import path as necessary
import { Link } from 'react-router-dom';
interface Survey {
  id: number;
  type: string;
  name: string;
  order: number;
  full_reward: number;
  timer_hours: number;
  reduced_reward: number;
  expiry: string; 
  status: boolean; 
  pushed_at: string; 
  created_at: string;
  updated_at: string; 
}

const ReadSurvey: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/surveys/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSurvey(data.survey); // Adjust this line based on your API response
      } catch (error) {
        console.error('Error fetching survey:', error);
        // Handle error fetching data, e.g., show a toast or alert
      }
    };

    fetchSurvey();
  }, [id]);

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
            <h1>Survey Details</h1>
            {survey ? (
              <div>
                <p><strong>ID:</strong> {survey.id}</p>
                <p><strong>Type:</strong> {survey.type}</p>
                <p><strong>Name:</strong> {survey.name}</p>
                <p><strong>Order:</strong> {survey.order}</p>
                <p><strong>Full Reward:</strong> {survey.full_reward}</p>
                <p><strong>Time Hours:</strong> {survey.timer_hours}</p>
                <p><strong>Reduced Reward:</strong> {survey.reduced_reward}</p>
                <p><strong>Expiry:</strong> {survey.expiry}</p>
                <p><strong>Status:</strong> {survey.status ? 'Active' : 'Inactive'}</p>
                <p><strong>Pushed At:</strong> {survey.pushed_at}</p>
                <p><strong>Created At:</strong> {survey.created_at}</p>
                <p><strong>Updated At:</strong> {survey.updated_at}</p>
              </div>
            ) : (
              <p>Loading survey details...</p>
            )}
            <Link to="/surveys/view" className="btn btn-primary btn-sm mr-2">Go Back</Link>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default ReadSurvey;