import TransactionTable from "@/components/modules/Transaction/TransactionsTable";
import { useAllTransactionsQuery } from "@/redux/features/admin/admin.api";
import { useEffect, useState } from "react";

const AllTransactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, typeFilter]);

  const { data, isLoading } = useAllTransactionsQuery({
    page: currentPage,
    limit: 10,
    ...(statusFilter !== "ALL" && { status: statusFilter }),
    ...(typeFilter !== "ALL" && { transactionType: typeFilter }),
  });

  const totalPages = data?.meta?.totalPages || 1;

  const transactions = data?.data || [];

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">
        All Transactions
      </h2>
      <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 sm:p-4 border border-gray-100 dark:border-gray-800 overflow-x-auto">
        <TransactionTable
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          transactions={transactions}
          isLoading={isLoading}
          totalPages={totalPages}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
      </div>
    </div>
  );
};

export default AllTransactions;
