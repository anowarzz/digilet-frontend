import { Button } from "@/components/ui/button";
import type { IWallet } from "@/types/wallet.type";
import {
  Check,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  RefreshCw,
  Shield,
  TrendingUp,
  Wallet as WalletIcon,
} from "lucide-react";
import { useState } from "react";

interface BalanceCardProps {
  className?: string;
  walletData?: IWallet;
  isLoading?: boolean;
}

const BalanceCard = ({
  className = "",
  walletData,
  isLoading = false,
}: BalanceCardProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Main Balance Card */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-2xl p-5 lg:p-6 border border-purple-500/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-transparent"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-radial from-purple-400/10 via-transparent to-transparent rounded-full blur-2xl"></div>

        <div className="relative z-10">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <WalletIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white text-lg font-bold">Digital Wallet</h3>
                <button
                  onClick={() => copyToClipboard(walletData?.walletId || "")}
                  className="text-purple-200 text-xs font-medium hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group"
                  title="Click to copy Wallet ID"
                >
                  <span className="font-mono">
                    {walletData?.walletId || "Loading..."}
                  </span>
                  {copied ? (
                    <Check className="w-3 h-3 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              </div>
            </div>

            {/* Wallet Status */}
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${
                  walletData?.isBlocked
                    ? "bg-red-500/20 text-red-300"
                    : "bg-green-500/20 text-green-300"
                }`}
              >
                <Shield className="w-3 h-3" />
                <span className="text-xs font-medium">
                  {walletData?.isBlocked ? "Blocked" : "Active"}
                </span>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                {showBalance ? (
                  <Eye className="w-5 h-5 text-white" />
                ) : (
                  <EyeOff className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Balance Display */}
          <div className="mb-5">
            <p className="text-purple-200 text-sm font-medium mb-1">
              Available Balance
            </p>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:2xl lg:text-3xxl font-bold text-white">
                {showBalance
                  ? isLoading
                    ? "Loading..."
                    : `৳ ${
                        walletData?.balance?.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        }) || "0.00"
                      }`
                  : "৳ ••••••••"}
              </h1>
              {!isLoading && (
                <Button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors group">
                  <RefreshCw className="w-4 h-4 text-purple-300 group-hover:text-white group-hover:rotate-180 transition-all duration-500" />
                </Button>
              )}
            </div>
          </div>

          {/* Compact Stats */}
          <div className="flex gap-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 flex-1">
              <div className="flex items-center gap-2">
                <div className=" bg-emerald-500/20 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-emerald-400 text-xs font-medium">
                    This Month
                  </p>
                  <p className="text-white text-sm font-bold">৳ 12,450</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 flex-1">
              <div className="flex items-center gap-2">
                <div className=" bg-blue-500/20 rounded-lg">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-blue-400 text-xs font-medium">
                    Transactions
                  </p>
                  <p className="text-white text-sm font-bold">247</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
