import SearchInput from "@/components/serachInput";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAllWalletsQuery,
  useBlockUserWalletMutation,
  useUnblockUserWalletMutation,
} from "@/redux/features/admin/admin.api";
import type { IWallet } from "@/types/wallet.types";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AllWallets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useAllWalletsQuery(
    searchTerm.trim().length >= 2 ? { searchTerm: searchTerm.trim() } : {}
  );
  const wallets = data?.data || [];
  const filteredWallets = wallets;
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Import mutations
  const [blockUserWallet] = useBlockUserWalletMutation();
  const [unblockUserWallet] = useUnblockUserWalletMutation();

  // Block a wallet
  const handleBlockWallet = async (wallet: IWallet) => {
    const toastId = toast.loading(`Blocking wallet...`);

    setTogglingId(wallet._id);
    try {
      const res = await blockUserWallet(wallet.userId).unwrap();
      if (res.success) {
        toast.success(`Wallet blocked successfully.`, {
          id: toastId,
        });
      }
    } catch (err) {
      toast.error(`Failed to block wallet.`, {
        id: toastId,
      });
      console.log(err);
    } finally {
      setTogglingId(null);
    }
  };

  // Unblock a wallet
  const handleUnblockWallet = async (wallet: IWallet) => {
    const toastId = toast.loading(`Unblocking wallet...`);

    setTogglingId(wallet._id);
    try {
      const res = await unblockUserWallet(wallet.userId).unwrap();
      if (res.success) {
        toast.success(`Wallet unblocked successfully.`, {
          id: toastId,
        });
      }
    } catch (err) {
      toast.error(`Failed to unblock wallet.`, {
        id: toastId,
      });
      console.log(err);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        All Wallets
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-md">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name or phone (min 2 chars)..."
            onClear={() => setSearchTerm("")}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-12 border border-gray-100 dark:border-gray-800 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Loading wallets...
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Please wait
          </p>
        </div>
      ) : filteredWallets.length === 0 ? (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900 rounded-xl shadow-lg p-12 border border-gray-100 dark:border-gray-800 text-center">
          {/* Use Wallet icon instead of Users icon */}
          <svg
            className="mx-auto h-16 w-16 text-gray-400 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <rect
              x="3"
              y="7"
              width="18"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M21 10V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="17" cy="12" r="1.5" fill="currentColor" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No Wallets Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            There are currently no wallets in the system.
          </p>
        </div>
      ) : (
        <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 sm:p-4 border border-gray-100 dark:border-gray-800 overflow-x-auto">
          <Table className="min-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[140px]">Name</TableHead>
                <TableHead className="min-w-[140px]">Phone</TableHead>
                <TableHead className="min-w-[100px]">Balance</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[100px]">Action</TableHead>
                <TableHead className="min-w-[100px]">Profile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWallets.map((wallet: IWallet) => (
                <TableRow key={wallet._id}>
                  <TableCell className="break-words">
                    {wallet.userInfo?.name || "-"}
                  </TableCell>
                  <TableCell className="break-words">
                    {wallet.userInfo?.phone || "-"}
                  </TableCell>
                  <TableCell className="break-words">
                    {wallet.balance} {wallet.currency}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        wallet.isBlocked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {wallet.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {wallet.isBlocked ? (
                      <Button
                        aria-label="Unblock wallet"
                        title="Unblock wallet"
                        size="sm"
                        className="rounded w-16 text-xs font-semibold bg-green-100 text-green-600 hover:bg-green-300"
                        disabled={togglingId === wallet._id}
                        onClick={() => handleUnblockWallet(wallet)}
                      >
                        Unblock
                      </Button>
                    ) : (
                      <Button
                        aria-label="Block wallet"
                        title="Block wallet"
                        size="sm"
                        className="rounded w-16 text-xs font-semibold bg-red-100 text-red-600 hover:bg-black"
                        disabled={togglingId === wallet._id}
                        onClick={() => handleBlockWallet(wallet)}
                      >
                        Block
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      aria-label="View profile"
                      title="View profile"
                      size="sm"
                      className="rounded w-16 bg-blue-500 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AllWallets;
