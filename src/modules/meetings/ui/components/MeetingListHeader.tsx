"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import NewMeetingDialog from "./NewMeetingDialog";
import { useState } from "react";

export default function MeetingsListHeader() {
  const [open, setOpen] = useState(false);
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
        <div className="flex items-center gap-x-2 p-1"></div>
      </div>
    </>
  );
}
