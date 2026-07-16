import logo from "@/assets/logo/nmamit-logo.png";

function MagazineCover({ magazine }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

      <img
        src={logo}
        alt="NMAMIT"
        className="w-136 mx-auto"
      />

      

      <p className="text-xl text-gray-500 mt-3">
        E-MAGAZINE
      </p>

      <div className="w-36 h-1 bg-emerald-600 mx-auto my-10 rounded-full"/>

      <h1 className="text-5xl font-bold">
        {magazine.title}
      </h1>

      <p className="text-2xl text-gray-500 mt-4">
        {magazine.edition}
      </p>

      {magazine.description && (

        <p className="max-w-3xl mx-auto mt-10 text-lg leading-8 text-gray-700">

          {magazine.description}

        </p>

      )}

      <div className="mt-16 text-gray-400">

        Published on

        <div className="font-semibold mt-2">

          {new Date(
            magazine.publishedAt
          ).toLocaleDateString()}

        </div>

      </div>

    </div>
  );
}

export default MagazineCover;