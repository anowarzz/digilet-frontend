import HeroImage from "@/assets/images/digilet-hero.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline" className="bg-fuchsia-900 text-white">
              Power Up Your Digital Presence
              <ArrowUpRight className="ml-2 size-4" />
            </Badge>
            <h1 className="my-6 text-pretty text-3xl md:text-4xl font-extrabold lg:text-5xl text-green-800">
              Digital Payment Made Easy
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              Send, receive, and manage your money securely. Experience seamless
              transactions, instant notifications, and powerful features
              designed for you.
            </p>
            <div className="flex w-full px-4 flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button asChild className="w-full sm:w-auto bg-fuchsia-900 hover:bg-fuchsia-800">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link to="/features">
                  Explore Features
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
          <img
            src={HeroImage}
            alt="Hero section demo image"
            className="max-h-96 w-full rounded-md object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
