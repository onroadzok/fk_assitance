import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Moon, Sun, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              AssitClass
            </Link>
            <div className="hidden md:flex ml-10 space-x-4">
              <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                Dashboard
              </Link>
              <Link to="/reportes" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                Reportes
              </Link>
              <Link to="/reportes/nuevo" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                Nuevo Reporte
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <div className="text-sm">
              <span className="font-medium">{user?.email}</span>
              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">{user?.role}</span>
            </div>
            <button onClick={logout} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
