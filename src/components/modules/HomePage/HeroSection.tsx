import HeroImage from "@/assets/images/digilet-hero.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-custom-blue/5 dark:bg-gradient-to-br dark:from-rich-black-300 dark:via-rich-black-400 dark:to-rich-black-300 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center text-center space-y-6 lg:items-start lg:text-left">
            <Badge
              variant="outline"
              className="bg-primary text-primary-foreground border-primary/20 hover:bg-primary/90 transition-colors duration-200"
            >
              Power Up Your Digital Presence
              <ArrowUpRight className="ml-2 size-4" />
            </Badge>

            <motion.h1
              className="text-pretty text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl text-myGreen dark:text-custom-blue"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Empowering Your Digital Transactions
            </motion.h1>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl lg:text-xl">
              With Digilet, experience seamless transactions and powerful
              features designed for you.
            </p>

            <div className="flex w-full flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                variant="default"
                asChild
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/register">Get Started</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white transition-all duration-300"
              >
                <Link to="/features">
                  Explore Features
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-custom-blue/20 to-myGreen/20 rounded-2xl blur-3xl opacity-30 dark:opacity-50 dark:from-custom-blue/30 dark:to-myGreen/30"></div>
            <img
              src={HeroImage}
              alt="Hero section demo image"
              className="relative max-h-96 w-full rounded-2xl object-contain shadow-2xl transition-all duration-300 hover:scale-105 dark:brightness-110 dark:contrast-110 dark:drop-shadow-[0_0_20px_rgba(0,78,152,0.3)] hover:dark:drop-shadow-[0_0_25px_rgba(0,78,152,0.4)]"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/10 via-transparent to-transparent dark:from-rich-black-400/20 dark:via-transparent dark:to-rich-black-300/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
