import { GeneratedAvatar } from "@/components/generated/generatedAvatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { ChevronDown, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardUserButton() {
  const { data, isPending } = authClient.useSession();
  const isMobile = useIsMobile();
  const router = useRouter();
  //todo
  const onLogOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-sidebar-accent hover:bg-sidebar-accent/90 overflow-hidden">
          {data.user.image ? (
            <Avatar className="size-9 mr-3">
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data.user.name}
              variant="initials"
              className="size-9 mr-3"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full">{data.user.name}</p>
            <p className="text-xs truncate w-full">{data.user.email}</p>
          </div>
          <ChevronDown className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline" onClick={() => {}}>
              <CreditCardIcon className="size-4 text-accent" /> Billing
            </Button>
            <Button variant="outline" onClick={onLogOut}>
              <LogOutIcon className="size-4 text-accent" /> Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-sidebar-accent hover:bg-sidebar-accent/90 overflow-hidden">
        {data.user.image ? (
          <Avatar className="size-9 mr-3">
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data.user.name}</p>
          <p className="text-xs truncate w-full">{data.user.email}</p>
        </div>
        <ChevronDown className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing <CreditCardIcon className="size-4"> </CreditCardIcon>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogOut}
          className="cursor-pointer flex items-center justify-between"
        >
          Logout <LogOutIcon className="size-4"> </LogOutIcon>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
