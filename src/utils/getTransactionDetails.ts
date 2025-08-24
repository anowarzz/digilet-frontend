import type { ITransaction } from "@/types/transaction.type";
import { getTimeAgo } from "./getTimeAgo";

// Transaction details processing function
export const getTransactionDetails = (transaction: ITransaction) => {
  const amount = transaction.amount;
  const type = transaction.transactionType;
  const createdAt = new Date(transaction.createdAt);
  const timeAgo = getTimeAgo(createdAt);

  let displayType = "";
  let displayAmount = "";
  let color = "";
  let bgColor = "";

  switch (type) {
    case "CASH_IN":
      displayType = "Cash In";
      displayAmount = `+$${amount}`;
      color = "text-green-600";
      bgColor = "bg-green-500";
      break;
    case "CASH_OUT":
      displayType = "Cash Out";
      displayAmount = `-$${amount}`;
      color = "text-red-600";
      bgColor = "bg-red-500";
      break;
    case "ADD_MONEY":
      displayType = "Add Money";
      displayAmount = `+$${amount}`;
      color = "text-blue-600";
      bgColor = "bg-blue-500";
      break;
    case "SEND_MONEY":
      displayType = "Send Money";
      displayAmount = `-$${amount}`;
      color = "text-orange-600";
      bgColor = "bg-orange-500";
      break;
    case "WITHDRAW_MONEY":
      displayType = "Withdraw";
      displayAmount = `-$${amount}`;
      color = "text-purple-600";
      bgColor = "bg-purple-500";
      break;
    default:
      displayType = type;
      displayAmount = `$${amount}`;
      color = "text-gray-600";
      bgColor = "bg-gray-500";
  }

  return {
    displayType,
    displayAmount,
    color,
    bgColor,
    timeAgo,
  };
};
