import {
  FaHome,
  FaUpload,
  FaFolderOpen,
  FaClipboardCheck,
  FaBookOpen,
  FaUsersCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { ROLES } from "@/config/roles";
import { FaCalendarAlt } from "react-icons/fa";
import logo from "@/assets/logo/nittelogo1.png";

function Sidebar({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const studentLinks = [
    {
      title: "Dashboard",
      path: "/student/dashboard",
      icon: <FaHome />,
    },
    {
      title: "Submit Content",
      path: "/student/submit",
      icon: <FaUpload />,
    },
    {
      title: "My Submissions",
      path: "/student/my-submissions",
      icon: <FaFolderOpen />,
    },
  ];

  const deptAdminLinks = [
    {
      title: "Dashboard",
      path: "/dept-admin/dashboard",
      icon: <FaHome />,
    },
    {
  title: "Review Submissions",
  path: "/dept-admin/review-submissions",
  icon: <FaClipboardCheck />,
},
  ];

  const mainAdminLinks = [
    {
      title: "Dashboard",
      path: "/main-admin/dashboard",
      icon: <FaHome />,
    },
    {
  title: "Manage Users",
  path: "/main-admin/users",
  icon: <FaUsersCog />,
},
    {
  title: "Magazine Builder",
  path: "/main-admin/magazine-builder",
  icon: <FaBookOpen />,
},
    {
  title: "Submission Windows",
  path: "/main-admin/submission-windows",
  icon: <FaCalendarAlt />,
},
{
    title: "View All Submissions",
    path: "/main-admin/submissions",
    icon: <FaFolderOpen />,
  },
  ];

  let links = [];

  switch (role) {
    case ROLES.STUDENT:
      links = studentLinks;
      break;

    case ROLES.DEPT_ADMIN:
      links = deptAdminLinks;
      break;

    case ROLES.MAIN_ADMIN:
      links = mainAdminLinks;
      break;

    default:
      links = [];
  }

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo Section */}

      <div className="border-b border-slate-700 py-8 px-6">

        <div className="flex flex-col items-center">

          <img
            src={logo}
            alt="NMAMIT Logo"
            className="w-44 h-44 object-contain"
          />

          <h1 className="mt-4 text-2xl font-bold tracking-wide">
            NMAMIT
          </h1>

          <p className="text-slate-400 text-sm text-center mt-1">
            E-Magazine Portal
          </p>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-6 space-y-2">

        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-lg">
              {link.icon}
            </span>

            <span className="font-medium">
              {link.title}
            </span>
          </NavLink>
        ))}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-700 p-5">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 rounded-xl px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
        >
          <FaSignOutAlt className="text-lg" />

          <span className="font-medium">
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;