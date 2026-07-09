import UserRow from "./UserRow";

function UserTable({
  users,
  refresh,
}) {

  return (

    <div className="overflow-hidden rounded-2xl border bg-white">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">
              Name
            </th>

            <th className="text-left p-4">
              USN
            </th>

            <th className="text-left p-4">
              Email
            </th>

            <th className="text-left p-4">
              Role
            </th>

            <th className="text-left p-4">
              Department
            </th>

            <th className="text-center p-4">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <UserRow
              key={user._id}
              user={user}
              refresh={refresh}
            />

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default UserTable;