// Router.tsx

import React, { useContext, useEffect }  from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // Import necessary components
import AdminDashboard from './admin-dashboard';
import SuperAdminDashboard from './super-admin-dashboard';
import UserDashboard from './user-dashboard';
import PrivateRoute from './PrivateRoute';
import ViewSurvey from './pages/survey/view-survey';
import ReadSurvey from './pages/survey/read-survey';
import AddSurvey from './pages/survey/add-survey';
import EditSurvey from './pages/survey/edit-survey';
import Login from './Login';
import Signup from './signup';
import { AuthContext } from './contexts/AuthContext'; // Import AuthContext

const AppRouter: React.FC = () => {
  const authContext = useContext(AuthContext); // Access AuthContext
  // console.log("data",authContext);
  
const navigate = useNavigate()
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
const user_Data = localStorage.getItem('user')
// console.log("data from localstorage", user_Data);

  useEffect(()=>{
  
    if (user_Data) {
      const user = JSON.parse(user_Data);
      navigate(getRoleBasedPath(user?.role));
    }
    
  },[])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes with Role Checks */}
      {authContext?.user && ( // Check user is logged in
        <>
          <Route
            path="/user-dashboard"
            element={
              <PrivateRoute roles={['user']}>
                <> {/* Wrap UserDashboard in Fragment */}
                  <UserDashboard userName={authContext.user.name} />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute roles={['admin']}>
                <> {/* Wrap AdminDashboard in Fragment */}
                  <AdminDashboard userName={authContext.user.name} />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/super-admin-dashboard"
            element={
              <PrivateRoute roles={['super admin']}>
                <> {/* Wrap SuperAdminDashboard in Fragment */}
                  <SuperAdminDashboard userName={authContext.user.name} />
                </>
              </PrivateRoute>
            }
          />

          <Route
             path="/surveys/view"
            element={
              <PrivateRoute roles={['super admin']}>
                <> {/* Wrap SuperAdminDashboard in Fragment */}
                  <ViewSurvey />
                </>
              </PrivateRoute>
            }
          />

          <Route
             path="/surveys/read/:id"
            element={
              <PrivateRoute roles={['super admin']}>
                <> {/* Wrap SuperAdminDashboard in Fragment */}
                  <ReadSurvey />
                </>
              </PrivateRoute>
            }
          />
          

          <Route
             path="/surveys/add"
            element={
              <PrivateRoute roles={['admin', 'super admin']}>
                <>
                  <AddSurvey />
                </>
              </PrivateRoute>
            }
          />
          <Route
             path="/surveys/edit/:id"
            element={
              <PrivateRoute roles={['super admin']}>
                <> {/* Wrap SuperAdminDashboard in Fragment */}
                  <EditSurvey />
                </>
              </PrivateRoute>
            }
          />

        </>
      )}

      <Route path="*" element={<Navigate to="/login" replace />} /> {/* Redirect to login for unmatched routes */}
    </Routes>
  );
};

export default AppRouter;