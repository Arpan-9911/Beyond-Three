import React from "react";
import {
  FaTachometerAlt,
  FaImages,
  FaCalendarAlt,
  FaInfoCircle,
  FaProjectDiagram,
  FaBlog,
  FaUserPlus,
  FaRoute,
  FaPhotoVideo,
  FaAddressBook,
  FaCalendarCheck,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ onClose }) => {
  const tabs = [
    { name: "Dashboard", link: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Hero Carousel", link: "/hero-carousel", icon: <FaImages /> },
    { name: "News & Updates", link: "/news", icon: <FaCalendarAlt /> },
    { name: "Events", link: "/events", icon: <FaCalendarCheck /> },
    { name: "About Us", link: "/about-us", icon: <FaInfoCircle /> },
    { name: "Projects", link: "/projects", icon: <FaProjectDiagram /> },
    { name: "Blogs", link: "/blogs", icon: <FaBlog /> },
    { name: "Join Us Requests", link: "/join-us", icon: <FaUserPlus /> },
    { name: "Tours", link: "/tours", icon: <FaRoute /> },
    { name: "Media Library", link: "/media", icon: <FaPhotoVideo /> },
    { name: "Contact & Socials", link: "/contact", icon: <FaAddressBook /> },
    { name: "Appointments", link: "/appointments", icon: <FaCalendarCheck /> },
    { name: "Profile", link: "/profile", icon: <FaUserCircle /> },
  ];

  return (
    <aside className="h-dvh w-full bg-amber-900 p-4 flex flex-col">
      <div>
        <h1 className="text-xl font-extrabold text-white">Admin Panel</h1>
        <p className="text-xs text-yellow-300 font-semibold uppercase">
          Beyond Three
        </p>
      </div>
      <hr className="my-4 border-yellow-400/40" />
      <nav className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2">
        {tabs.map((tab, index) => (
          <NavLink
            key={index}
            to={tab.link}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold transition
              ${
                isActive
                  ? "bg-amber-700/60 text-yellow-400"
                  : "text-white hover:bg-amber-800/60 hover:text-yellow-400"
              }`
            }
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.name}</span>
          </NavLink>
        ))}
      </nav>
      <hr className="my-4 border-yellow-400/40" />
      <button
        onClick={onClose}
        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold transition text-white hover:bg-red-800/30 hover:text-yellow-400"
      >
        <span className="text-lg">
          <FaSignOutAlt />
        </span>
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;