import { useMemo, useState } from "react";

import SubmissionRow from "./SubmissionRow";

function SubmissionTable({ submissions, refresh }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return submissions
      .filter((submission) => {
        const matchesSearch =
          submission.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          submission.student.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          submission.student.usn
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
          status === "All" ||
          submission.status === status;

        const matchesCategory =
          category === "All" ||
          submission.category === category;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesCategory
        );
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
  }, [submissions, search, status, category]);

  const categories = [
    "Articles",
    "Poems",
    "Short Stories",
    "Photography",
    "Paintings",
  ];

  return (
    <div className="space-y-5">

      <div className="flex flex-wrap gap-4">

        <input
          type="text"
          placeholder="Search title, student or USN..."
          className="flex-1 border rounded-xl px-4 py-2"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="border rounded-xl px-4 py-2"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
          <option>Published</option>
        </select>

        <select
          className="border rounded-xl px-4 py-2"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option>All</option>

          {categories.map((cat) => (
            <option key={cat}>
              {cat}
            </option>
          ))}

        </select>

      </div>

      <div className="overflow-hidden rounded-2xl border shadow-sm">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Preview
              </th>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Student
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Submitted
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Reviewed By
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((submission) => (

              <SubmissionRow
                key={submission._id}
                submission={submission}
                refresh={refresh}
              />

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default SubmissionTable;