import { useState } from "react";
import { toast } from "react-hot-toast";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  FaBook,
  FaCalendarAlt,
  FaEye,
  FaTrash,
} from "react-icons/fa";

import MagazineDialog from "./MagazineDialog";
import ConfirmDialog from "@/components/common/ConfirmDialog";

import {
  deleteMagazine,
} from "@/services/magazineService";

function MagazineCard({
  magazine,
  refresh,
}) {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteMagazine(magazine._id);

      toast.success("Magazine deleted successfully.");

      setConfirmOpen(false);

      refresh();

    } catch (error) {

      console.error(error);

      toast.error("Failed to delete magazine.");

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
              onClick={() => setOpen(true)}
            >
              <FaEye className="mr-2" />
              View
            </Button>

            <Button
              variant="destructive"
              onClick={() => setConfirmOpen(true)}
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

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete Magazine"
        description="This action will permanently delete this magazine and restore all its submissions back to Approved."
        confirmText="Delete"
        onConfirm={handleDelete}
      />
    </>
  );
}

export default MagazineCard;