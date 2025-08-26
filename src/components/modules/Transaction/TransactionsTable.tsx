import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ITransaction } from "@/types/transaction.type";
import { useState } from "react";

interface TransactionTableProps {
  transactions: ITransaction[];
  isLoading?: boolean;
}

const TransactionTable = ({
  transactions,
  isLoading = false,
}: TransactionTableProps) => {
  // Filter state (must be at top level)
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [rangeFilter, setRangeFilter] = useState("ALL");

  console.log(typeFilter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return `৳${amount.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <Table>
        <TableCaption>Loading transactions...</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(3)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>Loading...</TableCell>
              <TableCell>Loading...</TableCell>
              <TableCell>Loading...</TableCell>
              <TableCell>Loading...</TableCell>
              <TableCell className="text-right">Loading...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  // ...existing code...

  // Transaction type options
  const transactionTypeOptions = [
    { label: "All Transactions", value: "ALL" },
    { label: "Add Money", value: "ADD_MONEY" },
    { label: "Send Money", value: "SEND_MONEY" },
    { label: "Withdraw Money", value: "WITHDRAW_MONEY" },
  ];

  // Date range options
  const rangeOptions = [
    { label: "All Time", value: "ALL" },
    { label: "Last 24 Hours", value: "24h" },
    { label: "Last 7 Days", value: "7d" },
    { label: "Last 15 Days", value: "15d" },
    { label: "Last 30 Days", value: "30d" },
  ];

  // Only filter by type
  const filteredTransactions =
    typeFilter === "ALL" || !typeFilter
      ? transactions
      : transactions.filter(
          (transaction) => transaction.transactionType === typeFilter
        );

  return (
    <div>
      {/* Centered filter header with label */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1 items-center">
            <span className="text-sm font-medium">Transaction Type</span>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Transactions" />
              </SelectTrigger>
              <SelectContent>
                {transactionTypeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <span className="text-sm font-medium">Date Range</span>
            <Select value={rangeFilter} onValueChange={setRangeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                {rangeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Table>
        <TableCaption>
          {filteredTransactions?.length > 0
            ? `Your recent transactions (${filteredTransactions.length} total)`
            : "No transactions found"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell className="font-medium text-sm">
                  {transaction.transactionId}
                </TableCell>
                <TableCell>
                  {transaction.transactionType.replace(/_/g, " ")}
                </TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                <TableCell className="text-right">
                  {formatAmount(transaction.amount)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
