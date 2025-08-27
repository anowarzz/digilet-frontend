import { SkeletonCard } from "@/components/Skeleton";
import { useAnalyticsOverviewQuery } from "@/redux/features/admin/admin.api";
import { useCurrentUserInfoQuery } from "@/redux/features/auth/auth.api";
import { formatAmount } from "@/utils/formateAmount";
import { motion } from "framer-motion";
import {
  CreditCard,
  DollarSign,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

const AnalyticsOverview = () => {
  const { data: analyticsData2, isLoading } =
    useAnalyticsOverviewQuery(undefined);

  const { data: user } = useCurrentUserInfoQuery(undefined);

  const analyticsData = analyticsData2?.data
    ? [
        {
          id: 1,
          title: "Total Users",
          value: analyticsData2.data.totalUsers,
          trend: "up",
          icon: Users,
          color: "bg-blue-500",
          lightColor: "bg-blue-50",
          textColor: "text-blue-600",
        },
        {
          id: 2,
          title: "Total Agents",
          value: analyticsData2.data.totalAgents,
          trend: "up",
          icon: UserCheck,
          color: "bg-emerald-500",
          lightColor: "bg-emerald-50",
          textColor: "text-emerald-600",
        },
        {
          id: 3,
          title: "Transaction Count",
          value: analyticsData2.data.transactionCount,
          trend: "up",
          icon: CreditCard,
          color: "bg-purple-500",
          lightColor: "bg-purple-50",
          textColor: "text-purple-600",
        },
        {
          id: 4,
          title: "Transaction Volume",
          value: formatAmount(analyticsData2.data.transactionVolume),
          trend: "up",
          icon: DollarSign,
          color: "bg-amber-500",
          lightColor: "bg-amber-50",
          textColor: "text-amber-600",
        },
      ]
    : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome, {user?.data?.name || "Admin"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Monitor key performance metrics of Digilet
        </p>
      </div>

      {isLoading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard
                key={i}
                width="100%"
                height="125px"
                rounded="xl"
                lines={2}
                lineWidth="80%"
                lineHeight="16px"
              />
            ))}
          </div>
          <div className="mt-8 w-full flex flex-col items-center">
            <SkeletonCard
              width="60%"
              height="32px"
              rounded="md"
              lines={2}
              lineWidth="40%"
              lineHeight="16px"
            />
          </div>
        </>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {analyticsData.map((item) => {
            const IconComponent = item.icon;
            const TrendIcon = item.trend === "up" ? TrendingUp : TrendingDown;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${item.lightColor} p-3 rounded-lg`}>
                    <IconComponent className={`w-6 h-6 ${item.textColor}`} />
                  </div>
                  <div
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      item.trend === "up"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <TrendIcon className="w-3 h-3" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-600">
                    {item.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {item.value}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    {item.trend === "up" ? "Increased" : "Decreased"} from last
                    month
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-indigo-900 dark:to-blue-900 rounded-xl p-6 border border-blue-100 dark:border-indigo-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Performance Summary
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Overall platform growth is trending positively with strong user
              engagement
            </p>
          </div>
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
            <TrendingUp className="w-5 h-5" />
            {/* <span className="text-sm font-medium">+11.2% Overall Growth</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
