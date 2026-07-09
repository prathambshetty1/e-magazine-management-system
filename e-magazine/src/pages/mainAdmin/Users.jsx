import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import UserTable from "@/components/main-admin/UserTable";

import { ROLES } from "@/config/roles";

import { getUsers } from "@/services/mainAdminService";

function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {

      const data = await getUsers();

      setUsers(data);

    } catch (err) {

      console.error(err);

      alert("Failed to load users.");

    } finally {

      setLoading(false);

    }
  };

  return (

    <DashboardLayout role={ROLES.MAIN_ADMIN}>

      <div className="space-y-6">

        <div>

          <h1 className="text-4xl font-bold">

            Manage Users

          </h1>

          <p className="text-gray-500">

            Promote or remove Department Admins.

          </p>

        </div>

        {loading ? (

          <p>Loading users...</p>

        ) : (

          <UserTable
            users={users}
            refresh={loadUsers}
          />

        )}

      </div>

    </DashboardLayout>

  );
}

export default Users;