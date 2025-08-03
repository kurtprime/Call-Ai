"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import NewAgentDialog from "./NewAgentDialog";
import { useState } from "react";
import { useAgentFilters } from "../../hooks/useAgentFilters";
import SearchFilterAgent from "./SearchFilterAgent";
import { DEFAULT_PAGE } from "@/constants";

export default function ListHeader() {
  const [filters, setFilters] = useAgentFilters();
  const [open, setOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

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
        <div className="flex items-center gap-x-2 p-1">
          <SearchFilterAgent />
          {isAnyFilterModified && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <XCircleIcon className="size-4" /> Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
