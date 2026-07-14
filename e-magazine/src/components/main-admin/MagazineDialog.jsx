import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { getMagazineById } from "@/services/magazineService";

function MagazineDialog({
  open,
  onOpenChange,
  magazineId,
}) {
  const [magazine, setMagazine] = useState(null);

  useEffect(() => {
    if (open) {
      loadMagazine();
    }
  }, [open]);

  const loadMagazine = async () => {
    try {
      const data = await getMagazineById(
        magazineId
      );

      setMagazine(data);

    } catch (error) {
      console.error(error);
    }
  };

  if (!magazine) return null;

  const grouped = {
    Articles: magazine.submissions.filter(
      (s) => s.category === "Articles"
    ),

    Poems: magazine.submissions.filter(
      (s) => s.category === "Poems"
    ),

    "Short Stories": magazine.submissions.filter(
      (s) =>
        s.category === "Short Stories"
    ),

    Photography: magazine.submissions.filter(
      (s) =>
        s.category === "Photography"
    ),

    Paintings: magazine.submissions.filter(
      (s) =>
        s.category === "Paintings"
    ),
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="!max-w-5xl max-h-[90vh] overflow-y-auto">

        <DialogHeader>

          <DialogTitle className="text-3xl">

            {magazine.title}

          </DialogTitle>

          <p className="text-gray-500">

            {magazine.edition}

          </p>

        </DialogHeader>

        <div className="space-y-8 mt-4">

          {Object.entries(grouped).map(
            ([category, list]) => {

              if (!list.length) return null;

              return (

                <div key={category}>

                  <h2 className="text-2xl font-bold border-b pb-2">

                    {category}

                  </h2>

                  <div className="space-y-6 mt-4">

                    {list.map((submission) => (

                      <div
                        key={submission._id}
                        className="border rounded-xl p-5"
                      >

                        <h3 className="text-xl font-semibold">

                          {submission.title}

                        </h3>

                        <p className="text-gray-500 mt-1">

                          By{" "}
                          {submission.student?.name}

                        </p>

                        {submission.description && (

                          <p className="mt-4 whitespace-pre-wrap">

                            {submission.description}

                          </p>

                        )}

                        {submission.image && (

                          <img
                            src={submission.image}
                            alt={submission.title}
                            className="mt-4 rounded-xl max-h-96 object-contain"
                          />

                        )}

                      </div>

                    ))}

                  </div>

                </div>

              );

            }
          )}

        </div>

      </DialogContent>

    </Dialog>
  );
}

export default MagazineDialog;