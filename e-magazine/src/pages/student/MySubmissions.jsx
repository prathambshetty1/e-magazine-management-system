import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import SubmissionList from "@/components/submission/SubmissionList";
import EmptyState from "@/components/submission/EmptyState";

import { getMySubmissions } from "@/services/submissionService";
import { ROLES } from "@/config/roles";

function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const data = await getMySubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load submissions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role={ROLES.STUDENT}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            My Submissions
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage all your submitted content.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-lg">
            Loading submissions...
          </div>
        ) : submissions.length === 0 ? (
          <EmptyState />
        ) : (
          <SubmissionList submissions={submissions} />
        )}

      </div>
    </DashboardLayout>
  );
}

export default MySubmissions;