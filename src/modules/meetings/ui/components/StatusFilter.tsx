import React from "react";
import { MeetingStatus } from "../../types";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUp,
  LoaderIcon,
  VideoIcon,
} from "lucide-react";
import { useMeetingsFilters } from "../../hooks/useMeetingsFilters";
import CommandSelect from "@/components/CommandSelect";

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize ">
        <ClockArrowUp />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize ">
        <CircleCheckIcon />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize ">
        <VideoIcon />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2  capitalize ">
        <LoaderIcon className="animate-spin" />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize ">
        <CircleXIcon />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
];

export default function StatusFilter() {
  const [filter, setFilter] = useMeetingsFilters();

  return (
    <CommandSelect
      placeholder="Status"
      className="h-9"
      options={options}
      onSelect={(value) => setFilter({ status: value as MeetingStatus })}
      value={filter.status ?? ""}
    />
  );
}
