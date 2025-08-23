import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, WalletIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export type TransactionType = "add-money" | "send-money" | "withdraw-money";

interface TransactionFormProps {
  type: TransactionType;
  title: string;
  description: string;
  buttonText: string;
  icon: string;
  gradientClass?: string;
  onSubmit: (data: { phoneNumber: string; amount: number }) => void;
  isLoading?: boolean;
}

// Form schema
const transactionSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
});

const TransactionForm = ({
  type,
  title,
  description,
  buttonText,
  icon,
  gradientClass,
  onSubmit,
  isLoading = false,
}: TransactionFormProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const [balance] = useState(15420.5); // Mock balance - replace with real data

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      phoneNumber: "",
      amount: 0,
    },
  });

  const handleFormSubmit = (values: z.infer<typeof transactionSchema>) => {
    onSubmit({
      phoneNumber: values.phoneNumber,
      amount: values.amount,
    });
  };

  return (
    <div className=" dark:from-gray-900 dark:to-slate-900 p-4 lg:p-8 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div
            className={`w-20 h-20 bg-gradient-to-r ${gradientClass} rounded-2xl flex items-center justify-center shadow-lg mx-auto`}
          >
            <img src={icon} className="w-10 h-10 text-white" alt={title} />
          </div>
          <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-800">{description}</p>
        </div>

        {/* Current Balance Card */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <WalletIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Current Balance
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {showBalance ? (
                <Eye className="w-5 h-5 text-white" />
              ) : (
                <EyeOff className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
          <div className="text-3xl font-bold text-white">
            {showBalance
              ? `$${balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}`
              : "••••••"}
          </div>
        </div>

        {/* Transaction Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-6"
            >
              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {type === "send-money"
                        ? "Recipient Phone Number"
                        : "Phone Number"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      {type === "send-money"
                        ? "Enter the phone number of the person you want to send money to"
                        : "Enter your phone number"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount Field */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      {type === "withdraw-money" && (
                        <>
                          Maximum withdrawal amount: ${balance.toLocaleString()}
                        </>
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r ${gradientClass} hover:opacity-90 transition-opacity disabled:opacity-50`}
              >
                {isLoading ? "Processing..." : buttonText}
              </Button>
            </form>
          </Form>
        </div>

        {/* Additional Info based on transaction type */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            {type === "add-money" && (
              <div>
                <h4 className="font-medium mb-1">How to add money:</h4>
                <p>
                  Funds will be added to your wallet instantly after
                  verification.
                </p>
              </div>
            )}
            {type === "send-money" && (
              <div>
                <h4 className="font-medium mb-1">Send money securely:</h4>
                <p>
                  The recipient will receive the money instantly in their
                  wallet.
                </p>
              </div>
            )}
            {type === "withdraw-money" && (
              <div>
                <h4 className="font-medium mb-1">Withdraw to bank:</h4>
                <p>
                  Funds will be transferred to your linked bank account within
                  1-2 business days.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
