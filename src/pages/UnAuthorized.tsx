import { Home, Shield } from "lucide-react";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-red-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>

          {/* Error code */}
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            401
          </h1>

          {/* Main message */}
          <h2 className="text-xl font-semibold text-white mb-4">
            Unauthorized Access
          </h2>

          <p className="text-gray-300 mb-8 leading-relaxed">
            You don't have permission to access this page
          </p>

          {/* Action buttons */}
          <div className="space-y-3">
            <Link
              to="/"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
