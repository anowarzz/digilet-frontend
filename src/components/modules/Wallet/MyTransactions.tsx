import { useTransactionsHistoryQuery } from "@/redux/features/wallet/wallet.api";
import type { ITransaction } from "@/types/transaction.type";
import TransactionTable from "../Transaction/TransactionsTable";

interface MyTransactionsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function MyTransactions({
  currentPage,
  setCurrentPage,
}: MyTransactionsProps) {
  // Pass currentPage to API query
  const { data: userTransactions, isLoading } = useTransactionsHistoryQuery({
    page: currentPage,
  });

  // Get totalPages from API response meta
  const totalPages = userTransactions?.meta?.totalPages || 1;

  return (
    <TransactionTable
      transactions={userTransactions?.data as ITransaction[]}
      isLoading={isLoading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
    />
  );
}
