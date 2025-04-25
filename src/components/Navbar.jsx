import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wand2, List, User, Globe } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  // Helper function to determine active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 px-4 py-3 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 group"
        >
          <span className="text-3xl">🧬</span>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:from-purple-400 group-hover:to-cyan-500 transition-all duration-300">
            NPCverse
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink 
            to="/" 
            icon={<Home size={18} />} 
            isActive={isActive('/')}
          >
            Home
          </NavLink>
          <NavLink 
            to="/generate" 
            icon={<Wand2 size={18} />} 
            isActive={isActive('/generate')}
          >
            Generate
          </NavLink>
          <NavLink 
            to="/view" 
            icon={<List size={18} />} 
            isActive={isActive('/view')}
          >
            My NPCs
          </NavLink>
          <NavLink 
            to="/browse" 
            icon={<Globe size={18} />} 
            isActive={isActive('/browse')}
          >
            Browse NPCs
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-400 hover:text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation (would need state to toggle) */}
      {/* <div className="md:hidden bg-gray-900 px-4 py-2">
        Mobile menu items would go here
      </div> */}
    </nav>
  );
};

// Reusable NavLink component
const NavLink = ({ to, icon, children, isActive }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50 shadow-lg shadow-purple-500/10' 
        : 'text-gray-400 hover:text-white hover:bg-gray-800'
    }`}
  >
    <span className={`${isActive ? 'text-purple-400' : 'text-gray-500'}`}>
      {icon}
    </span>
    <span className="font-medium">{children}</span>
  </Link>
);

export default Navbar;
