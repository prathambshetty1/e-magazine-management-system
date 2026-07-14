import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/common/StatCard";

import { ROLES } from "@/config/roles";

import {
  FaUsers,
  FaUserShield,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

import { getDashboardStats } from "@/services/mainAdminService";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCategoryAdmins: 0,
    pendingArticles: 0,
    approvedArticles: 0,
    publishedArticles: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout role={ROLES.MAIN_ADMIN}>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Good Evening, {user?.name} 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Manage the entire E-Magazine platform.
          </p>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

          <StatCard
            title="Students"
            value={stats.totalStudents}
            icon={<FaUsers />}
            color="text-blue-500"
          />

          <StatCard
            title="Department Admins"
            value={stats.totalCategoryAdmins}
            icon={<FaUserShield />}
            color="text-purple-500"
          />

          <StatCard
            title="Pending"
            value={stats.pendingArticles}
            icon={<FaClock />}
            color="text-yellow-500"
          />

          <StatCard
            title="Approved"
            value={stats.approvedArticles}
            icon={<FaCheckCircle />}
            color="text-green-500"
          />

        </div>

        <Card className="rounded-2xl">

          <CardHeader>

            <CardTitle>
              Quick Actions
            </CardTitle>

          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-4">

            <Link to="/main-admin/users">
              <Button className="w-full">
                Manage Users
              </Button>
            </Link>

            <Link to="/main-admin/submission-windows">
              <Button
                variant="outline"
                className="w-full"
              >
                Submission Windows
              </Button>
            </Link>

            <Link to="/main-admin/submissions">
              <Button
                variant="outline"
                className="w-full"
              >
                View All Submissions
              </Button>
            </Link>

            <Link to="/main-admin/magazine-builder">
              <Button
                variant="outline"
                className="w-full"
              >
                Magazine Builder
              </Button>
            </Link>

          </CardContent>

        </Card>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;