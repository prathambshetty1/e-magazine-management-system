import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  FaBook,
  FaCalendarAlt,
  FaEye,
  FaTrash,
} from "react-icons/fa";

import MagazineDialog from "./MagazineDialog";

import {
  deleteMagazine,
} from "@/services/magazineService";

function MagazineCard({
  magazine,
  refresh,
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this magazine?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMagazine(magazine._id);

      alert("Magazine deleted successfully.");

      refresh();

    } catch (error) {

      console.error(error);

      alert("Failed to delete magazine.");

    }
  };

  return (
    <>
      <Card className="rounded-2xl shadow-sm">

        <CardContent className="p-6">

          <div className="flex items-center gap-3">

            <FaBook className="text-emerald-600 text-2xl" />

            <div>

              <h2 className="text-xl font-bold">
                {magazine.title}
              </h2>

              <p className="text-gray-500">
                {magazine.edition}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2 mt-6 text-gray-500">

            <FaCalendarAlt />

            <span>

              {new Date(
                magazine.publishedAt
              ).toLocaleDateString()}

            </span>

          </div>

          <div className="mt-3">

            <span className="font-medium">

              {magazine.submissions.length}

            </span>{" "}

            submissions

          </div>

          <div className="flex gap-3 mt-6">

            <Button
              className="flex-1"
              onClick={() =>
                setOpen(true)
              }
            >
              <FaEye className="mr-2" />

              View
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              <FaTrash />
            </Button>

          </div>

        </CardContent>

      </Card>

      <MagazineDialog
        open={open}
        onOpenChange={setOpen}
        magazineId={magazine._id}
      />
    </>
  );
}

export default MagazineCard;