import { motion } from "framer-motion";
import { Award, CheckCircle, Globe } from "lucide-react";

const Mission = () => {
  const stats = [
    { label: "Active Users", value: "100K+" },
    { label: "Daily Transactions", value: "50K+" },
    { label: "Agent Locations", value: "500+" },
    { label: "Success Rate", value: "99.9%" },
  ];

  const values = [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      title: "Trust & Security",
      description:
        "Building trust through secure, transparent, and reliable financial services.",
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: "Financial Inclusion",
      description:
        "Making digital financial services accessible to everyone, everywhere.",
    },
    {
      icon: <Award className="h-6 w-6 text-purple-600" />,
      title: "Innovation",
      description:
        "Continuously innovating to provide cutting-edge financial solutions.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <motion.h2
              className="text-3xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Our Mission
            </motion.h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To revolutionize Bangladesh's financial landscape by providing
              accessible, secure, and innovative digital financial services that
              empower individuals and businesses to thrive in the digital
              economy.
            </p>
            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-3">
                  {value.icon}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-custom-blue/10 p-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-myGreen dark:text-custom-blue mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
