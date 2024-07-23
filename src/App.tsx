// src/App.tsx
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './Router'; // Assuming AppRouter is your main routing component
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <BrowserRouter> 
      <AuthProvider>
        <div className="App">
          <AppRouter />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;