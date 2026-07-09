import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import SubmissionTable from "@/components/main-admin/SubmissionTable";

import { ROLES } from "@/config/roles";

import {
  getAllSubmissions,
} from "@/services/mainAdminService";

function Submissions() {

  const [submissions, setSubmissions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {

    try {

      const data =
        await getAllSubmissions();

      setSubmissions(data);

    } catch (error) {

      console.error(error);

      alert("Failed to load submissions.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout role={ROLES.MAIN_ADMIN}>

      <div className="space-y-6">

        <div>

          <h1 className="text-4xl font-bold">

            All Submissions

          </h1>

          <p className="text-gray-500">

            View every submission in the system.

          </p>

        </div>

        {loading ? (

          <p>Loading...</p>

        ) : (

          <SubmissionTable
            submissions={submissions}
            refresh={loadSubmissions}
          />

        )}

      </div>

    </DashboardLayout>

  );

}

export default Submissions;