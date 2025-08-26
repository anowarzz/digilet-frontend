import { SkeletonCard } from "@/components/Skeleton";
import { useAgentAnalyticsQuery } from "@/redux/features/agent/agent.api";
import { motion } from "framer-motion";
import { CreditCard, DollarSign, TrendingDown, TrendingUp } from "lucide-react";

const AgentAnalytics = () => {
  const { data, isLoading } = useAgentAnalyticsQuery(undefined);

  const analyticsData = data?.data
    ? [
        {
          id: 1,
          title: "Transaction Count",
          value: data.data.transactionCount,
          trend: "up",
          icon: CreditCard,
          color: "bg-purple-500",
          lightColor: "bg-purple-50 dark:bg-purple-900",
          textColor: "text-purple-600 dark:text-purple-300",
        },
        {
          id: 2,
          title: "Transaction Volume",
          value: Number(data.data.transactionVolume).toFixed(2),
          trend: "up",
          icon: DollarSign,
          color: "bg-amber-500",
          lightColor: "bg-amber-50 dark:bg-amber-900",
          textColor: "text-amber-600 dark:text-amber-300",
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
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Agent Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your agent transaction statistics
        </p>
      </div>
      {isLoading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
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
        <>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${item.lightColor} p-3 rounded-lg`}>
                      <IconComponent className={`w-6 h-6 ${item.textColor}`} />
                    </div>
                    <div
                      className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300`}
                    >
                      <TrendIcon className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {item.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-purple-50 dark:from-purple-900 dark:to-amber-900 rounded-xl p-6 border border-amber-100 dark:border-purple-700 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Performance Summary
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Keep up the great work! Your transaction activity helps users
              every day.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AgentAnalytics;
