import { ConfirmationDialog } from "@/components/ConfirmationDialog";
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
import { UserStatus } from "@/constants/role";
import {
  useAllUsersQuery,
  useBlockUserMutation,
  useDeleteUserMutation,
  useUnblockUserMutation,
} from "@/redux/features/admin/admin.api";
import type { IUser } from "@/types/user.types";
import { Loader2, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Use search term in query - only search if at least 2 characters
  const { data: allUsers, isLoading } = useAllUsersQuery(
    searchTerm.trim().length >= 2 ? { searchTerm: searchTerm.trim() } : {}
  );
  const users = allUsers?.data || [];

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Handle deleting a user
  const handleDeleteUser = async (userId: string) => {
    const toastId = toast.loading("Deleting user...");

    try {
      const res = await deleteUser(userId).unwrap();

      if (res?.data?.success) {
        console.log(res);
        toast.success("User deleted successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete user", { id: toastId });
    }
  };

  // Handle blocking a user
  const handleBlockUser = async (userId: string) => {
    const toastId = toast.loading("Blocking user...");

    try {
      const res = await blockUser(userId).unwrap();

      if (res?.data?.success) {
        console.log(res);

        toast.success("User blocked successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);

      toast.error("Failed to block user", { id: toastId });
    }
  };

  // Handle unblocking a user
  const handleUnblockUser = async (userId: string) => {
    const toastId = toast.loading("Unblocking user...");
    try {
      const res = await unblockUser(userId).unwrap();
      if (res?.data?.success) {
        console.log(res);
        toast.success("User unblocked successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);

      toast.error("Failed to unblock user", { id: toastId });
    }
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        All Users
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-md">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search users by name, phone, or email (min 2 chars)..."
            onClear={() => setSearchTerm("")}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-12 border border-gray-100 dark:border-gray-800 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Loading users...
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Please wait
          </p>
        </div>
      ) : users.length === 0 ? (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900 rounded-xl shadow-lg p-12 border border-gray-100 dark:border-gray-800 text-center">
          <Users className="mx-auto h-16 w-16 text-gray-400 mb-6" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No Users Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            There are currently no users registered in the system.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Users will appear here once they register for the platform.
          </p>
        </div>
      ) : (
        <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 sm:p-4 border border-gray-100 dark:border-gray-800 overflow-x-auto">
          <Table className="min-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Name</TableHead>
                <TableHead className="min-w-[140px]">Phone</TableHead>
                <TableHead className="min-w-[100px]">Wallet Balance</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[100px]">Action</TableHead>
                <TableHead className="min-w-[100px]">Details</TableHead>
                <TableHead className="min-w-[100px]">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: IUser) => {
                return (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium break-words">
                      {user.name}
                    </TableCell>
                    <TableCell className="break-words">{user.phone}</TableCell>
                    <TableCell className="break-words">
                      {user.wallet?.balance ?? 0} {user.wallet?.currency ?? ""}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            user?.status === UserStatus.BLOCKED
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }
                        `}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {user?.status === UserStatus.BLOCKED ? (
                        <ConfirmationDialog
                          description="Are you sure you want to unblock this user?"
                          onConfirm={() => handleUnblockUser(user._id)}
                        >
                          <Button
                            aria-label="Unblock user"
                            title="Unblock user"
                            size="sm"
                            className="w-16 text-xs font-semibold bg-green-100 text-green-600 hover:bg-green-300"
                          >
                            Unblock
                          </Button>
                        </ConfirmationDialog>
                      ) : (
                        <ConfirmationDialog
                          description="Are you sure you want to block this user?"
                          onConfirm={() => handleBlockUser(user._id)}
                        >
                          <Button
                            aria-label="Block user"
                            title="Block user"
                            size="sm"
                            className="w-16 text-xs font-semibold bg-red-100 text-red-600 hover:bg-black"
                          >
                            Block
                          </Button>
                        </ConfirmationDialog>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin/user/profile/${user._id}`}>
                        <Button
                          aria-label="View profile"
                          size="sm"
                          title="View profile"
                          className="rounded w-16 bg-blue-500 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                          Profile
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <ConfirmationDialog
                        description={`Are you sure you want to delete user "${user.name}"? This action cannot be undone and will permanently remove all user data.`}
                        onConfirm={() => handleDeleteUser(user._id)}
                      >
                        <Button
                          aria-label="Delete user"
                          title="Delete user"
                          size="sm"
                          variant="destructive"
                          className="w-16 text-xs font-semibold"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </ConfirmationDialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
