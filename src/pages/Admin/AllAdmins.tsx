import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import SearchInput from "@/components/serachInput";
import { TableSkeleton } from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAllAdminsQuery,
  useDeleteAdminMutation,
} from "@/redux/features/admin/admin.api";
import type { IUser } from "@/types/user.types";
import { Shield, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AllAdmins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const apiParams = {
    page: currentPage,
    limit: 10,
    ...(searchTerm.trim().length >= 2 && { searchTerm: searchTerm.trim() }),
  };

  const { data: allAdmins, isLoading } = useAllAdminsQuery(apiParams);
  const admins = allAdmins?.data || [];
  const totalPages = allAdmins?.meta?.totalPages || 1;

  const [deleteAdmin] = useDeleteAdminMutation();

  // Handle deleting an admin
  const handleDeleteAdmin = async (adminId: string) => {
    const toastId = toast.loading("Deleting admin...");

    try {
      const res = await deleteAdmin(adminId).unwrap();

      if (res.success) {
        toast.success("Admin deleted successfully", { id: toastId });
      }
    } catch {
      toast.error("Failed to delete admin", { id: toastId });
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen py-8 px-4">
      <div className="w-full max-w-7xl mx-auto">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-3 pb-6">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                All Administrators
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Manage all admin accounts in the system
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            {/* Search Bar */}
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-md">
                <SearchInput
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search admins by name, phone, or email (min 2 chars)..."
                  onClear={() => setSearchTerm("")}
                />
              </div>
            </div>

            {isLoading ? (
              <TableSkeleton
                rows={5}
                columns={[
                  { header: "Name", width: "min-w-[120px]" },
                  { header: "Phone", width: "min-w-[140px]" },
                  { header: "Created", width: "min-w-[120px]" },
                  { header: "Delete", width: "min-w-[100px]" },
                ]}
              />
            ) : admins.length === 0 ? (
              <div className="w-full min-h-[400px] bg-white/50 rounded-xl shadow-inner p-12 border border-gray-100 text-center">
                <Shield className="mx-auto h-16 w-16 text-gray-400 mb-6" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Admins Found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm
                    ? "No admins match your search criteria."
                    : "There are currently no admins registered in the system."}
                </p>
                <p className="text-sm text-gray-500">
                  {searchTerm
                    ? "Try adjusting your search terms."
                    : "Create a new admin to get started."}
                </p>
              </div>
            ) : (
              <>
                <div className="w-full bg-white/50 rounded-xl shadow-inner p-2 sm:p-4 border border-gray-100 overflow-x-auto">
                  <Table className="min-w-[500px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[120px]">Name</TableHead>
                        <TableHead className="min-w-[140px]">Phone</TableHead>
                        <TableHead className="min-w-[120px]">Created</TableHead>
                        <TableHead className="min-w-[100px]">Delete</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {admins.map((admin: IUser) => {
                        return (
                          <TableRow key={admin._id}>
                            <TableCell className="font-medium break-words">
                              {admin.name}
                            </TableCell>
                            <TableCell className="break-words">
                              {admin.phone}
                            </TableCell>
                            <TableCell className="break-words">
                              {new Date(admin.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <ConfirmationDialog
                                description={`Are you sure you want to delete admin "${admin.name}"? This action cannot be undone and will permanently remove all admin data.`}
                                onConfirm={() => handleDeleteAdmin(admin._id)}
                              >
                                <Button
                                  aria-label="Delete admin"
                                  title="Delete admin"
                                  size="sm"
                                  variant="destructive"
                                  className="w-16 text-xs font-semibold"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </ConfirmationDialog>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setCurrentPage(Math.max(1, currentPage - 1))
                            }
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>

                        {/* Page Numbers */}
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setCurrentPage(
                                Math.min(totalPages, currentPage + 1)
                              )
                            }
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllAdmins;
