import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  transactionCount?: number;
  transactionVolume?: number;
  walletData?: IWallet;
  isLoading?: boolean;
  phone: string;
  onRefresh?: () => void;
}

const BalanceCard = ({
  className = "",
  walletData,
  transactionCount,
  transactionVolume,
  phone,
  isLoading = false,
  onRefresh,
}: BalanceCardProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  //  copy wallet id
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  console.log(transactionCount);
  console.log(transactionVolume);

  // refresh balane
  const handleRefresh = async () => {
    if (onRefresh && !isRefreshing) {
      setIsRefreshing(true);
      try {
        onRefresh();
      } finally {
        setTimeout(() => setIsRefreshing(false), 500);
      }
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
                <h3 className="text-white text-lg font-bold">{phone}</h3>
                <button
                  onClick={() => copyToClipboard(walletData?.walletId || "")}
                  className="text-purple-200 text-xs hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group"
                  title="Click to copy Wallet ID"
                >
                  <span className="font-mono">
                    {walletData?.walletId ? (
                      walletData.walletId
                    ) : (
                      <Skeleton className="h-4 w-24 inline-block" />
                    )}
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
                {showBalance ? (
                  isLoading ? (
                    <Skeleton className="h-8 w-32 bg-white/20" />
                  ) : (
                    `৳ ${
                      walletData?.balance?.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      }) || "0.00"
                    }`
                  )
                ) : (
                  "৳ ••••••••"
                )}
              </h1>
              {!isLoading && (
                <Button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-1.5 bg-transparent hover:bg-white/10 rounded-lg transition-colors group disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw
                    className={`w-4 h-4 text-purple-300 group-hover:text-white transition-colors duration-300 ${
                      isRefreshing ? "animate-spin" : ""
                    }`}
                  />
                </Button>
              )}
            </div>
          </div>

          {/* Compact Stats */}
          <div className="flex gap-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-emerald-500/20 rounded-lg">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                  </div>
                  <p className="text-emerald-400 text-xs font-medium">
                    This Month
                  </p>
                </div>
                <p className="text-white text-sm font-bold">
                  ৳ {transactionVolume}
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-blue-500/20 rounded-lg">
                    <CreditCard className="w-3 h-3 text-blue-400" />
                  </div>
                  <p className="text-emerald-400 text-xs font-medium">
                    Transactions
                  </p>
                </div>
                <p className="text-white text-sm font-bold">
                  {transactionCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
