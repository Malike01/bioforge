import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { APP_CONTENT } from "@/constant/appConstants";

export type User = {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  is_superuser: boolean;
};

const TEXTS = APP_CONTENT.admin.table;

export const columns = (onDelete: (id: number) => void): ColumnDef<User>[] => [
  {
    accessorKey: "full_name",
    header: TEXTS.HEADER_USER,
    cell: ({ row }) => {
      const name = row.original.full_name || TEXTS.FALLBACK_NAME;
      const email = row.original.email;
      const initials = name.slice(0, 2).toUpperCase();

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-indigo-50 text-indigo-600 font-medium border border-indigo-100">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-slate-900">{name}</span>
            <span className="text-xs text-slate-500">{email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "is_superuser",
    header: TEXTS.HEADER_ROLE,
    cell: ({ row }) => {
      const isAdmin = row.original.is_superuser;
      return isAdmin ? (
        <Badge
          variant="default"
          className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200 shadow-none"
        >
          <ShieldAlert className="w-3 h-3 mr-1" /> {TEXTS.ROLE_ADMIN}
        </Badge>
      ) : (
        <Badge variant="outline" className="text-slate-600 bg-slate-50">
          {TEXTS.ROLE_USER}
        </Badge>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: TEXTS.HEADER_STATUS,
    cell: ({ row }) => {
      const isActive = row.original.is_active;
      return isActive ? (
        <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          {TEXTS.STATUS_ACTIVE}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          {TEXTS.STATUS_INACTIVE}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-slate-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel className="text-xs text-slate-400 font-normal uppercase tracking-wider">
              {TEXTS.LABEL_ACTIONS}
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer font-medium"
              onClick={() => onDelete(user.id)}
            >
              <Trash className="mr-2 h-4 w-4" /> {TEXTS.ACTION_DELETE}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
