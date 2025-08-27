import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Shield, Users, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Secure Transactions",
      description:
        "Bank-level security with end-to-end encryption for all your financial operations.",
      stats: "99.9% Secure",
    },
    {
      icon: <Zap className="h-8 w-8 text-green-600" />,
      title: "Instant Transfers",
      description:
        "Send and receive money instantly with real-time processing and notifications.",
      stats: "< 30 seconds",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-purple-600" />,
      title: "Low Transaction Fees",
      description:
        "Competitive rates with minimal charges for all your financial transactions.",
      stats: "From 0.5%",
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Growing Community",
      description:
        "Join thousands of users who trust Digilet for their daily financial needs.",
      stats: "10K+ Users",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Why Choose Digilet
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for Modern Finance
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the next generation of digital banking with our
            comprehensive suite of financial tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {feature.description}
                </p>
                <Badge variant="secondary" className="text-xs">
                  {feature.stats}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
