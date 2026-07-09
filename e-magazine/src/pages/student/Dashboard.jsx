import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/common/StatCard";
import { ROLES } from "@/config/roles";
import SubmissionWindowList from "@/components/student/SubmissionWindowList";
import { getSubmissionWindows } from "@/services/WindowService";
import { getDashboardStats } from "@/services/submissionService";

import {
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUpload,
  FaEye,
  FaCalendarAlt,
  FaHistory,
} from "react-icons/fa";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [dashboard, setDashboard] = useState({
    stats: {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      published: 0,
    },
    recent: [],
  });

  const [loading, setLoading] = useState(true);
  const [windows, setWindows] = useState([]);

  useEffect(() => {
  loadDashboard();
  loadSubmissionWindows();
}, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const loadSubmissionWindows = async () => {
  try {
    const data = await getSubmissionWindows();
    setWindows(data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <DashboardLayout role={ROLES.STUDENT}>
      <div className="space-y-8">

        {/* Greeting */}

        <div>
          <h1 className="text-4xl font-bold">
            Good Evening, {user?.name} 👋
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Here's what's happening with your submissions today.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

          <StatCard
            title="My Submissions"
            value={dashboard.stats.total}
            icon={<FaFileAlt />}
            color="text-blue-500"
          />

          <StatCard
            title="Pending"
            value={dashboard.stats.pending}
            icon={<FaClock />}
            color="text-yellow-500"
          />

          <StatCard
            title="Approved"
            value={dashboard.stats.approved}
            icon={<FaCheckCircle />}
            color="text-green-500"
          />

          <StatCard
            title="Rejected"
            value={dashboard.stats.rejected}
            icon={<FaTimesCircle />}
            color="text-red-500"
          />

        </div>

        {/* Bottom */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Recent Activity */}

          <Card className="rounded-2xl shadow-sm">

            <CardHeader>

              <CardTitle className="flex items-center gap-2">
                <FaHistory className="text-emerald-500" />
                Recent Activity
              </CardTitle>

            </CardHeader>

            <CardContent>

              {loading ? (

                <p>Loading...</p>

              ) : dashboard.recent.length === 0 ? (

                <p className="text-gray-500">
                  No submissions yet.
                </p>

              ) : (

                <ul className="space-y-5">

                  {dashboard.recent.map((submission) => (

                    <li
                      key={submission._id}
                      className="flex justify-between"
                    >

                      <div>

                        <p className="font-medium">
                          {submission.title}
                        </p>

                        <p className="text-sm text-gray-500">
                          {submission.category}
                        </p>

                      </div>

                      <span
                        className={`font-semibold
                        ${
                          submission.status === "Approved"
                            ? "text-green-500"
                            : submission.status === "Pending"
                            ? "text-yellow-500"
                            : submission.status === "Rejected"
                            ? "text-red-500"
                            : "text-blue-500"
                        }`}
                      >
                        {submission.status}
                      </span>

                    </li>

                  ))}

                </ul>

              )}

            </CardContent>

          </Card>

          {/* Right */}

          <div className="space-y-6">

            {/* Quick Actions */}

            <Card className="rounded-2xl shadow-sm">

              <CardHeader>

                <CardTitle>
                  Quick Actions
                </CardTitle>

              </CardHeader>

              <CardContent className="space-y-4">

                <Link to="/student/submit">

                  <Button className="w-full flex items-center gap-2">

                    <FaUpload />

                    Submit Content

                  </Button>

                </Link>

                <Link to="/student/my-submissions">

                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                  >

                    <FaEye />

                    View My Submissions

                  </Button>

                </Link>

              </CardContent>

            </Card>

            <Card className="rounded-2xl shadow-sm">

  <CardHeader>

    <CardTitle className="flex items-center gap-2">

      <FaCalendarAlt className="text-emerald-600" />

      Submission Windows

    </CardTitle>

  </CardHeader>

  <CardContent>

    <SubmissionWindowList
    windows={windows}
/>

  </CardContent>

</Card>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;