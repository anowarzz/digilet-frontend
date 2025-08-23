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
import { TransactionType } from "@/constants/transactions";
import { useGetWalletQuery } from "@/redux/features/wallet/wallet.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { WalletIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

interface TransactionFormProps {
  type: string;
  title: string;
  description: string;
  buttonText: string;
  icon: string;
  gradientClass?: string;
  onSubmit: (data: { phone: string; amount: number }) => void;
}

// Form schema
const transactionSchema = z.object({
  phone: z
    .string({ error: "Phone Number Is Required" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be  Bangladeshi number. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 5;
    }, "Amount must be at least ৳5"),
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
      phone: "",
      amount: "", // Start with empty string
    },
  });

  const handleFormSubmit = (values: z.infer<typeof transactionSchema>) => {
    onSubmit({
      phone: values.phone,
      amount: parseFloat(values.amount.toString()) || 0,
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 px-4 py-8 md:py-6 min-h-screen ">
      <div className="max-w-2xl mx-auto space-y-2">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="relative">
            <div
              className={`w-10 h-10 bg-gradient-to-r ${gradientClass} rounded-xl flex items-center justify-center shadow-xl mx-auto transform hover:scale-105 transition-transform duration-300`}
            >
              <img
                src={icon}
                className="w-8 h-8 text-white drop-shadow-lg"
                alt={title}
              />
            </div>
            {/* Decorative elements */}
          </div>
          <div className="">
            <h1 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {title}
            </h1>
            {/* <p className="text-gray-600 text-sm  dark:text-gray-400 ">
              {description}
            </p> */}
          </div>
        </div>

        {/* Current Balance Card */}
        <div className="relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-sm shadow-xl p-4 transform  transition-transform duration-300">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                    <WalletIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-semibold tracking-wide">
                      Available Balance
                    </p>
                    <p className="text-white/70 text-xs">Ready to use</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white text-lg sm:text-xl lg:text-2xl drop-shadow-lg">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span className="text-base">Loading...</span>
                      </div>
                    ) : (
                      `৳ ${
                        walletData?.balance?.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        }) || "0.00"
                      }`
                    )}
                  </div>
                  <p className="text-white/60 text-xs">BDT</p>
                </div>
              </div>
              {/* Decorative pattern */}
              <div className="absolute top-0 right-0  w-24 h-24 opacity-10">
                <div className="absolute inset-0 bg-blue-500 rounded-full transform rotate-45 scale-150"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Form Card */}
        <div className="relative -mt-2 ">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl blur-sm opacity-80"></div>
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-sm px-6 py-4 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleFormSubmit)}
                  className="space-y-3 mb-4"
                >
                  {/* Phone Number Field */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {type === TransactionType.SEND_MONEY
                            ? "Recipient Phone Number"
                            : "Agent Phone Number"}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="01XXXXXXXXX"
                              type="text"
                              {...field}
                              className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 px-4 py-3 text-base shadow-lg focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder:text-gray-400 hover:shadow-xl"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg border-l-2 border-blue-400">
                          {type === TransactionType.SEND_MONEY &&
                            "💸 Enter the phone number of the person you want to send money to"}
                          {type === TransactionType.ADD_MONEY &&
                            "💰 Enter the agent phone number you want to add money from"}
                          {type === TransactionType.WITHDRAW_MONEY &&
                            "🏧 Enter the agent phone number you want to withdraw money to"}
                        </FormDescription>
                        <FormMessage className="text-red-500 text-sm m-0" />
                      </FormItem>
                    )}
                  />

                  {/* Amount Field */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Amount (৳)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                              <span className="text-gray-500 text-base font-semibold">
                                ৳
                              </span>
                            </div>
                            <Input
                              type="number"
                              min="5"
                              step="1"
                              placeholder="Enter amount"
                              {...field}
                              className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 pl-10 pr-4 py-3 text-base font-semibold shadow-lg focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 placeholder:text-gray-400 hover:shadow-xl"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              <div className="text-xs text-gray-500 font-medium">
                                BDT
                              </div>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20  rounded-lg border-l-2 border-yellow-400">
                          ⚠️ Minimum withdrawal amount: ৳ 5
                        </FormDescription>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="pt-1">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-4 text-white font-bold text-base rounded-xl bg-gradient-to-r ${gradientClass} hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 shadow-xl hover:shadow-2xl relative overflow-hidden group`}
                    >
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <div className="relative flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>{buttonText}</span>
                            <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                          </>
                        )}
                      </div>
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
