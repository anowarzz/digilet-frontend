import addMoneyIcon from "@/assets/Icons/add-money.png";
import cashInIcon from "@/assets/Icons/cash-in.png";
import cashOutIcon from "@/assets/Icons/cash-out.png";
import sendMoneyIcon from "@/assets/Icons/send-money.png";
import withdrawMoneyIcon from "@/assets/Icons/withdraw-money.png";
import CardSwap, { Card } from "@/components/ui/CardSwap";
import { TransactionType } from "@/constants/transactions";
import { useEffect, useState } from "react";

const HeroCards = () => {
  const [dimensions, setDimensions] = useState({ width: 500, height: 400 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 768); // md breakpoint

      if (screenWidth < 480) {
        setDimensions({ width: 300, height: 240 });
      } else if (screenWidth < 768) {
        setDimensions({ width: 400, height: 320 });
      } else {
        setDimensions({ width: 500, height: 400 });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const transactions = [
    {
      type: TransactionType.ADD_MONEY,
      title: "Add Money",
      description: "Top up your wallet instantly",
      icon: addMoneyIcon,
    },
    {
      type: TransactionType.SEND_MONEY,
      title: "Send Money",
      description: "Transfer funds securely",
      icon: sendMoneyIcon,
    },
    {
      type: TransactionType.WITHDRAW_MONEY,
      title: "Withdraw Money",
      description: "Cash out to your account",
      icon: withdrawMoneyIcon,
    },
    {
      type: TransactionType.CASH_IN,
      title: "Cash In",
      description: "Deposit cash at agents",
      icon: cashInIcon,
    },
    {
      type: TransactionType.CASH_OUT,
      title: "Cash Out",
      description: "Withdraw cash from agents",
      icon: cashOutIcon,
    },
  ];

  const features = [
    {
      title: "Digital Wallet Management",
      description:
        "Manage your Digilet wallet with real-time balance updates and transaction history.",
      icon: (
        <img src={cashInIcon} alt="Wallet Management" className="w-6 h-6" />
      ),
      color: "from-custom-blue-500 to-custom-blue-600",
      bgColor: "bg-custom-blue-50 dark:bg-custom-blue-950/20",
    },
    {
      title: "Instant Money Transfer",
      description:
        "Send money instantly to any Digilet user with just a phone number.",
      icon: <img src={sendMoneyIcon} alt="Send Money" className="w-6 h-6" />,
      color: "from-custom-blue-400 to-custom-blue-500",
      bgColor: "bg-custom-blue-50 dark:bg-custom-blue-950/20",
    },
    {
      title: "Add Money to Wallet",
      description:
        "Top up your wallet instantly through multiple payment methods.",
      icon: <img src={addMoneyIcon} alt="Add Money" className="w-6 h-6" />,
      color: "from-custom-blue-500 to-custom-blue-700",
      bgColor: "bg-custom-blue-50 dark:bg-custom-blue-950/20",
    },
    {
      title: "Cash Withdrawal",
      description:
        "Withdraw money from your digital wallet through authorized agents.",
      icon: (
        <img src={withdrawMoneyIcon} alt="Withdraw Money" className="w-6 h-6" />
      ),
      color: "from-custom-blue-600 to-custom-blue-700",
      bgColor: "bg-custom-blue-50 dark:bg-custom-blue-950/20",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-custom-blue/5 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-4 md:gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl text-custom-blue">
              Why Choose Digilet?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Experience the future of digital transactions with our
              comprehensive suite of financial services.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Instant Transactions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Process payments and transfers in seconds with our
                    lightning-fast system.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Secure & Reliable
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Bank-level security ensures your money and data are always
                    protected.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    24/7 Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Our dedicated support team is available around the clock to
                    assist you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Feature Cards */}
          {isMobile && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-center mb-6 text-custom-blue">
                Our Services
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-4 transition-all duration-300 hover:shadow-lg hover:shadow-custom-blue-500/10 hover:border-custom-blue-200 dark:hover:border-custom-blue-800"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${feature.color} ${feature.bgColor} shadow-md`}
                      >
                        <div className="text-white">{feature.icon}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground group-hover:text-custom-blue-600 dark:group-hover:text-custom-blue-400 transition-colors mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Desktop: CardSwap */}
          {!isMobile && (
            <div className="relative flex justify-center lg:justify-end items-center min-h-[400px] md:min-h-[500px]">
              <CardSwap
                width={dimensions.width}
                height={dimensions.height}
                cardDistance={40}
                verticalDistance={50}
                delay={4000}
                pauseOnHover={true}
              >
                {transactions.map((transaction, index) => (
                  <Card
                    key={index}
                    className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center"
                  >
                    <img
                      src={transaction.icon}
                      alt={transaction.title}
                      className="w-16 h-16 mb-4 object-contain"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {transaction.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {transaction.description}
                    </p>
                  </Card>
                ))}
              </CardSwap>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroCards;
