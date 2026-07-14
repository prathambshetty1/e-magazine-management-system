import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";

import MagazineCategory from "@/components/main-admin/MagazineCategory";
import MagazineSummary from "@/components/main-admin/MagazineSummary";

import { ROLES } from "@/config/roles";

import {
  getApprovedSubmissions,
} from "@/services/magazineService";
import {
  createMagazine,
} from "@/services/magazineService";

function MagazineBuilder() {
  const [submissions, setSubmissions] = useState([]);

  const [selected, setSelected] = useState([]);

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
const [edition, setEdition] = useState("");
const [description, setDescription] = useState("");

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {

      const data =
        await getApprovedSubmissions();

      setSubmissions(data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load submissions.");

    } finally {

      setLoading(false);

    }
  };

  const toggleSubmission = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };
const handlePublish = async () => {

  if (!title.trim()) {
    return toast.error("Magazine title required.");
  }

  if (!edition.trim()) {
    return toast.error("Edition required.");
  }

  if (selected.length === 0) {
    return toast.error(
      "Select at least one submission."
    );
  }

  try {

    await createMagazine({
      title,
      edition,
      description,
      submissions: selected,
    });

    toast.success(
      "Magazine published successfully!"
    );

    setTitle("");
    setEdition("");
    setDescription("");
    setSelected([]);

    loadSubmissions();

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Publishing failed."
    );

  }

};
  const grouped = {
    Articles: submissions.filter(
      (s) => s.category === "Articles"
    ),

    Poems: submissions.filter(
      (s) => s.category === "Poems"
    ),

    "Short Stories": submissions.filter(
      (s) =>
        s.category === "Short Stories"
    ),

    Photography: submissions.filter(
      (s) =>
        s.category === "Photography"
    ),

    Paintings: submissions.filter(
      (s) =>
        s.category === "Paintings"
    ),
  };

  return (
    <DashboardLayout role={ROLES.MAIN_ADMIN}>

      <div className="grid lg:grid-cols-[3fr_1fr] gap-8">

        <div>

          <div className="mb-8">

  <h1 className="text-4xl font-bold">
    Magazine Builder
  </h1>

  <p className="text-gray-500 mt-2">
    Create a new magazine edition.
  </p>

  <div className="grid md:grid-cols-2 gap-4 mt-8">

    <input
      type="text"
      placeholder="Magazine Title"
      value={title}
      onChange={(e) =>
        setTitle(e.target.value)
      }
      className="border rounded-xl px-4 py-3"
    />

    <input
      type="text"
      placeholder="Edition"
      value={edition}
      onChange={(e) =>
        setEdition(e.target.value)
      }
      className="border rounded-xl px-4 py-3"
    />

  </div>

  <textarea
    rows={4}
    placeholder="Description..."
    value={description}
    onChange={(e) =>
      setDescription(e.target.value)
    }
    className="border rounded-xl px-4 py-3 w-full mt-4 resize-none"
  />

</div>

          {loading ? (

            <p>Loading...</p>

          ) : (

            Object.entries(grouped).map(
              ([category, list]) => (

                <MagazineCategory
                  key={category}
                  title={category}
                  submissions={list}
                  selected={selected}
                  toggleSubmission={
                    toggleSubmission
                  }
                />

              )
            )

          )}

        </div>

        <MagazineSummary
  submissions={submissions}
  selected={selected}
  onPublish={handlePublish}
/>

      </div>

    </DashboardLayout>
  );
}

export default MagazineBuilder;