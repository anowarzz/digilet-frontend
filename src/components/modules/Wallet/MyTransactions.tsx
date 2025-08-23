import { Banknote, List, PlusCircle, Send } from "lucide-react";
import { useState } from "react";

import { useTransactionsHistoryQuery } from "@/redux/features/wallet/wallet.api";
import type { ITransaction } from "@/types/transaction.type";
import TransactionTable from "../Transaction/TransactionsTable";

export default function MyTransactions() {


  const { data: userTransactions, isLoading } =
    useTransactionsHistoryQuery(undefined);



  return (
    <TransactionTable
      transactions={userTransactions?.data as ITransaction[]}
      isLoading={isLoading}
    />
  );
}
