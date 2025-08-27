import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Banknote, CreditCard, Send } from "lucide-react";

const PricingCard = () => {
  const pricingPlans = [
    {
      icon: <Send className="h-6 w-6 text-blue-600" />,
      title: "Send Money",
      price: "BDT 2",
      unit: "/ Thousand",
      description: "Transfer money to other Digilet users instantly",
      features: [
        "Instant money transfer",
        "Real-time notifications",
        "Secure end-to-end encryption",
        "24/7 customer support",
        "Transaction history tracking",
      ],
      popular: false,
      color: "blue",
    },
    {
      icon: <Banknote className="h-6 w-6 text-green-600" />,
      title: "Cash Out",
      price: "BDT 5",
      unit: "/ Thousand",
      description: "Withdraw cash through our agent network",
      features: [
        "Nationwide agent network",
        "Instant cash withdrawal",
        "PIN protection",
        "Balance verification",
        "Emergency support",
      ],
      popular: true,
      color: "green",
    },
    {
      icon: <CreditCard className="h-6 w-6 text-purple-600" />,
      title: "Online Payment",
      price: "Free",
      unit: "/ Thousand",
      description: "Pay for online services and merchant transactions",
      features: [
        "Online merchant payments",
        "Bill payment services",
        "E-commerce integration",
        "Instant payment confirmation",
        "Secure checkout process",
      ],
      popular: false,
      color: "purple",
    },
  ];

  return (
    <section className="py-6  md:py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Transparent Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            All Charges of Digilet
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Simple, transparent pricing for all your financial transactions. No
            hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? "ring-2 ring-green-500 scale-105"
                  : "hover:scale-105"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-full bg-${plan.color}-100 dark:bg-${plan.color}-900/20`}
                  >
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {plan.title}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 ml-1">
                    {plan.unit}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <Separator className="mb-6" />

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm"
                    >
                      <ArrowRight className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                  variant={plan.popular ? "default" : "default"}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Important Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                💳 Minimum Transaction
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                All charges are calculated per thousand taka. Minimum
                transaction amount is BDT 5.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                🛡️ Security First
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                All transactions are protected with bank-level security and
                real-time fraud detection.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                📞 24/7 Support
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Our customer support team is available round the clock to assist
                you.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                📊 No Hidden Fees
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                What you see is what you pay. No additional charges or surprise
                fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCard;
