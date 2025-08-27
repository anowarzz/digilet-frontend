import addMoneyIcon from "@/assets/Icons/add-money.png";
import cashInIcon from "@/assets/Icons/cash-in.png";
import sendMoneyIcon from "@/assets/Icons/send-money.png";
import withdrawMoneyIcon from "@/assets/Icons/withdraw-money.png";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Banknote, Bell, Shield } from "lucide-react";
import { Link } from "react-router";

const Features = () => {
  const features = [
    {
      title: "Digital Wallet Management",
      description:
        "Manage your Digilet wallet with real-time balance updates, transaction history, and secure account management.",
      icon: (
        <img src={cashInIcon} alt="Wallet Management" className="w-6 h-6" />
      ),
      color: "from-custom-blue-500 to-custom-blue-600",
      bgColor: "bg-custom-blue-50 dark:bg-custom-blue-950/20",
    },
    {
      title: "Instant Money Transfer",
      description:
        "Send money instantly to any Digilet user with just a phone number or username. Fast, secure, and fee-efficient.",
      icon: <img src={sendMoneyIcon} alt="Send Money" className="w-6 h-6" />,
      color: "from-custom-blue-400 to-custom-blue-500",
      bgColor: "bg-custom-blue-50 dark:bg-custom-blue-950/20",
    },
    {
      title: "Add Money to Wallet",
      description:
        "Top up your wallet instantly through multiple payment methods including bank transfers and mobile banking.",
      icon: <img src={addMoneyIcon} alt="Add Money" className="w-6 h-6" />,
      color: "from-custom-blue-500 to-custom-blue-700",
      bgColor: "bg-custom-blue-50 dark:bg-custom-blue-950/20",
    },
    {
      title: "Cash Withdrawal",
      description:
        "Withdraw money from your digital wallet through authorized agents. Convert digital money to physical cash anytime.",
      icon: (
        <img src={withdrawMoneyIcon} alt="Withdraw Money" className="w-6 h-6" />
      ),
      color: "from-custom-blue-600 to-custom-blue-700",
      bgColor: "bg-custom-blue-50 dark:bg-custom-blue-950/20",
    },
    {
      title: "Transaction History",
      description:
        "Track all your transactions with detailed history, including send money, add money, and withdrawal records.",
      icon: <Bell className="size-6" />,
      color: "from-custom-blue-500 to-custom-blue-600",
      bgColor: "bg-custom-blue-50 dark:bg-custom-blue-950/20",
    },
    {
      title: "Secure & Reliable",
      description:
        "Bank-level security with encrypted transactions, secure authentication, and fraud protection for all your digital transactions.",
      icon: <Shield className="size-6" />,
      color: "from-custom-blue-600 to-custom-blue-800",
      bgColor: "bg-custom-blue-50 dark:bg-custom-blue-950/20",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-custom-blue-500 to-custom-blue-600 mb-6">
            <Banknote className="size-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground dark:bg-gradient-to-r dark:from-custom-blue-400 dark:via-custom-blue-500 dark:to-custom-blue-600 dark:bg-clip-text dark:text-transparent">
            Powerful Digital Wallet Features
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience seamless digital transactions with Digilet's
            comprehensive wallet features designed for your financial freedom
            and security.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div>
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:shadow-xl hover:shadow-custom-blue-500/10 hover:border-custom-blue-200 dark:hover:border-custom-blue-800"
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${feature.color}`}
                ></div>

                {/* Icon */}
                <div
                  className={`relative mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} ${feature.bgColor} shadow-lg`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="mb-3 text-xl font-semibold text-foreground group-hover:text-custom-blue-600 dark:group-hover:text-custom-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-custom-blue-500 to-custom-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link to="/register">
            <Button className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-custom-blue-500 to-custom-blue-600 text-white font-medium hover:shadow-lg hover:shadow-custom-blue-500/25 transition-all duration-300 hover:scale-105">
              <span>Start Your Digital Wallet Journey</span>
              <ArrowRightLeft className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
