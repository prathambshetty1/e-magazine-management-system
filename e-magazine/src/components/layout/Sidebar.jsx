import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaFileAlt,
  FaUpload,
  FaUser,
  FaUsers,
  FaBuilding,
  FaChartBar,
  FaCheckCircle,
  FaTimesCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { ROLES } from "@/config/roles";

function Sidebar({ role }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menu = {
    [ROLES.STUDENT]: [
      {
        name: "Dashboard",
        icon: <FaHome />,
        path: "/student/dashboard",
      },
      {
        name: "My Articles",
        icon: <FaFileAlt />,
        path: "/student/articles",
      },
      {
        name: "Submit Article",
        icon: <FaUpload />,
        path: "/student/submit",
      },
      {
        name: "Profile",
        icon: <FaUser />,
        path: "/student/profile",
      },
    ],

    [ROLES.DEPT_ADMIN]: [
      {
        name: "Dashboard",
        icon: <FaHome />,
        path: "/dept-admin/dashboard",
      },
      {
        name: "Pending Articles",
        icon: <FaFileAlt />,
        path: "/dept-admin/pending",
      },
      {
        name: "Approved",
        icon: <FaCheckCircle />,
        path: "/dept-admin/approved",
      },
      {
        name: "Rejected",
        icon: <FaTimesCircle />,
        path: "/dept-admin/rejected",
      },
      {
        name: "Students",
        icon: <FaUsers />,
        path: "/dept-admin/students",
      },
    ],

    [ROLES.MAIN_ADMIN]: [
      {
        name: "Dashboard",
        icon: <FaHome />,
        path: "/main-admin/dashboard",
      },
      {
        name: "Departments",
        icon: <FaBuilding />,
        path: "/main-admin/departments",
      },
      {
        name: "Users",
        icon: <FaUsers />,
        path: "/main-admin/users",
      },
      {
        name: "Analytics",
        icon: <FaChartBar />,
        path: "/main-admin/analytics",
      },
      {
        name: "Magazines",
        icon: <FaFileAlt />,
        path: "/main-admin/magazines",
      },
    ],
  };

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col">

      {/* Logo */}

      <div className="p-6 border-b border-slate-800">

        <h1 className="text-2xl font-bold text-emerald-400">
          E-Magazine
        </h1>

        <p className="text-sm text-slate-400">
          NMAM Institute of Technology
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4 space-y-2">

        {menu[role]?.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>

            <span>{item.name}</span>

          </NavLink>

        ))}

      </nav>

      {/* Logout */}

      <div className="p-4 border-t border-slate-800">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 rounded-xl py-3 transition"
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;