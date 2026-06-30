import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/common/StatCard";
import { ROLES } from "@/config/roles";

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

  return (
    <DashboardLayout role={ROLES.STUDENT}>
      <div className="space-y-8">

        {/* Greeting */}

        <div>
          <h1 className="text-4xl font-bold">
            Good Evening, {user?.name} 👋
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Here's what's happening with your articles today.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

          <StatCard
            title="My Articles"
            value="12"
            icon={<FaFileAlt />}
            color="text-blue-500"
          />

          <StatCard
            title="Pending"
            value="3"
            icon={<FaClock />}
            color="text-yellow-500"
          />

          <StatCard
            title="Approved"
            value="8"
            icon={<FaCheckCircle />}
            color="text-green-500"
          />

          <StatCard
            title="Rejected"
            value="1"
            icon={<FaTimesCircle />}
            color="text-red-500"
          />

        </div>

        {/* Bottom Section */}

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

              <ul className="space-y-5">

                <li className="flex justify-between">

                  <div>

                    <p className="font-medium">
                      AI in Healthcare
                    </p>

                    <p className="text-sm text-gray-500">
                      Approved by Department Admin
                    </p>

                  </div>

                  <span className="text-green-500 font-semibold">
                    Approved
                  </span>

                </li>

                <li className="flex justify-between">

                  <div>

                    <p className="font-medium">
                      Blockchain Security
                    </p>

                    <p className="text-sm text-gray-500">
                      Awaiting Review
                    </p>

                  </div>

                  <span className="text-yellow-500 font-semibold">
                    Pending
                  </span>

                </li>

                <li className="flex justify-between">

                  <div>

                    <p className="font-medium">
                      Web Development Trends
                    </p>

                    <p className="text-sm text-gray-500">
                      Changes Requested
                    </p>

                  </div>

                  <span className="text-red-500 font-semibold">
                    Revision
                  </span>

                </li>

              </ul>

            </CardContent>

          </Card>

          {/* Right Side */}

          <div className="space-y-6">

            {/* Quick Actions */}

            <Card className="rounded-2xl shadow-sm">

              <CardHeader>
                <CardTitle>
                  Quick Actions
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                <Button className="w-full flex items-center gap-2">
                  <FaUpload />
                  Submit New Article
                </Button>

                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <FaEye />
                  View My Articles
                </Button>

              </CardContent>

            </Card>

            {/* Upcoming Deadlines */}

            <Card className="rounded-2xl shadow-sm">

              <CardHeader>

                <CardTitle className="flex items-center gap-2">
                  <FaCalendarAlt className="text-red-500" />
                  Upcoming Deadlines
                </CardTitle>

              </CardHeader>

              <CardContent>

                <div className="space-y-4">

                  <div className="border-l-4 border-emerald-500 pl-3">

                    <p className="font-medium">
                      Magazine Submission
                    </p>

                    <p className="text-sm text-gray-500">
                      25 July 2026
                    </p>

                  </div>

                  <div className="border-l-4 border-yellow-500 pl-3">

                    <p className="font-medium">
                      Article Revision
                    </p>

                    <p className="text-sm text-gray-500">
                      29 July 2026
                    </p>

                  </div>

                </div>

              </CardContent>

            </Card>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;