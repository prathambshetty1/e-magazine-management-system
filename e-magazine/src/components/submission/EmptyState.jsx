import { FaInbox } from "react-icons/fa";

function EmptyState() {
  return (
    <div className="text-center py-20">

      <FaInbox
        className="mx-auto text-6xl text-gray-300"
      />

      <h2 className="text-3xl font-bold mt-6">
        No Submissions Yet
      </h2>

      <p className="text-gray-500 mt-3">
        Your submitted content will appear here.
      </p>

    </div>
  );
}

export default EmptyState;