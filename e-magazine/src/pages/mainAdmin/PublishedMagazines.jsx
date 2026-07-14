import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MagazineCard from "@/components/main-admin/MagazineCard";

import { ROLES } from "@/config/roles";
import { getMagazines } from "@/services/magazineService";

function PublishedMagazines() {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMagazines();
  }, []);

  const loadMagazines = async () => {
    try {
      const data = await getMagazines();
      setMagazines(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load magazines.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role={ROLES.MAIN_ADMIN}>
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Published Magazines
          </h1>

          <p className="text-gray-500 mt-2">
            View all published magazine editions.
          </p>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : magazines.length === 0 ? (
          <p className="text-gray-500">
            No magazines published yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {magazines.map((magazine) => (
              <MagazineCard
                key={magazine._id}
                magazine={magazine}
                refresh={loadMagazines}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default PublishedMagazines;