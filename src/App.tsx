import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppRoutes from './routes';

import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <AppRoutes />
            <Toaster position="top-right" />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;