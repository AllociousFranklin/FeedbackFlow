import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import FeedbackForm from './pages/FeedbackForm';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register'; // ✅ Import Register page
import MyEvents from './pages/MyEvents';
import AuthStatus from './components/AuthStatus';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Router>
      <div
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-slate-900 text-gray-900 dark:text-gray-100"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <Navbar />
        <AuthStatus /> {/* Top-right logout/status box */}
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* ✅ New route */}

            {/* Protected Routes */}
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/:id"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-events"
              element={
                <ProtectedRoute>
                  <MyEvents />
                </ProtectedRoute>
              }
            />

            {/* Public Routes */}
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/feedback/:id" element={<FeedbackForm />} />
          </Routes>
        </div>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
