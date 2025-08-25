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
import { toast } from "sonner";

const SuspendedAgents = () => {
  const {
    data: suspendedAgents,
    isLoading,
    refetch: suspendRefetch,
  } = useSuspendedAgentsQuery(undefined);

  const { refetch: allAgentsRefetch } = useActiveAgentsQuery(undefined);

  const agents = suspendedAgents?.data || [];

  const [approveAgent] = useApproveAgentMutation();

  // Handle Agent Approve
  const handleApproveAgent = async (agentId: string) => {
    const toastId = toast.loading("Approving agent...");

    try {
      const res = await approveAgent(agentId);

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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : agents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No suspended agents found
                </TableCell>
              </TableRow>
            ) : (
              agents?.map((agent: IAgent) => (
                <TableRow key={agent._id}>
                  <TableCell className="font-medium break-words">
                    {agent.name}
                  </TableCell>
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
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SuspendedAgents;
