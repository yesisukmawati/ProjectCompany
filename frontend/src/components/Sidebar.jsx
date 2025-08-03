import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaFileAlt, FaCalendarCheck, FaIdCard, FaSignOutAlt, FaLeaf } from 'react-icons/fa';

// Ganti dengan logo Anda dari folder public
const logoMWR = '/MWR.png'; 

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { icon: <FaTachometerAlt />, name: 'Dashboard', path: '/admin/dashboard' },
    { icon: <FaFileAlt />, name: 'Document', path: '/admin/documents' },
    { icon: <FaCalendarCheck />, name: 'Attendance', path: '/admin/attendance' },
    { icon: <FaLeaf />, name: 'Cuti', path: '/admin/cuti' }, // Section Cuti ditambahkan
    { icon: <FaIdCard />, name: 'Profile', path: '/admin/profile' },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-20 border-b">
        <img src={logoMWR} alt="MWR Logo" className="h-12" />
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-10">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-4 text-gray-600 transition-colors duration-300 transform hover:bg-gray-200 ${
                  isActive ? 'bg-gray-200 text-gray-800 border-r-4 border-blue-500' : ''
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="mx-4 font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-6 border-t">
         <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
         >
            <FaSignOutAlt className="mr-2" />
            Logout
         </button>
      </div>
    </div>
  );
};

export default Sidebar;
