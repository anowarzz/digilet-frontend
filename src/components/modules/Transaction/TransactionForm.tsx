import BalanceCard from "@/components/modules/Wallet/BalanceCard";
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
import { useGetWalletQuery } from "@/redux/features/wallet/wallet.api";
import { zodResolver } from "@hookform/resolvers/zod";
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
}

// Form schema
const transactionSchema = z.object({
  phoneNumber: z
    .string({ error: "Phone Number Is Required" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be  Bangladeshi number. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
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
}: TransactionFormProps) => {
  const { data: walletData, isLoading } = useGetWalletQuery(undefined);

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
    <div className=" dark:from-gray-900 dark:to-slate-900 px-4 py-3 ">
      <div className="max-w-2xl mx-auto space-y-3">
        {/* Header */}
        <div className="text-center space-y-2">
          <div
            className={`w-16 h-16 bg-gradient-to-r ${gradientClass} rounded-2xl flex items-center justify-center shadow-lg mx-auto`}
          >
            <img src={icon} className="w-12 h-12 text-white" alt={title} />
          </div>
          <h1 className="text-2xl md:text-2xl font-bold">{title}</h1>
          <p className="text-gray-800">{description}</p>
        </div>

        {/* Current Balance Card */}
        <BalanceCard
          size="small"
          walletData={walletData}
          isLoading={isLoading}
        />

        {/* Transaction Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-4 "
            >
              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:w-9/12 mx-auto">
                      {type === "send-money"
                        ? "Recipient Phone Number"
                        : "Agent Phone Number"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
                        type="text"
                        {...field}
                        className="md:w-9/12 mx-auto rounded-2xl border bg-gray-50 dark:bg-gray-800 px-5 py-5 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormDescription className="text-sm md:w-9/12 mx-auto">
                      {type === "send-money" &&
                        "Enter the phone number of the person you want to send money to"}
                      {type === "add-money" &&
                        "Enter the agent phone number you want to add money from"}
                      {type === "withdraw-money" &&
                        "Enter the agent phone number you want to withdraw money to"}
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
                    <FormLabel className="md:w-9/12 mx-auto">
                      Amount ৳
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                        className="w-full rounded-2xl border bg-gray-50 dark:bg-gray-800 px-5 py-5 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 placeholder:text-gray-400 md:w-9/12 mx-auto"
                      />
                    </FormControl>
                    <FormDescription>
                      {type === "withdraw-money" && (
                        <>
                          Maximum withdrawal amount: ৳
                          {walletData?.data?.balance?.toLocaleString()}
                        </>
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="md: w-9/12 mx-auto ">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-6 text-white font-semibold rounded-lg bg-gradient-to-r ${gradientClass} hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer`}
                >
                  {isLoading ? "Processing..." : buttonText}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Additional Info based on transaction type */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            {type === "add-money" && (
              <div>
                <h4 className="font-medium mb-1">How to add money:</h4>
                <p>Funds will be added to your wallet securely</p>
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
                  Funds will be transferred to your provided agent phone
                  number's wallet
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
