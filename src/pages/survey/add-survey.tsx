import React, { useState } from 'react';
import HeaderNavbar from '../../components/HeaderNavbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Define the SurveyData interface
interface SurveyData {
  type: string;
  name: string;
  order: number;
  full_reward: number;
  timer_hours: number;
  reduced_reward: number;
  expiry: string;
  status: number;
}

const AddSurvey: React.FC = () => {
const navigate = useNavigate();
// const history = useHistory();
const showToast = (message: string) => {
    toast.success(message);
};
  const [surveyData, setSurveyData] = useState<SurveyData>({
    type: 'survey',
    name: '',
    order: 0,
    full_reward: 0,
    timer_hours: 0,
    reduced_reward: 0,
    expiry: '',
    status: 0,
  });

  const [formErrors, setFormErrors] = useState<Partial<SurveyData>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) {
        throw new Error('Failed to add survey');
      }

      const data = await response.json();
    //   console.log('Survey added successfully:', data);
    alert("Survey added successfully:");

      showToast('Survey added successfully');
    //   history.push('/surveys/view');
      navigate('/surveys/view'); 

      // Reset form or redirect to another page upon successful submission
    } catch (error) {
      console.error('Error adding survey:', error);
      // Handle error
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSurveyData({ ...surveyData, [name]: name === 'status' ? parseInt(value, 10) : value });
  };

  return (
    <div className="dashboard-container d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <HeaderNavbar userName="Super Admin" onLogout={() => {/* Handle logout */}} />
        <div className="main-content">
          <div className="container mt-3">
            <h2>Add New Survey</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">Type</label>
                <select id="type" name="type" className="form-control" value={surveyData.type} onChange={handleChange}>
                  <option value="profile">Profile</option>
                  <option value="survey">Survey</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" id="name" name="name" className="form-control" value={surveyData.name} onChange={handleChange} required />
                {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="order" className="form-label">Order</label>
                <input type="number" id="order" name="order" className="form-control" value={surveyData.order} onChange={handleChange} required />
                {formErrors.order && <div className="text-danger">{formErrors.order}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="full_reward" className="form-label">Full Reward</label>
                <input type="number" id="full_reward" name="full_reward" step="0.01" className="form-control" value={surveyData.full_reward} onChange={handleChange} required />
                {formErrors.full_reward && <div className="text-danger">{formErrors.full_reward}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="timer_hours" className="form-label">Timer Hours</label>
                <input type="number" id="timer_hours" name="timer_hours" className="form-control" value={surveyData.timer_hours} onChange={handleChange} required />
                {formErrors.timer_hours && <div className="text-danger">{formErrors.timer_hours}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="reduced_reward" className="form-label">Reduced Reward</label>
                <input type="number" id="reduced_reward" name="reduced_reward" step="0.01" className="form-control" value={surveyData.reduced_reward} onChange={handleChange} required />
                {formErrors.reduced_reward && <div className="text-danger">{formErrors.reduced_reward}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="expiry" className="form-label">Expiry</label>
                <input type="datetime-local" id="expiry" name="expiry" className="form-control" value={surveyData.expiry} onChange={handleChange} required />
                {formErrors.expiry && <div className="text-danger">{formErrors.expiry}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select id="status" name="status" className="form-control" value={surveyData.status} onChange={handleChange} required>
                  <option value="0">Inactive</option>
                  <option value="1">Active</option>
                </select>
                {formErrors.status && <div className="text-danger">{formErrors.status}</div>}
              </div>
              <button type="submit" className="btn btn-primary">Add Survey</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddSurvey;