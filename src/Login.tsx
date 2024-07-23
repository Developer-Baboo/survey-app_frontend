import React, { useState, useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return null; // or some loading indicator
  }

  const { login } = authContext;

  const getRoleBasedPath = (role: string) => {
    // console.log("Determining path for role: ", role);
    switch (role) {
      case 'user':
        return '/user-dashboard';
      case 'admin':
        return '/admin-dashboard';
      case 'super admin':
        return '/super-admin-dashboard';
      default:
        return '/login';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await login(email, password);
      // console.log("Login successful, attempting navigation", userData);
      const user_Data = localStorage.getItem('user')
      if (user_Data) {
        const user = JSON.parse(user_Data);
        navigate(getRoleBasedPath(user?.role));
      }
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;
