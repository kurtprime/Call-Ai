"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import NewAgentDialog from "./NewAgentDialog";
import { useState } from "react";

export default function ListHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NewAgentDialog open={open} onOpenChange={setOpen} />
      <div className="p-4 md:px-8 flex flex-col gap-y-4 ">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl ">My Agents</h5>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon /> Create New Agent
          </Button>
        </div>
      </div>
    </>
  );
}
