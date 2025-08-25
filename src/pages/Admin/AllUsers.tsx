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
  useUnblockUserMutation,
} from "@/redux/features/admin/admin.api";
import type { IUser } from "@/types/user.types";
import { toast } from "sonner";

const AllUsers = () => {
  const { data: allUsers, isLoading } = useAllUsersQuery(undefined);
  const users = allUsers?.data || [];

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  // Handle blocking a user
  const handleBlockUser = async (userId: string) => {
    const toastId = toast.loading("Blocking user...");

    try {
      const res = await blockUser(userId);

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
      const res = await unblockUser(userId);
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
      <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 sm:p-4 border border-gray-100 dark:border-gray-800 overflow-x-auto">
        <Table className="min-w-[500px]">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[120px]">Name</TableHead>
              <TableHead className="min-w-[120px]">Phone</TableHead>
              <TableHead className="min-w-[140px]">Wallet Balance</TableHead>
              <TableHead className="min-w-[100px]">Status</TableHead>
              <TableHead className="min-w-[100px]">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user: IUser) => {
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
                      {user?.status === UserStatus.BLOCKED ? (
                        <Button
                          aria-label="Unblock user"
                          title="Unblock user"
                          size="sm"
                          className="w-16 text-xs font-semibold   bg-red-100 text-red-600 hover:bg-black"
                          onClick={() => handleUnblockUser(user._id)}
                        >
                          {user.status}
                        </Button>
                      ) : (
                        <Button
                          aria-label="Block user"
                          title="Block user"
                          size="sm"
                          className="w-16 text-xs font-semibold bg-green-100 text-green-600 hover:bg-green-300 transition-colors"
                          onClick={() => handleBlockUser(user._id)}
                        >
                          {user.status}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        aria-label="View profile"
                        title="View profile"
                        size={"sm"}
                        className="rounded w-16 bg-blue-500 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllUsers;
