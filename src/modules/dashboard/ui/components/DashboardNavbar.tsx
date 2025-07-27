"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
  PanelLeftCloseIcon,
  PanelRight,
  PanelRightClose,
  SearchIcon,
} from "lucide-react";
import DashboardCommand from "./_DashboardCommand";
import { useEffect, useState } from "react";

export default function DashboardNavbar() {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const pressDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((op) => !op);
      }
    };
    document.addEventListener("keydown", pressDown);
    return () => document.removeEventListener("keydown", pressDown);
  }, []);

  return (
    <>
      <DashboardCommand open={open} setOpen={setOpen} />
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelRight className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button
          className="h-9 w-58 justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          variant="outline"
          size="sm"
          onClick={() => setOpen((op) => !op)}
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground ">
            <span className="text-sm">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
}
