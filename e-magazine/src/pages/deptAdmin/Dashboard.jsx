import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/common/StatCard";

import { ROLES } from "@/config/roles";
import { getDashboard } from "@/services/adminService";

import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaTasks,
  FaHistory,
} from "react-icons/fa";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    pending: 0,
    approvedToday: 0,
    rejectedToday: 0,
    totalReviewed: 0,
  });

  const [recentPending, setRecentPending] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();

      setStats(data.stats);
      setRecentPending(data.recentPending);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout role={ROLES.DEPT_ADMIN}>
      <div className="space-y-8">

        {/* Greeting */}

        <div>
          <h1 className="text-4xl font-bold">
            Welcome, {user?.name} 👋
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Manage submissions for{" "}
            <span className="font-semibold">
              {user?.department}
            </span>
          </p>
        </div>

        {/* Statistics */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

          <StatCard
            title="Pending Reviews"
            value={stats.pending}
            icon={<FaClock />}
            color="text-yellow-500"
          />

          <StatCard
            title="Approved Today"
            value={stats.approvedToday}
            icon={<FaCheckCircle />}
            color="text-green-500"
          />

          <StatCard
            title="Rejected Today"
            value={stats.rejectedToday}
            icon={<FaTimesCircle />}
            color="text-red-500"
          />

          <StatCard
            title="Total Reviewed"
            value={stats.totalReviewed}
            icon={<FaTasks />}
            color="text-blue-500"
          />

        </div>

        {/* Recent Pending */}

        <Card className="rounded-2xl shadow-sm">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <FaHistory className="text-emerald-500" />

              Recent Pending Submissions

            </CardTitle>

          </CardHeader>

          <CardContent>

            {recentPending.length === 0 ? (

              <p className="text-gray-500">
                No pending submissions.
              </p>

            ) : (

              <div className="space-y-4">

                {recentPending.map((submission) => (

                  <div
                    key={submission._id}
                    className="flex justify-between items-center border-b pb-3"
                  >

                    <div>

                      <h3 className="font-semibold">
                        {submission.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {submission.category}
                      </p>

                    </div>

                    <span className="text-yellow-500 font-semibold">
                      Pending
                    </span>

                  </div>

                ))}

              </div>

            )}

          </CardContent>

        </Card>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;