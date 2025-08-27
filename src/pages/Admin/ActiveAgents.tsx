import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import SearchInput from "@/components/serachInput";
import { TableSkeleton } from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
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
  useActiveAgentsQuery,
  useSuspendAgentMutation,
  useSuspendedAgentsQuery,
} from "@/redux/features/admin/admin.api";
import type { IAgent } from "@/types/agent.types";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const AllActiveAgents = () => {
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

  const {
    data: allAgents,
    isLoading,
    refetch,
  } = useActiveAgentsQuery(apiParams);

  const { refetch: suspendRefetch } = useSuspendedAgentsQuery(undefined);

  const agents = allAgents?.data || [];
  const totalPages = allAgents?.meta?.totalPages || 1;

  const [suspendAgent] = useSuspendAgentMutation();

  // Suspend agent
  const handleSuspendAgent = async (agentId: string) => {
    const toastId = toast.loading("Suspending agent...");

    try {
      const res = await suspendAgent(agentId).unwrap();

      if (res.success) {
        refetch();
        suspendRefetch();
        toast.success("Agent suspended successfully", { id: toastId });
      }
    } catch {
      toast.error("Failed to suspend agent", { id: toastId });
    }
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Active Agents
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-md">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search agents by name, phone, or email (min 2 chars)..."
            onClear={() => setSearchTerm("")}
          />
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton
          rows={5}
          columns={[
            { header: "Name", width: "min-w-[120px]" },
            { header: "Phone", width: "min-w-[120px]" },
            { header: "Wallet Balance", width: "min-w-[140px]" },
            { header: "Agent Status", width: "min-w-[100px]" },
            { header: "Actions", width: "min-w-[100px]" },
            { header: "Details", width: "min-w-[100px]" },
          ]}
        />
      ) : agents.length === 0 ? (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900 rounded-xl shadow-lg p-12 border border-gray-100 dark:border-gray-800 text-center">
          <Users className="mx-auto h-16 w-16 text-gray-400 mb-6" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No Active Agents
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            There are currently no active agents in the system.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Check the pending agents section to approve new agents.
          </p>
        </div>
      ) : (
        <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 sm:p-4 border border-gray-100 dark:border-gray-800 overflow-x-auto">
          <Table className="min-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Name</TableHead>
                <TableHead className="min-w-[120px]">Phone</TableHead>
                <TableHead className="min-w-[140px]">Wallet Balance</TableHead>
                <TableHead className="min-w-[100px]">Agent Status</TableHead>
                <TableHead className="min-w-[100px]">Actions</TableHead>
                <TableHead className="min-w-[100px]">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent: IAgent) => (
                <TableRow key={agent._id}>
                  <TableCell className="font-medium break-words">
                    {agent.name}
                  </TableCell>
                  <TableCell className="break-words">{agent.phone}</TableCell>
                  <TableCell className="break-words">
                    {agent.wallet?.balance ?? 0} {agent.wallet?.currency ?? ""}
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                      {agent.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <ConfirmationDialog
                      description="Are you sure you want to suspend this agent? This action can be reversed later."
                      onConfirm={() => handleSuspendAgent(agent._id)}
                    >
                      <Button variant="destructive" size="sm" className="mr-2">
                        Suspend
                      </Button>
                    </ConfirmationDialog>
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/agent/profile/${agent._id}`}>
                      <Button
                        aria-label="View profile"
                        size="sm"
                        className="px-4 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Profile
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(currentPage + 1)}
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
    </div>
  );
};

export default AllActiveAgents;
