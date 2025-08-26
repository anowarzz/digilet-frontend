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
  useApproveAgentMutation,
  usePendingAgentsQuery,
  useRejectAgentMutation,
} from "@/redux/features/admin/admin.api";
import type { IAgent } from "@/types/agent.types";
import { Clock, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PendingAgents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: pendingAgents,
    isLoading,
    refetch,
  } = usePendingAgentsQuery(
    searchTerm.trim().length >= 2 ? { searchTerm: searchTerm.trim() } : {}
  );
  const agents = pendingAgents?.data || [];
  const [approveAgent] = useApproveAgentMutation();
  const [rejectAgent] = useRejectAgentMutation() ;

  // approve agent request
  const handleApproveAgent = async (agentId: string) => {
    const toastId = toast.loading("Approving agent...");
    try {
      const res = await approveAgent(agentId);
      if (res?.data?.success) {
        refetch();
        toast.success("Agent approved successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to approve agent", { id: toastId });
    }
  };

  // reject agent requests
  const handleRejectAgent = async (agentId: string) => {
    const toastId = toast.loading("Rejecting agent...");
    try {
      const res = await rejectAgent(agentId);
      if (res?.data?.success) {
        refetch();
        toast.success("Agent rejected successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to reject agent", { id: toastId });
    }
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        All Pending Agents
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-md">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search pending agents by name, phone, or email (min 2 chars)..."
            onClear={() => setSearchTerm("")}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900 rounded-xl shadow-lg p-12 border border-gray-100 dark:border-gray-800 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Loading pending agents...
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Please wait
          </p>
        </div>
      ) : agents.length === 0 ? (
        <div className="w-full min-h-svh bg-white dark:bg-gray-900 rounded-xl shadow-lg p-12 border border-gray-100 dark:border-gray-800 text-center">
          <Clock className="mx-auto h-16 w-16 text-gray-400 mb-6" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No Pending Agents
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            There are currently no agents waiting for approval.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            New agent registration requests will appear here.
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
                <TableHead className="min-w-[100px] text-center">
                  Action
                </TableHead>
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
                    <div className="flex gap-4 md:gap-8 justify-center items-center">
                      <Button
                        onClick={() => handleApproveAgent(agent._id)}
                        size={"sm"}
                        className="rounded w-16 bg-blue-500 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleRejectAgent(agent._id)}
                        size={"sm"}
                        className="rounded w-16 bg-accent text-red-600 text-xs font-semibold hover:bg-accent-foreground transition-colors"
                      >
                        Reject
                      </Button>
                    </div>
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

export default PendingAgents;
