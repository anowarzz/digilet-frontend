import { BoxIcon, PanelsTopLeftIcon } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllActiveAgents from "./ActiveAgents";
import SuspendedAgents from "./SuspendedAgents";

const AllAgents = () => {
  return (
    <Tabs defaultValue="all-agents">
      <ScrollArea>
        <TabsList className="bg-background mt-2 mb-3 w-full h-auto p-0 shadow-xs ">
          <TabsTrigger
            value="all-agents"
            className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
          >
            <PanelsTopLeftIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            All Agents
          </TabsTrigger>
          <TabsTrigger
            value="suspended-agents"
            className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
          >
            <BoxIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Suspended Agents
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TabsContent value="all-agents">
        <AllActiveAgents />
      </TabsContent>
      <TabsContent value="suspended-agents">
        <SuspendedAgents />
      </TabsContent>
    </Tabs>
  );
};

export default AllAgents;
