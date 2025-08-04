import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { LinkedInCallback } from '@/components/auth/LinkedInCallback';
import { ToastProvider, ToastViewport } from '@/components/ui/Toast';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
        </Routes>
      </Router>
      <ToastViewport />
    </ToastProvider>
  );
}

export default App;
