import SubmissionWindowCard from "./SubmissionWindowCard";

function SubmissionWindowGrid({
  windows,
  onEdit,
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {windows.map((window) => (

        <SubmissionWindowCard
          key={window.category}
          window={window}
          onEdit={onEdit}
        />

      ))}

    </div>
  );
}

export default SubmissionWindowGrid;