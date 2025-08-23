import type { IWallet } from "@/types/wallet.type";
import { Check, Copy, Eye, EyeOff, Wallet as WalletIcon } from "lucide-react";
import { useState } from "react";

interface BalanceCardProps {
  className?: string;
  size?: "small" | "large";
  walletData?: IWallet;
  isLoading?: boolean;
}

const BalanceCard = ({
  className = "",
  size = "large",
  walletData,
  isLoading = false,
}: BalanceCardProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const isLarge = size === "large";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl lg:rounded-3xl shadow-xl ${
          isLarge ? "p-6 sm:p-8 lg:p-10" : "p-4 sm:p-6"
        }`}
      >
        <div className="relative z-10">
          <div
            className={`flex items-center  justify-between ${
              isLarge ? "mb-2 sm:mb-3" : "mb-2 sm:mb-3"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <WalletIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-xs sm:text-sm font-medium">
                  Total Balance
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {showBalance ? (
                <Eye
                  className={`text-white ${isLarge ? "w-8 h-8" : "w-6 h-6"}`}
                />
              ) : (
                <EyeOff
                  className={`text-white ${isLarge ? "w-8 h-8" : "w-6 h-6"}`}
                />
              )}
            </button>
          </div>

          <div className="space-y-2">
            <div
              className={`font-bold text-white ${
                isLarge
                  ? "text-2xl sm:text-3xl lg:text-4xl"
                  : "text-xl sm:text-2xl lg:text-3xl"
              }`}
            >
              {showBalance
                ? isLoading
                  ? "Loading..."
                  : `৳ ${
                      walletData?.balance?.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      }) || "0.00"
                    }`
                : "৳ ••••••"}
            </div>

            {/* Wallet ID */}
            {walletData?.walletId && (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-white/60 text-xs sm:text-sm">
                  Wallet ID:
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(walletData?.walletId || "")
                  }
                  className="flex items-center gap-2 text-white/80 text-xs sm:text-sm font-mono bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition-colors cursor-pointer group"
                  title="Click to copy"
                >
                  <span>{walletData?.walletId}</span>
                  {copied ? (
                    <Check className="w-3 h-3 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
