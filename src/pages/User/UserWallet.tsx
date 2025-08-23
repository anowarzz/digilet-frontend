import addMoneyIcon from "@/assets/Icons/add-money.png";
import sendrawMoneyIcon from "@/assets/Icons/send-money.png";
import withdrawMoneyIcon from "@/assets/Icons/withdraw-money.png";
import BalanceCard from "@/components/modules/Wallet/BalanceCard";
import { Button } from "@/components/ui/button";
import { useGetWalletQuery } from "@/redux/features/wallet/wallet.api";
import { HistoryIcon } from "lucide-react";
import { Link } from "react-router";

const UserWallet = () => {
  const { data: walletData, isLoading } = useGetWalletQuery(undefined);

  console.log(walletData);

  const quickActions = [
    {
      title: "Add Money",
      subtitle: "Top up wallet",
      icon: addMoneyIcon,
      color: "from-emerald-500 to-teal-600",
      hoverColor: "hover:from-emerald-600 hover:to-teal-700",
      route: "/user/add-money",
    },
    {
      title: "Send Money",
      subtitle: "Transfer to others",
      icon: sendrawMoneyIcon,
      color: "from-fuchsia-500 to-purple-600",
      hoverColor: "hover:from-fuchsia-600 hover:to-purple-700",
      route: "/user/send-money",
    },
    {
      title: "Withdraw Money",
      subtitle: "Cash out to bank",
      icon: withdrawMoneyIcon,
      color: "from-pink-500 to-rose-600",
      hoverColor: "hover:from-pink-600 hover:to-rose-700",
      route: "/user/withdraw-money",
    },
  ];

  return (
    <div className=" dark:from-gray-900 dark:to-slate-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-3 lg:space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-muted-foreground dark:text-white">
              My Wallet
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-400 mt-1">
              Manage your digital wallet with ease
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex text items-center">
              <HistoryIcon className="w-4 h-4" />
              <span className="sm:inline">Transaction History</span>
            </Button>
          </div>
        </div>

        {/* Balance Card */}
        <BalanceCard walletData={walletData} isLoading={isLoading} />

        {/* Quick Actions */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-white dark:text-white">
            Quick Actions
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.route}
                className="group cursor-pointer"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:scale-[1.02] h-full min-h-[120px] sm:min-h-[160px] flex">
                  <div className="flex flex-col items-center justify-between text-center w-full py-2">
                    {/* Icon with gradient background */}
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${action.color} ${action.hoverColor} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <img
                        src={action.icon}
                        className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-1 sm:space-y-2 mt-2 sm:mt-4">
                      <h3 className="text-xs sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight">
                        {action.title}
                      </h3>
                      <p className="hidden md:block text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        {action.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-white dark:text-white">
              Recent Activity
            </h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {/* Mock recent transactions */}
            {[
              {
                type: "Received",
                amount: "+$250.00",
                from: "John Doe",
                time: "2 hours ago",
                color: "text-green-600",
              },
              {
                type: "Sent",
                amount: "-$75.50",
                to: "Coffee Shop",
                time: "5 hours ago",
                color: "text-red-600",
              },
              {
                type: "Added",
                amount: "+$500.00",
                from: "Bank Transfer",
                time: "1 day ago",
                color: "text-blue-600",
              },
            ].map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      transaction.type === "Received"
                        ? "bg-green-500"
                        : transaction.type === "Sent"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {transaction.type} {transaction.from || transaction.to}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.time}
                    </p>
                  </div>
                </div>
                <div className={`font-semibold ${transaction.color}`}>
                  {transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWallet;
