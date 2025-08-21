"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import NewMeetingDialog from "./NewMeetingDialog";
import { useState } from "react";
import SearchFilterMeeting from "./SearchFilterMeeting";
import StatusFilter from "./StatusFilter";
import AgentIdFilter from "./AgentIdFilter";
import { useMeetingsFilters } from "../../hooks/useMeetingsFilters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";

export default function MeetingsListHeader() {
  const [filters, setFilters] = useMeetingsFilters();
  const [open, setOpen] = useState(false);

  const isAnyFilterModified =
    !!filters.status || !!filters.search || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewMeetingDialog open={open} onOpenChange={setOpen} />
      <div className="p-4 md:px-8 flex flex-col gap-y-4 ">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl ">My Meetings</h5>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon /> Create New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <SearchFilterMeeting />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button variant="outline" onClick={onClearFilters}>
                <XCircleIcon className="size-4" />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
