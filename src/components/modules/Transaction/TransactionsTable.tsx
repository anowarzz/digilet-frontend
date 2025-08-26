import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { TransactionStatus } from "@/constants/transactions";
import type { ITransaction } from "@/types/transaction.type";
import { formatAmount } from "@/utils/formateAmount";
import { formatDate } from "@/utils/formateDate";
import { useState } from "react";

interface TransactionTableProps {
  transactions: ITransaction[];
  isLoading?: boolean;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  statusFilter?: string;
  setStatusFilter?: (statusValue: string) => void;
}

const TransactionTable = ({
  transactions,
  isLoading = false,
  totalPages,
  currentPage,
  setCurrentPage,
  statusFilter = "ALL",
  setStatusFilter,
}: TransactionTableProps) => {
  // Local filter states for client-side filtering (type and date range)
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [rangeFilter, setRangeFilter] = useState("ALL");

  // Note: Status filtering is handled by the backend through the API call



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

  // Transaction type options
  const transactionTypeOptions = [
    { label: "All Transactions", value: "ALL" },
    { label: "Add Money", value: "ADD_MONEY" },
    { label: "Send Money", value: "SEND_MONEY" },
    { label: "Withdraw Money", value: "WITHDRAW_MONEY" },
  ];

  // Transaction status options
  const transactionStatusOptions = [
    { label: "All Statuses", value: "ALL" },
    { label: "Pending", value: TransactionStatus.PENDING },
    { label: "Completed", value: TransactionStatus.COMPLETED },
    { label: "Failed", value: TransactionStatus.FAILED },
  ];

  // Date range options
  const rangeOptions = [
    { label: "All Time", value: "ALL" },
    { label: "Last 24 Hours", value: "24h" },
    { label: "Last 7 Days", value: "7d" },
    { label: "Last 15 Days", value: "15d" },
    { label: "Last 30 Days", value: "30d" },
  ];

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((currentPage as number) + 1);
  };

  return (
    <div>
      {/* Responsive filter header */}
      <div className="flex flex-col items-center justify-center mb-6">
        {/* Filter options - Responsive layout */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <div className="flex flex-col gap-1 items-center min-w-[140px]">
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
          <div className="flex flex-col gap-1 items-center min-w-[140px]">
            <span className="text-sm font-medium">Transaction Status</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                {transactionStatusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1 items-center min-w-[140px]">
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
      <div className="px-4">
        <Table>
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
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
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
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePreviousPage}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                  <PaginationLink isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TransactionTable;
