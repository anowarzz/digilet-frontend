import { Banknote, List, PlusCircle, Send } from "lucide-react";
import { useState } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTransactionsHistoryQuery } from "@/redux/features/wallet/wallet.api";
import type { ITransaction } from "@/types/transaction.type";
import TransactionTable from "../Transaction/TransactionsTable";

export default function MyTransactions() {
  const [activeTab, setActiveTab] = useState("all-transactions");

  const { data: userTransactions, isLoading } =
    useTransactionsHistoryQuery(undefined);

  console.log("User Transactions:", userTransactions?.data);

  const tabOptions = [
    { value: "all-transactions", label: "All Transactions", icon: List },
    { value: "add-money", label: "Add Money", icon: PlusCircle },
    { value: "send-money", label: "Send Money", icon: Send },
    { value: "withdraw-money", label: "Withdraw", icon: Banknote },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      {/* Mobile Select (shown on small screens) */}
      <div className="block sm:hidden mb-3 px-2">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select transaction type" />
          </SelectTrigger>
          <SelectContent>
            {tabOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center">
                  <option.icon
                    className="me-2 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Tabs (hidden on small screens) */}
      <div className="hidden sm:block">
        <ScrollArea>
          <TabsList className="bg-background mb-3 h-auto p-0 shadow-xs w-full grid grid-cols-4">
            {tabOptions.map((option) => (
              <TabsTrigger
                key={option.value}
                value={option.value}
                className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
              >
                <option.icon
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <TabsContent value="all-transactions">
        <TransactionTable
          transactions={userTransactions?.data as ITransaction[]}
          isLoading={isLoading}
        />
      </TabsContent>
      <TabsContent value="add-money">
        <TransactionTable
          transactions={userTransactions?.data as ITransaction[]}
          isLoading={isLoading}
        />
      </TabsContent>
      <TabsContent value="send-money">
        <TransactionTable
          transactions={userTransactions?.data as ITransaction[]}
          isLoading={isLoading}
        />
      </TabsContent>
      <TabsContent value="withdraw-money">
        <TransactionTable
          transactions={userTransactions?.data as ITransaction[]}
          isLoading={isLoading}
        />
      </TabsContent>
    </Tabs>
  );
}
