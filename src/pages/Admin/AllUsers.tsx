import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllUsersQuery } from "@/redux/features/admin/admin.api";
import type { IUser } from "@/types/user.types";

const AllUsers = () => {
  const { data: allUsers, isLoading } = useAllUsersQuery(undefined);
  const users = allUsers?.data || [];


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
              <TableHead className="min-w-[100px]">Action</TableHead>
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
                const walletStatus = user.wallet?.isBlocked
                  ? "Blocked"
                  : "Active";
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
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          walletStatus === "Blocked"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {walletStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button className="px-4 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors">
                        Details
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
