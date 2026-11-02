"use client";

import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  PlusCircle,
  FolderKanban,
  CalendarCheck2,
  Heart,
  LogOut,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthButtonsProps } from "@/Types";

export function UserDropdown({
  user,
  onSignOut,
}: AuthButtonsProps) {


 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full bg-surface-2/90 hover:bg-surface-3 border border-border-subtle hover:border-brand-orange/40 transition-all duration-200 cursor-pointer shadow-sm group outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/30",
        )}
      >
        <div className="relative">
          <Avatar size="sm" className="ring-1 ring-border-subtle group-hover:ring-brand-orange/50 transition-all">
            <AvatarImage
              referrerPolicy="no-referrer"
              src={user?.image || undefined}
              alt={user?.name || "User Avatar"}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-brand-orange to-brand-amber text-white font-mono text-[10px] font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"} 
            </AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-surface-1" />
        </div>

        <span className="text-xs font-semibold text-text-primary tracking-wide max-w-[90px] truncate">
          {user?.name?.split(" ")[0]}
        </span>

        <ChevronDown className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-transform duration-200 group-data-popup-open:rotate-180 group-data-popup-open:text-brand-orange" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 rounded-2xl bg-surface-1/95 backdrop-blur-2xl border border-border-subtle shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-2 z-50 text-text-primary"
      >
        <div className="p-3 rounded-xl bg-surface-2/70 border border-border-subtle/70 mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
              Signed in as
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-brand-orange/10 border border-brand-orange/20 text-[9px] font-mono text-brand-orange font-bold">
              <Sparkles className="w-2.5 h-2.5" />
              <span>STAGE CREW</span>
            </span>
          </div>
          <div className="font-bold text-sm text-text-primary truncate">
            {user?.name || "Creative Operator"}
          </div>
          <div className="font-mono text-[11px] text-text-secondary truncate mt-0.5">
            {user?.email || "operator@studiospace.io"}
          </div>
        </div>

        <DropdownMenuGroup className="flex flex-col gap-1">
          <DropdownMenuItem
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-brand-orange hover:bg-brand-orange/10 focus:bg-brand-orange/10 hover:text-brand-amber focus:text-brand-amber transition-all cursor-pointer group"
          >
            <Link href="/add-studio" className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <PlusCircle className="w-4 h-4 text-brand-orange group-hover:text-brand-amber transition-colors" />
                <span>Add New Studio</span>
              </div>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-brand-orange/15 text-brand-orange uppercase font-bold">
                HOST
              </span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-text-primary hover:bg-surface-2 focus:bg-surface-2 transition-all cursor-pointer"
          >
            <Link href="/my-listings" className="flex items-center gap-2.5 w-full">
              <FolderKanban className="w-4 h-4 text-text-muted" />
              <span>My Studio Listings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-text-primary hover:bg-surface-2 focus:bg-surface-2 transition-all cursor-pointer"
          >
            <Link href="/my-bookings" className="flex items-center gap-2.5 w-full">
              <CalendarCheck2 className="w-4 h-4 text-text-muted" />
              <span>My Bookings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-text-primary hover:bg-surface-2 focus:bg-surface-2 transition-all cursor-pointer"
          >
            <Link href="/wishlist" className="flex items-center gap-2.5 w-full">
              <Heart className="w-4 h-4 text-text-muted" />
              <span>Saved Wishlist</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1.5 bg-border-subtle" />

        <DropdownMenuItem
          variant="destructive"
          onClick={onSignOut}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 focus:text-rose-300 hover:bg-rose-500/10 focus:bg-rose-500/10 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
