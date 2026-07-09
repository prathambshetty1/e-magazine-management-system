import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import SubmissionWindowGrid from "@/components/main-admin/SubmissionWindowGrid";
import EditWindowDialog from "@/components/main-admin/EditWindowDialog";

import { getSubmissionWindows } from "@/services/WindowService";

import { ROLES } from "@/config/roles";

function SubmissionWindows() {
  const [windows, setWindows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedWindow, setSelectedWindow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchWindows();
  }, []);

  const fetchWindows = async () => {
    try {
      setLoading(true);

      const data = await getSubmissionWindows();

      setWindows(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load submission windows.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (window) => {
    setSelectedWindow(window);
    setDialogOpen(true);
  };

  return (
    <DashboardLayout role={ROLES.MAIN_ADMIN}>
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Submission Windows
          </h1>

          <p className="text-gray-500 mt-2">
            Configure submission opening and closing dates for each category.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-lg">
            Loading submission windows...
          </div>
        ) : (
          <SubmissionWindowGrid
            windows={windows}
            onEdit={handleEdit}
          />
        )}

        <EditWindowDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          window={selectedWindow}
          onSaved={fetchWindows}
        />

      </div>
    </DashboardLayout>
  );
}

export default SubmissionWindows;