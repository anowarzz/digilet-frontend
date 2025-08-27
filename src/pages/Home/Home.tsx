import Features from "@/components/modules/HomePage/Features";
import HeroCards from "@/components/modules/HomePage/HeroCards";
import HeroSection from "@/components/modules/HomePage/HeroSection";
import PricingCard from "@/components/modules/HomePage/PricingCard";
import Faq from "../Faq/Faq";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HeroCards />
      <Features />
      <PricingCard />
      <Faq />
    </div>
  );
};

export default Home;
