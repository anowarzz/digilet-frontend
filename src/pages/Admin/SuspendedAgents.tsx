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
import {
  useActiveAgentsQuery,
  useApproveAgentMutation,
  useSuspendedAgentsQuery,
} from "@/redux/features/admin/admin.api";
import type { IAgent } from "@/types/agent.types";
import { Loader2, UserX } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const SuspendedAgents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: suspendedAgents,
    isLoading,
    refetch: suspendRefetch,
  } = useSuspendedAgentsQuery(
    searchTerm.trim().length >= 2 ? { searchTerm: searchTerm.trim() } : {}
  );

  const { refetch: allAgentsRefetch } = useActiveAgentsQuery(undefined);

  const agents = suspendedAgents?.data || [];

  const [approveAgent] = useApproveAgentMutation();

  // Handle Agent Approve
  const handleApproveAgent = async (agentId: string) => {
    const toastId = toast.loading("Approving agent...");

    try {
      const res = await approveAgent(agentId).unwrap();

      if (res?.data?.success) {
        suspendRefetch();
        allAgentsRefetch();
        console.log(res);
        toast.success("Agent approved successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to approve agent", { id: toastId });
    }
  };

  console.log(agents);

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        All Suspended Agents
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-md">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search suspended agents by name, phone, or email (min 2 chars)..."
            onClear={() => setSearchTerm("")}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-12 border border-gray-100 dark:border-gray-800 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Loading suspended agents...
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Please wait while we fetch the data
          </p>
        </div>
      ) : agents.length === 0 ? (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900 rounded-xl shadow-lg p-12 border border-gray-100 dark:border-gray-800 text-center">
          <UserX className="mx-auto h-16 w-16 text-gray-400 mb-6" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No Suspended Agents
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            There are currently no suspended agents in the system.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            All agents are currently active or pending approval.
          </p>
        </div>
      ) : (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 sm:p-4 border border-gray-100 dark:border-gray-800 overflow-x-auto">
          <Table className="min-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Name</TableHead>
                <TableHead className="min-w-[120px]">Phone</TableHead>
                <TableHead className="min-w-[140px]">Wallet Balance</TableHead>
                <TableHead className="min-w-[140px]">Status</TableHead>
                <TableHead className="min-w-[100px] text-center">
                  Action
                </TableHead>
                <TableHead className="min-w-[100px]">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent: IAgent) => (
                <TableRow key={agent._id}>
                  <TableCell className="break-words">{agent.name}</TableCell>
                  <TableCell className="break-words">{agent.phone}</TableCell>
                  <TableCell className="break-words">
                    {agent.wallet?.balance ?? 0} {agent.wallet?.currency ?? ""}
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                      {agent.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4 md:gap-8 justify-center items-center">
                      <ConfirmationDialog
                        description={`Are you sure you want to approve agent "${agent.name}"? This action will activate their account and allow them to perform transactions.`}
                        onConfirm={() => handleApproveAgent(agent._id)}
                      >
                        <Button
                          size={"sm"}
                          className="rounded w-16 bg-blue-500 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Approve
                        </Button>
                      </ConfirmationDialog>
                    </div>
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
    </div>
  );
};

export default SuspendedAgents;
