import HeroBg from "@/assets/images/modern-transaction-bg.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const HomeBgSection = () => {
  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(111, 29, 27, 0.6), rgba(0, 78, 152, 0.4)), url(${HeroBg})`,
        minHeight: "400px",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
        <div className="max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBgSection;
