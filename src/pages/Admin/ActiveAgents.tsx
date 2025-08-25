import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActiveAgentsQuery } from "@/redux/features/admin/admin.api";
import type { IAgent } from "@/types/agent.types";

const AllActiveAgents = () => {
  const { data: allAgents, isLoading } = useActiveAgentsQuery(undefined);
  const agents = allAgents?.data || [];

  console.log(agents);

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        All Agents
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
                // Use agent.status for the status column
                let statusColor = "bg-gray-100 text-gray-600";
                if (agent.status === "ACTIVE")
                  statusColor = "bg-green-100 text-green-600";
                else if (agent.status === "BLOCKED")
                  statusColor = "bg-red-100 text-red-600";
                else if (agent.status === "PENDING")
                  statusColor = "bg-yellow-100 text-yellow-600";
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
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
                      >
                        {agent.status}
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

export default AllActiveAgents;
