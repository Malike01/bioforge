import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { columns, type User } from "./columns"; // Sütun tanımı
import { InviteModal } from "@/components/invite/InviteModal";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { APP_CONTENT } from "@/constant/appConstants";
import { apiClient } from "@api/api";

export default function UsersPage() {
  const queryClient = useQueryClient();
  const TEXTS = APP_CONTENT.admin.users;

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await apiClient.get("/users/");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/users/${id}`);
    },
    onSuccess: () => {
      toast.success(TEXTS.TOAST_DELETE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast.error(error.message || TEXTS.TOAST_DELETE_ERROR);
    },
  });

  const handleDelete = (id: number) => {
    if (confirm(TEXTS.CONFIRM_DELETE)) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500 font-medium">{TEXTS.ERROR_LOAD}</div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {TEXTS.PAGE_TITLE}
          </h1>
          <p className="text-slate-500 mt-1">{TEXTS.PAGE_SUBTITLE}</p>
        </div>

        <InviteModal />
      </div>

      <DataTable columns={columns(handleDelete)} data={users || []} />
    </div>
  );
}
