import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitles = {
    "/student/dashboard": "Dashboard",
    "/student/submit": "Submit Content",
    "/student/my-submissions": "My Submissions",

    "/dept-admin/dashboard": "Department Dashboard",
    "/dept-admin/review": "Review Submissions",

    "/main-admin/dashboard": "Main Admin Dashboard",
    "/main-admin/publish": "Publish Magazine",
  };

  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

      {/* Left */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {pageTitle}
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Welcome, {user?.name} • {today}
        </p>
      </div>

      {/* Right */}

      <Button
        variant="destructive"
        onClick={handleLogout}
        className="flex items-center gap-2"
      >
        <FaSignOutAlt />
        Logout
      </Button>

    </header>
  );
}

export default Navbar;