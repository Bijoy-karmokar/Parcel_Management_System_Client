import { Link } from "react-router-dom";
import { FaBan, FaHome } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
        <FaBan className="text-red-500 text-6xl mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Access Forbidden
        </h1>

        <p className="text-gray-600 mb-6">
          You do not have permission to access this page.  
          This area is restricted based on your role.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 btn btn-primary text-black"
        >
          <FaHome />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
