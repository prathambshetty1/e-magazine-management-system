import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">

      {/* Left Side */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        
        
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-6">

        {/* Notification */}

        <button className="relative text-slate-600 hover:text-emerald-600 transition">
          <FaBell size={22} />

          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* User */}

        <div className="flex items-center gap-3">

          <FaUserCircle
            size={42}
            className="text-emerald-600"
          />

          <div>

            <p className="font-semibold">
              {user?.name}
            </p>

            <p className="text-sm text-slate-500 capitalize">
              {user?.role?.replace("_", " ")}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;