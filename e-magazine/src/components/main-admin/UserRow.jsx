import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  assignDepartmentAdmin,
  removeDepartmentAdmin,
} from "@/services/mainAdminService";

const categories = [
  "Articles",
  "Poems",
  "Short Stories",
  "Photography",
  "Paintings",
];

function UserRow({
  user,
  refresh,
}) {
  const [department, setDepartment] = useState(
    "Articles"
  );

  const [loading, setLoading] = useState(false);

  // ==========================
  // Assign Department Admin
  // ==========================

  const handleAssign = async () => {
    try {
      setLoading(true);

      await assignDepartmentAdmin({
        usn: user.usn,
        department,
      });

      alert("Department Admin assigned successfully.");

      refresh();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
          "Assignment failed."
      );

    } finally {

      setLoading(false);

    }
  };

  // ==========================
  // Remove Department Admin
  // ==========================

  const handleRemove = async () => {
    if (
      !window.confirm(
        "Remove Department Admin privileges?"
      )
    )
      return;

    try {

      setLoading(true);

      await removeDepartmentAdmin({
        usn: user.usn,
      });

      alert("Department Admin removed.");

      refresh();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
          "Removal failed."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <tr className="border-t">

      <td className="p-4 font-medium">
        {user.name}
      </td>

      <td className="p-4">
        {user.usn}
      </td>

      <td className="p-4">
        {user.email}
      </td>

      <td className="p-4 capitalize">
        {user.role.replace("_", " ")}
      </td>

      <td className="p-4">
        {user.department || "-"}
      </td>

      <td className="p-4">

        {user.role === "main_admin" ? (

          <span className="text-gray-400">
            Protected
          </span>

        ) : user.role === "dept_admin" ? (

          <Button
            variant="destructive"
            disabled={loading}
            onClick={handleRemove}
          >
            Remove Admin
          </Button>

        ) : (

          <div className="flex gap-2">

            <select
              className="border rounded-lg px-3 py-2"
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
            >

              {categories.map((category) => (

                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>

              ))}

            </select>

            <Button
              disabled={loading}
              onClick={handleAssign}
            >
              Assign
            </Button>

          </div>

        )}

      </td>

    </tr>
  );
}

export default UserRow;