import SubmissionCard from "./SubmissionCard";

function SubmissionList({ submissions }) {
  return (
    <div className="space-y-5">

      {submissions.map((submission) => (

        <SubmissionCard
          key={submission._id}
          submission={submission}
        />

      ))}

    </div>
  );
}

export default SubmissionList;