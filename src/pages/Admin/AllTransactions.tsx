import TransactionTable from "@/components/modules/Transaction/TransactionsTable";
import { useAllTransactionsQuery } from "@/redux/features/admin/admin.api";

const AllTransactions = () => {
  const { data, isLoading } = useAllTransactionsQuery(undefined);
  const transactions = data?.data || [];

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        All Transactions
      </h2>
      <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 sm:p-4 border border-gray-100 dark:border-gray-800 overflow-x-auto">
        <TransactionTable transactions={transactions} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default AllTransactions;
