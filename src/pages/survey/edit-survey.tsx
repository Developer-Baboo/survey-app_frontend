import React, { useState, useEffect } from 'react';
import HeaderNavbar from '../../components/HeaderNavbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';

const EditSurvey: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [surveyData, setSurveyData] = useState({
    type: 'survey',
    name: '',
    order: 0,
    full_reward: 0,
    timer_hours: 0,
    reduced_reward: 0,
    expiry: '',
    status: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/surveys/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch survey');
        }
        const data = await response.json();
        
        // Update surveyData state individually for each field
        setSurveyData({
          type: data.survey.type || '',
          name: data.survey.name || '',
          order: data.survey.order || 0,
          full_reward: data.survey.full_reward || 0,
          timer_hours: data.survey.timer_hours || 0,
          reduced_reward: data.survey.reduced_reward || 0,
          expiry: data.survey.expiry || '',
          status: data.survey.status || 0,
        });
        
        console.log("Data from api", data);
        
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    };

    fetchSurvey();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Client-side validation
    const newErrors: { [key: string]: string } = {};
    if (!surveyData.name) newErrors.name = 'Name is required';
    if (!surveyData.type) newErrors.type = 'Type is required';
    if (surveyData.order <= 0) newErrors.order = 'Order must be greater than 0';
    if (surveyData.full_reward <= 0) newErrors.full_reward = 'Full reward must be greater than 0';
    if (surveyData.timer_hours <= 0) newErrors.timer_hours = 'Timer hours must be greater than 0';
    if (surveyData.reduced_reward <= 0) newErrors.reduced_reward = 'Reduced reward must be greater than 0';
    if (!surveyData.expiry) newErrors.expiry = 'Expiry date is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(`http://localhost:8000/api/surveys/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(surveyData),
        });

        if (!response.ok) {
          throw new Error('Failed to update survey');
        }

        const data = await response.json();
        console.log('Survey updated successfully:', data);
        alert("Survey updated successfully");
        navigate('/surveys/view'); 
      } catch (error) {
        console.error('Error updating survey:', error);
      }
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
        <HeaderNavbar userName="Super Admin" onLogout={() => { /* Handle logout */ }} />
        <div className="main-content">
          <div className="container mt-3">
            <h2>Edit Survey</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">Type</label>
                <select id="type" name="type" className="form-control" value={surveyData.type} onChange={handleChange}>
                  <option value="profile">Profile</option>
                  <option value="survey">Survey</option>
                </select>
                {errors.type && <div className="text-danger">{errors.type}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" id="name" name="name" className="form-control" value={surveyData.name} onChange={handleChange}  />
                {errors.name && <div className="text-danger">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="order" className="form-label">Order</label>
                <input type="number" id="order" name="order" className="form-control" value={surveyData.order} onChange={handleChange}  />
                {errors.order && <div className="text-danger">{errors.order}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="full_reward" className="form-label">Full Reward</label>
                <input type="number" id="full_reward" name="full_reward" step="0.01" className="form-control" value={surveyData.full_reward} onChange={handleChange}  />
                {errors.full_reward && <div className="text-danger">{errors.full_reward}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="timer_hours" className="form-label">Timer Hours</label>
                <input type="number" id="timer_hours" name="timer_hours" className="form-control" value={surveyData.timer_hours} onChange={handleChange}  />
                {errors.timer_hours && <div className="text-danger">{errors.timer_hours}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="reduced_reward" className="form-label">Reduced Reward</label>
                <input type="number" id="reduced_reward" name="reduced_reward" step="0.01" className="form-control" value={surveyData.reduced_reward} onChange={handleChange}  />
                {errors.reduced_reward && <div className="text-danger">{errors.reduced_reward}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="expiry" className="form-label">Expiry</label>
                <input type="datetime-local" id="expiry" name="expiry" className="form-control" value={surveyData.expiry} onChange={handleChange}  />
                {errors.expiry && <div className="text-danger">{errors.expiry}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select id="status" name="status" className="form-control" value={surveyData.status} onChange={handleChange} >
                  <option value="0">Inactive</option>
                  <option value="1">Active</option>
                </select>
                {errors.status && <div className="text-danger">{errors.status}</div>}
              </div>
              <button type="submit" className="btn btn-primary">Update Survey</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default EditSurvey;