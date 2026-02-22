import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <section className="h-full flex items-center justify-center  px-6 relative overflow-hidden">
      {/* Floating Background Circle */}
      <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-40 animate-pulse -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse -bottom-20 -right-20"></div>

      <div className="text-center relative z-10">
        {/* Animated 404 */}
        <h1 className="text-9xl font-extrabold text-indigo-600 animate-bounce">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4 max-w-md mx-auto">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Button */}
        <button
          onClick={handleGoHome}
          className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 hover:scale-105 transition-transform duration-300"
        >
          Go Back Home
        </button>
      </div>
    </section>
  );
};

export default NotFound;
