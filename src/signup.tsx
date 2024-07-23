import React, { useState, useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null; // or some loading indicator
  }

  const { register } = authContext;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(firstName, password, confirmPassword);
      alert('Registration successful');
    } catch (error) {
      // alert(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Signup;