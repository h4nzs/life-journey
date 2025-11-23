import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import Button from '../common/Button';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkStyles = ({ isActive }) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-blue-600">
              LifeJourney
            </Link>
            <div className="hidden md:flex space-x-4">
                <NavLink to="/" className={navLinkStyles}>Dashboard</NavLink>
                <NavLink to="/tujuan" className={navLinkStyles}>My Goals</NavLink>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 text-sm hidden sm:block">Welcome, {user?.email || 'Guest'}!</span>
            <Button onClick={handleLogout} variant="secondary" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
