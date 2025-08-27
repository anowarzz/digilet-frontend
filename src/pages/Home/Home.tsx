import Features from "@/components/modules/HomePage/Features";
import HeroCards from "@/components/modules/HomePage/HeroCards";
import HeroSection from "@/components/modules/HomePage/HeroSection";
import PricingCard from "@/components/modules/HomePage/PricingCard";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HeroCards />
      <PricingCard />
      <Features />
    </div>
  );
};

export default Home;
