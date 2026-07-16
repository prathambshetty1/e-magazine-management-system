function MagazineArticle({ submission }) {
  return (
    <article className="bg-white rounded-2xl shadow-lg border overflow-hidden">

      {submission.image && (
        <img
          src={submission.image}
          alt={submission.title}
          className="w-full max-h-[500px] object-cover"
        />
      )}

      <div className="p-8">

        <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full">
          {submission.category}
        </span>

        <h2 className="text-3xl font-bold mt-5">
          {submission.title}
        </h2>

        <p className="text-gray-500 mt-2 italic">
          By {submission.student?.name}
        </p>

        {submission.description && (
          <p className="mt-6 leading-8 text-gray-700 whitespace-pre-wrap">
            {submission.description}
          </p>
        )}

      </div>

    </article>
  );
}

export default MagazineArticle;