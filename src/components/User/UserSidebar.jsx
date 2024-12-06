import { useState } from "react";
import {
  FaSignOutAlt,
  FaPhoneAlt,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const UserSidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="font-mono">
      {/* Mobile Navbar */}
      <div className="lg:hidden bg-white shadow-lg flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <img src="logo.png" alt="logo" className="h-10 w-14" />
          <h1 className="text-xl font-serif font-bold tracking-wider">GABAY</h1>
        </div>
        <button
          className="text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          <span className="text-2xl">&#9776;</span>
        </button>
      </div>

      {/* Collapsible Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <ul className="menu p-4 space-y-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-lg text-txt flex items-center gap-2 active:opacity-20 bg-gray-200"
                  : "text-lg text-txt flex items-center gap-2 active:opacity-20"
              }
            >
              <FaFileAlt /> Forms
            </NavLink>
            <NavLink
              to="/evacuationcenter"
              className={({ isActive }) =>
                isActive
                  ? "text-lg text-txt flex items-center gap-2 active:opacity-20 bg-gray-200"
                  : "text-lg text-txt flex items-center gap-2 active:opacity-20"
              }
            >
              <FaMapMarkerAlt /> Evacuation Center
            </NavLink>
            <NavLink
              to="/emergencyhotlines"
              className={({ isActive }) =>
                isActive
                  ? "text-lg text-txt flex items-center gap-2 active:opacity-20 bg-gray-200"
                  : "text-lg text-txt flex items-center gap-2 active:opacity-20"
              }
            >
              <FaPhoneAlt /> Emergency Hotlines
            </NavLink>

            <NavLink
              to="/evacuationnotice"
              className={({ isActive }) =>
                isActive
                  ? "text-lg text-txt flex items-center gap-2 active:opacity-20 bg-gray-200"
                  : "text-lg text-txt flex items-center gap-2 active:opacity-20"
              }
            >
              <FaExclamationTriangle /> Evacuation Notice
            </NavLink>
            <NavLink
              to="/faqs"
              className={({ isActive }) =>
                isActive
                  ? "text-lg text-txt flex items-center gap-2 active:opacity-20 bg-gray-200"
                  : "text-lg text-txt flex items-center gap-2 active:opacity-20"
              }
            >
              <FaQuestionCircle /> FAQs
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-lg flex items-center gap-2 active:opacity-20  text-success p-1"
                  : "text-lg flex items-center gap-2 active:opacity-20 text-success p-1"
              }
            >
              <FaSignOutAlt /> Login
            </NavLink>
          </ul>
          <div className="p-4 border-t">
            <p className="mt-4 text-sm text-gray-500">
              © 2024 Gabay. All rights reserved.
            </p>
          </div>
        </div>
      )}

      {/* Sidebar for Large Screens */}
      <div className="hidden lg:flex lg:min-h-screen lg:flex-col lg:w-72 lg:shadow-lg lg:bg-white">
        <div className="flex items-center gap-3 px-6 py-6 border-b-2">
          <img src="logo.png" alt="logo" className="h-12 w-14" />
          <div>
            <h1 className="text-2xl font-serif font-bold tracking-wider text-txt">
              GABAY
            </h1>
            <p className="text-sm text-gray-500 font-bold">
              Safe and Preparedness
            </p>
          </div>
        </div>
        <ul className="menu menu-vertical flex-grow p-6 space-y-4 mt-3 font-bold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-lg text-txt flex items-center gap-2 active:opacity-20 bg-gray-200 p-1"
                : "text-lg text-txt flex items-center gap-2 active:opacity-20 p-1"
            }
          >
            <FaFileAlt /> Forms
          </NavLink>
          <NavLink
            to="/evacuationcenter"
            className={({ isActive }) =>
              isActive
                ? "text-lg text-txt flex items-center gap-2 active:opacity-20 bg-gray-200 p-1"
                : "text-lg text-txt flex items-center gap-2 active:opacity-20 p-1"
            }
          >
            <FaMapMarkerAlt /> Evacuation Center
          </NavLink>
          <NavLink
            to="/emergencyhotlines"
            className={({ isActive }) =>
              isActive
                ? "text-lg text-txt flex items-center gap-2 active:opacity-20 bg-gray-200 p-1"
                : "text-lg text-txt flex items-center gap-2 active:opacity-20 p-1"
            }
          >
            <FaPhoneAlt /> Emergency Hotlines
          </NavLink>
          <NavLink
            to="/evacuationnotice"
            className={({ isActive }) =>
              isActive
                ? "text-lg text-txt flex items-center gap-2 active:opacity-20 bg-gray-200 p-1"
                : "text-lg text-txt flex items-center gap-2 active:opacity-20 p-1"
            }
          >
            <FaExclamationTriangle /> Evacuation Notice
          </NavLink>
          <NavLink
            to="/faqs"
            className={({ isActive }) =>
              isActive
                ? "text-lg text-txt flex items-center gap-2 active:opacity-20 bg-gray-200 p-1"
                : "text-lg text-txt flex items-center gap-2 active:opacity-20 p-1"
            }
          >
            <FaQuestionCircle /> FAQs
          </NavLink>
          <hr />
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-lg flex items-center gap-2 active:opacity-20  text-success p-1"
                : "text-lg flex items-center gap-2 active:opacity-20 text-success p-1"
            }
          >
            <FaSignOutAlt /> Login
          </NavLink>
        </ul>
        {/* Footer */}
        <div className="p-4 border-t-2">
          <p className="text-sm text-gray-500 ms-3 font-bold">
            © 2024 Gabay. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
