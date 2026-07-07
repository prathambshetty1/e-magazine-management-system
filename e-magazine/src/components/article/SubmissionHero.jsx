import {
  FaNewspaper,
  FaFeatherAlt,
  FaBookOpen,
  FaCamera,
  FaPalette,
} from "react-icons/fa";

const contentTypes = {
  Articles: {
    icon: <FaNewspaper size={60} />,
    title: "Article Submission",
    description:
      "Share technical knowledge, campus news, experiences and informative write-ups with the NMAMIT community.",
    gradient: "from-blue-600 via-cyan-500 to-sky-400",
  },

  Poems: {
    icon: <FaFeatherAlt size={60} />,
    title: "Poetry Submission",
    description:
      "Express emotions and creativity through meaningful verses and poems.",
    gradient: "from-violet-600 via-fuchsia-500 to-pink-500",
  },

  "Short Stories": {
    icon: <FaBookOpen size={60} />,
    title: "Story Submission",
    description:
      "Share engaging stories that entertain, educate and inspire readers.",
    gradient: "from-orange-500 via-red-500 to-rose-500",
  },

  Photography: {
    icon: <FaCamera size={60} />,
    title: "Photography Submission",
    description:
      "Upload your best original photographs captured on campus or beyond.",
    gradient: "from-emerald-600 via-green-500 to-lime-400",
  },

  Paintings: {
    icon: <FaPalette size={60} />,
    title: "Painting Submission",
    description:
      "Showcase your artwork and let your creativity reach the entire college.",
    gradient: "from-pink-600 via-rose-500 to-orange-400",
  },
};

function SubmissionHero({ category }) {
  const data = contentTypes[category];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${data.gradient} p-10 text-white shadow-xl`}
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10"></div>
      <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-white/10"></div>

      <div className="relative flex items-center gap-8">

        <div className="rounded-3xl bg-white/20 p-6 backdrop-blur-sm shadow-lg">
          {data.icon}
        </div>

        <div>

          <p className="uppercase tracking-[6px] text-sm text-white/80">
            NMAMIT E-MAGAZINE
          </p>

          <h1 className="text-5xl font-bold mt-2">
            {data.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-white/90 leading-8">
            {data.description}
          </p>

        </div>

      </div>
    </div>
  );
}

export default SubmissionHero;