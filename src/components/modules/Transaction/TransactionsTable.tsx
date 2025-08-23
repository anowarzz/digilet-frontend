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

interface TransactionTableProps {
  transactions: ITransaction[];
  isLoading?: boolean;
}

const TransactionTable = ({
  transactions,
  isLoading = false,
}: TransactionTableProps) => {
  console.log(transactions, "table fild");

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

  return (
    <Table>
      <TableCaption>
        {transactions?.length > 0
          ? `Your recent transactions (${transactions.length} total)`
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
  );
};

export default TransactionTable;
