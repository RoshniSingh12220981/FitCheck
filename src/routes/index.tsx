import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import Diet from '../pages/Diet';
import Progress from '../pages/Progress';
import Blog from '../pages/Blog';
import cors from 'cors';



function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/diet" element={user ? <Diet/> : <Navigate to="/login" />} />
      <Route path="/progress" element={user ? <Progress /> : <Navigate to="/login" />} />
      <Route path="/blog" element={user ? <Blog /> : <Navigate to="/login" />} />
      {/* Redirect to login if not authenticated */}
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}



export default AppRoutes;