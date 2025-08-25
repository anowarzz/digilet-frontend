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
  useSuspendAgentMutation,
} from "@/redux/features/admin/admin.api";
import type { IAgent } from "@/types/agent.types";
import { toast } from "sonner";

const AllActiveAgents = () => {
  const { data: allAgents, isLoading } = useActiveAgentsQuery(undefined);
  const agents = allAgents?.data || [];

  const [suspendAgent] = useSuspendAgentMutation();

  // Suspend agent
  const handleSuspendAgent = async (agentId: string) => {
    const toastId = toast.loading("Suspending agent...");

    try {
      const res = await suspendAgent(agentId);

      if (res?.data?.success) {
        console.log(res);
        toast.success("Agent suspended successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to suspend agent", { id: toastId });
    }
  };

  console.log(agents);

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Active Agents
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
            ) : agents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No active agents found
                </TableCell>
              </TableRow>
            ) : (
              agents.map((agent: IAgent) => {
                return (
                  <TableRow key={agent._id}>
                    <TableCell className="font-medium break-words">
                      {agent.name}
                    </TableCell>
                    <TableCell className="break-words">{agent.phone}</TableCell>
                    <TableCell className="break-words">
                      {agent.wallet?.balance ?? 0}{" "}
                      {agent.wallet?.currency ?? ""}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleSuspendAgent(agent._id)}
                        aria-label="Suspend Agent"
                        title="Suspend Agent"
                        size="sm"
                        className="w-16 text-xs font-semibold bg-green-100 text-green-600 hover:bg-green-300 transition-colors"
                      >
                        {agent.status}
                      </Button>
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

export default AllActiveAgents;
