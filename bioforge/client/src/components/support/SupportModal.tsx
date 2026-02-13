import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LifeBuoy, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { useUIStore } from "@/store/uiStore";
import { APP_CONTENT } from "@/constant/appConstants";
import { useState } from "react";
import { apiClient } from "@api/api";

const INITIAL_DATA = {
  subject: "",
  category: "general",
  message: "",
};

export function SupportModal() {
  const TEXTS = APP_CONTENT.support;

  const { isSupportOpen, closeSupport } = useUIStore();

  // Form State
  const [formData, setFormData] = useState(INITIAL_DATA);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      return apiClient.post("/support/", data);
    },
    onSuccess: () => {
      toast.success(TEXTS.TOAST_SUCCESS, { description: TEXTS.TOAST_DESC });
      closeSupport();
      setFormData(INITIAL_DATA);
    },
    onError: () => toast.error("Failed to send ticket"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <Dialog
      open={isSupportOpen}
      onOpenChange={(open) => !open && closeSupport()}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LifeBuoy className="h-5 w-5 text-indigo-600" />
            {TEXTS.MODAL_TITLE}
          </DialogTitle>
          <DialogDescription>{TEXTS.MODAL_DESC}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>{TEXTS.LABEL_SUBJECT}</Label>
            <Input
              value={formData.subject}
              onChange={handleChange}
              name="subject"
              placeholder={TEXTS.PLACEHOLDER_SUBJECT}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>{TEXTS.LABEL_CATEGORY}</Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEXTS.categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{TEXTS.LABEL_MESSAGE}</Label>
            <Textarea
              value={formData.message}
              onChange={handleChange}
              name="message"
              placeholder={TEXTS.PLACEHOLDER_MESSAGE}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={closeSupport}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  {TEXTS.BTN_SUBMITTING}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> {TEXTS.BTN_SUBMIT}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
