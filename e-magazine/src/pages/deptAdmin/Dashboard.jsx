import DashboardLayout from "@/components/layout/DashboardLayout";
import { ROLES } from "@/config/roles";

function Dashboard() {
  return (
    <DashboardLayout role={ROLES.DEPT_ADMIN}>

      <h1 className="text-3xl font-bold">
        Department Admin Dashboard
      </h1>

    </DashboardLayout>
  );
}

export default Dashboard;