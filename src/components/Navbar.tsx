import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-teal-400 dark:from-gray-800 dark:to-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-extrabold text-white">
                FitTrack
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
                <Link to="/profile" className="text-white hover:underline">Profile</Link>
                <Link to="/diet" className="text-white hover:underline">Diet</Link>
                <Link to="/progress" className="text-white hover:underline">Progress</Link>
                <Link to="/blog" className="text-white hover:underline">Blog</Link>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:shadow-lg transition"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <button
                onClick={() => signOut()}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:shadow-lg transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-4 pt-4 pb-4 space-y-2">
            {user && (
              <>
                <Link to="/dashboard" className="block text-gray-800 dark:text-white hover:underline">Dashboard</Link>
                <Link to="/profile" className="block text-gray-800 dark:text-white hover:underline">Profile</Link>
                <Link to="/diet" className="block text-gray-800 dark:text-white hover:underline">Diet</Link>
                <Link to="/progress" className="block text-gray-800 dark:text-white hover:underline">Progress</Link>
                <Link to="/blog" className="block text-gray-800 dark:text-white hover:underline">Blog</Link>
              </>
            )}
            {!user && (
              <Link to="/login" className="block text-gray-800 dark:text-white hover:underline">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}