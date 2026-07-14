import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { updateSubmissionWindow } from "@/services/WindowService";

function EditWindowDialog({
  open,
  onOpenChange,
  window,
  onSaved,
}) {
  const [openDate, setOpenDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window) {
      setOpenDate(
        window.openDate
          ? window.openDate.substring(0, 10)
          : ""
      );

      setCloseDate(
        window.closeDate
          ? window.closeDate.substring(0, 10)
          : ""
      );
    }
  }, [window]);

  if (!window) return null;

  const handleSave = async () => {
    if (!openDate || !closeDate) {
      toast.error("Please select both dates.");
      return;
    }

    if (openDate >= closeDate) {
      toast.error("Close date must be after Open date.");
      return;
    }

    try {
      setLoading(true);

      await updateSubmissionWindow(
        window.category,
        {
          openDate,
          closeDate,
        }
      );

      toast.success("Submission window updated!");

      onOpenChange(false);

      if (onSaved) {
        onSaved();
      }

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update submission window."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle className="text-2xl">
            Edit Submission Window
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-6 mt-4">

          <div>

            <label className="font-semibold">
              Category
            </label>

            <input
              value={window.category}
              disabled
              className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
            />

          </div>

          <div>

            <label className="font-semibold">
              Open Date
            </label>

            <input
              type="date"
              value={openDate}
              onChange={(e) =>
                setOpenDate(e.target.value)
              }
              className="w-full mt-2 border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="font-semibold">
              Close Date
            </label>

            <input
              type="date"
              value={closeDate}
              onChange={(e) =>
                setCloseDate(e.target.value)
              }
              className="w-full mt-2 border rounded-lg p-3"
            />

          </div>

          <div className="flex justify-end gap-4">

            <Button
              variant="outline"
              onClick={() =>
                onOpenChange(false)
              }
            >
              Cancel
            </Button>

            <Button
              disabled={loading}
              onClick={handleSave}
            >
              {loading
                ? "Saving..."
                : "Save"}
            </Button>

          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}

export default EditWindowDialog;