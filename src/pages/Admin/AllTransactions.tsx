import TransactionTable from "@/components/modules/Transaction/TransactionsTable";
import { useAllTransactionsQuery } from "@/redux/features/admin/admin.api";
import type { ITransaction } from "@/types/transaction.type";
import { useEffect, useMemo, useState } from "react";

const AllTransactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [rangeFilter, setRangeFilter] = useState("ALL");

  // Reset to page 1 when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, typeFilter, rangeFilter]);

  const apiParams = {
    page: currentPage,
    limit: 10,
    ...(statusFilter !== "ALL" && { status: statusFilter }),
    ...(typeFilter !== "ALL" && { transactionType: typeFilter }),
  };

  const { data, isLoading } = useAllTransactionsQuery(apiParams);

  const totalPages = data?.meta?.totalPages || 1;

  // Filter transactions by date range on frontend
  const filteredTransactions = useMemo(() => {
    const allTransactions = data?.data || [];
    if (rangeFilter === "ALL") return allTransactions;

    const now = new Date();
    const filterDate = new Date();

    switch (rangeFilter) {
      case "24h":
        filterDate.setDate(now.getDate() - 1);
        break;
      case "7d":
        filterDate.setDate(now.getDate() - 7);
        break;
      case "15d":
        filterDate.setDate(now.getDate() - 15);
        break;
      case "30d":
        filterDate.setDate(now.getDate() - 30);
        break;
      default:
        return allTransactions;
    }

    return allTransactions.filter((transaction: ITransaction) => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate >= filterDate;
    });
  }, [data?.data, rangeFilter]);

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">
        All Transactions
      </h2>
      <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 sm:p-4 border border-gray-100 dark:border-gray-800 overflow-x-auto">
        <TransactionTable
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          transactions={filteredTransactions}
          isLoading={isLoading}
          totalPages={totalPages}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          rangeFilter={rangeFilter}
          setRangeFilter={setRangeFilter}
        />
      </div>
    </div>
  );
};

export default AllTransactions;
