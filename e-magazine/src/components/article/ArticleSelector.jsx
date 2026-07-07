import {
  FaNewspaper,
  FaFeatherAlt,
  FaBookOpen,
  FaCamera,
  FaPalette,
  FaArrowRight,
} from "react-icons/fa";

const options = [
  {
    title: "Articles",
    description: "Technical blogs, experiences, tutorials and informative write-ups.",
    icon: <FaNewspaper size={42} />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Poems",
    description: "Express your creativity through poetry and meaningful verses.",
    icon: <FaFeatherAlt size={42} />,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Short Stories",
    description: "Share engaging fictional or real-life stories with readers.",
    icon: <FaBookOpen size={42} />,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Photography",
    description: "Upload your best original photographs captured on campus or beyond.",
    icon: <FaCamera size={42} />,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Paintings",
    description: "Showcase your artwork and digital paintings for publication.",
    icon: <FaPalette size={42} />,
    color: "from-pink-500 to-rose-500",
  },
];

function ArticleSelector({ onSelect }) {
  return (
    <div>

      <div className="text-center mb-12">

        <h1 className="text-5xl font-bold">
          Submit Content
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          Choose the type of content you would like to contribute to the NMAMIT E-Magazine.
        </p>

      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

        {options.map((item) => (

          <button
            key={item.title}
            onClick={() => onSelect(item.title)}
            className="group text-left rounded-3xl border bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >

            <div
              className={`inline-flex p-5 rounded-2xl bg-gradient-to-r ${item.color} text-white mb-6`}
            >
              {item.icon}
            </div>

            <h2 className="text-2xl font-bold">
              {item.title}
            </h2>

            <p className="text-gray-500 mt-3 leading-7">
              {item.description}
            </p>

            <div className="mt-8 flex items-center text-emerald-600 font-semibold group-hover:gap-3 gap-2 transition-all">

              Continue

              <FaArrowRight />

            </div>

          </button>

        ))}

      </div>

    </div>
  );
}

export default ArticleSelector;