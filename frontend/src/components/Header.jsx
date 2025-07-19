import React from 'react';
import { GraduationCap, Moon, Sun, LogOut, User, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ onNavigateToProfile, currentPage }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-blue-600 dark:bg-blue-500 p-2 sm:p-3 rounded-xl">
              <GraduationCap className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">TechConnect</h1>
              <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 hidden sm:block">Smart Learning for Seniors</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {user && (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  onClick={onNavigateToProfile}
                  className={`flex items-center space-x-2 sm:space-x-3 px-2 sm:px-4 py-1 sm:py-2 rounded-xl transition-colors duration-200 ${
                    currentPage === 'profile' 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' 
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <User className="text-gray-600 dark:text-gray-300" size={20} />
                  <span className="text-sm sm:text-lg font-medium text-gray-900 dark:text-white hidden sm:inline">
                    {user.name}
                  </span>
                </button>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="text-yellow-500" size={24} />
              ) : (
                <Moon className="text-gray-600" size={24} />
              )}
            </button>

            {user && (
              <button
                onClick={logout}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-3 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl transition-colors duration-200"
              >
                <LogOut size={20} />
                <span className="text-sm sm:text-lg font-medium hidden sm:inline">Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;