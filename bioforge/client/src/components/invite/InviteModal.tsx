import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@api/api";
import { APP_CONTENT } from "@/constant/appConstants";

export function InviteModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const CONTENT = APP_CONTENT.invite;

  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) => {
      return apiClient.post("/invite/", { email });
    },
    onSuccess: () => {
      toast.success(CONTENT.TOAST_SUCCESS_TITLE, {
        description: `${CONTENT.TOAST_SUCCESS_DESC} ${email}`,
      });
      setOpen(false);
      setEmail("");
    },
    onError: () => {
      toast.error(CONTENT.TOAST_ERROR);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) mutate(email);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <UserPlus size={16} />
          {CONTENT.TRIGGER_BTN}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{CONTENT.MODAL_TITLE}</DialogTitle>
          <DialogDescription>{CONTENT.MODAL_DESC}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">{CONTENT.LABEL_EMAIL}</Label>
            <Input
              id="email"
              placeholder={CONTENT.PLACEHOLDER_EMAIL}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              {CONTENT.BTN_CANCEL}
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  {CONTENT.BTN_SENDING}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> {CONTENT.BTN_SEND}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
