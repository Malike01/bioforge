import { Button } from "@/components/ui/button";
import { MessageCircleQuestion } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { APP_CONTENT } from "@/constant/appConstants";

export function SupportFab() {
  const openSupport = useUIStore((state) => state.openSupport);
  const TEXTS = APP_CONTENT.support;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={openSupport}
              size="icon"
              className="h-14 w-14 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-xl transition-all hover:scale-110 active:scale-95"
            >
              <MessageCircleQuestion className="h-7 w-7 text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{TEXTS.TRIGGER_BTN}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
