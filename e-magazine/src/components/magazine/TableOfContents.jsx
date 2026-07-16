import {
  FaBookOpen,
  FaPenNib,
  FaFeatherAlt,
  FaCamera,
  FaPalette,
} from "react-icons/fa";

const icons = {
  Articles: <FaBookOpen className="text-emerald-600" />,
  Poems: <FaFeatherAlt className="text-emerald-600" />,
  "Short Stories": <FaPenNib className="text-emerald-600" />,
  Photography: <FaCamera className="text-emerald-600" />,
  Paintings: <FaPalette className="text-emerald-600" />,
};

function TableOfContents({ grouped }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-12 mt-10">

      <h2 className="text-3xl font-bold mb-8 text-center">
        Table of Contents
      </h2>

      <div className="space-y-5">

        {Object.entries(grouped).map(([category, list]) => {

          if (!list.length) return null;

          return (
            <div
              key={category}
              className="flex justify-between items-center border-b pb-4"
            >

              <div className="flex items-center gap-4">

                <span className="text-xl">
                  {icons[category]}
                </span>

                <span className="text-lg font-medium">
                  {category}
                </span>

              </div>

              <span className="text-gray-500">
                {list.length} item{list.length > 1 ? "s" : ""}
              </span>

            </div>
          );

        })}

      </div>

    </div>
  );
}

export default TableOfContents;