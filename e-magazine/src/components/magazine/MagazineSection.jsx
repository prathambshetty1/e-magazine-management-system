import {
  FaBookOpen,
  FaFeatherAlt,
  FaPenNib,
  FaCamera,
  FaPalette,
} from "react-icons/fa";

import MagazineArticle from "./MagazineArticle";

const icons = {
  Articles: <FaBookOpen />,
  Poems: <FaFeatherAlt />,
  "Short Stories": <FaPenNib />,
  Photography: <FaCamera />,
  Paintings: <FaPalette />,
};

function MagazineSection({
  title,
  submissions,
}) {
  if (!submissions.length) return null;

  return (
    <section className="mt-16">

      <div className="flex items-center gap-4 mb-8 border-b-2 border-emerald-600 pb-4">

        <span className="text-3xl text-emerald-600">
          {icons[title]}
        </span>

        <h2 className="text-4xl font-bold">
          {title}
        </h2>

      </div>

      <div className="space-y-10">

        {submissions.map((submission) => (
          <MagazineArticle
            key={submission._id}
            submission={submission}
          />
        ))}

      </div>

    </section>
  );
}

export default MagazineSection;