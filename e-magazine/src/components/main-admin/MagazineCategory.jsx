function MagazineCategory({
  title,
  submissions,
  selected,
  toggleSubmission,
}) {
  if (!submissions.length) return null;

  return (
    <div className="border rounded-2xl p-6 mb-6 bg-white">

      <h2 className="text-2xl font-bold mb-5">

        {title}

      </h2>

      <div className="space-y-3">

        {submissions.map((submission) => (

          <label
            key={submission._id}
            className="flex items-center gap-4 cursor-pointer border rounded-xl p-4 hover:bg-slate-50"
          >

            <input
              type="checkbox"
              checked={selected.includes(
                submission._id
              )}
              onChange={() =>
                toggleSubmission(
                  submission._id
                )
              }
            />

            <div>

              <p className="font-semibold">

                {submission.title}

              </p>

              <p className="text-sm text-gray-500">

                {submission.student.name}

              </p>

            </div>

          </label>

        ))}

      </div>

    </div>
  );
}

export default MagazineCategory;