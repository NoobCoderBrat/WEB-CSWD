import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaListAlt,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white p-6 font-mono">
      <div className="mb-12">
        <img
          src="logo.png"
          alt="gabay-image-logo"
          className="h-26 w-24 mb-4 ms-6"
        />
        <h1 className="mb-5 text-white sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-wide">
          Gabay
          <span className="text-sm">Admin</span>
        </h1>
      </div>
      <nav className="space-y-4">
        <NavLink
          to="/admin"
          className="flex items-center text-lg font-medium hover:text-yellow-400 transition"
          activeClassName="text-green-400 font-bold"
        >
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </NavLink>
        <NavLink
          to="/evacuatees"
          className="flex items-center text-lg font-medium hover:text-yellow-400 transition"
          activeClassName="text-green-400 font-bold"
        >
          <FaUsers className="mr-3" />
          Evacuatees
        </NavLink>
        <NavLink
          to="/assistance"
          className="flex items-center text-lg font-medium hover:text-yellow-400 transition"
          activeClassName="text-green-400 font-bold"
        >
          <FaListAlt className="mr-3" />
          Assistance Form
        </NavLink>
        <NavLink
          to="/notification"
          className="flex items-center text-lg font-medium hover:text-yellow-400 transition"
          activeClassName="text-green-400 font-bold"
        >
          <FaBell className="mr-3" />
          Notifications
        </NavLink>
        <br />
        <NavLink
          to="/"
          className="flex items-center text-lg font-medium hover:text-yellow-400 transition"
          activeClassName="text-green-400 font-bold"
        >
          <FaSignOutAlt className="mr-3" />
          Sign Out
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
