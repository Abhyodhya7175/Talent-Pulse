import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import RecruiterLogin from './components/RecruiterLogin';
import AdminLogin from './components/AdminLogin';
import StudentDashboard from './components/dashboard/StudentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter/login" element={<RecruiterLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        { <Route path="/student/dashboard" element={<StudentDashboard />} /> }
      </Routes>
    </Router>
  );
}

export default App;