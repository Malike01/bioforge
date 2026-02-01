import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CORE_THEME, MODULE_DESIGNER } from "@/constant/appConstants";
import { Play, Activity, Save, Loader2 } from "lucide-react";

interface DesignerToolbarProps {
  onValidate: () => void;
  isValidating: boolean;
}

export function DesignerToolbar({
  onValidate,
  isValidating,
}: DesignerToolbarProps) {
  return (
    <Card className="absolute top-4 right-4 p-2 flex gap-2 shadow-lg z-50 bg-white/95 backdrop-blur-sm border-slate-200">
      <Button
        variant="outline"
        size="sm"
        onClick={() => console.log("Save Draft")}
        className="text-slate-600"
      >
        <Save className="w-4 h-4 mr-2" />
        Save
      </Button>

      <Button
        size="sm"
        onClick={onValidate}
        disabled={isValidating}
        style={{
          backgroundColor: CORE_THEME.COLORS.BRAND.PRIMARY,
          color: "white",
        }}
        className="hover:opacity-90 transition-opacity"
      >
        {isValidating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {MODULE_DESIGNER.VALIDATION_MSGS.BTN_CHECKING}
          </>
        ) : (
          <>
            <Activity className="w-4 h-4 mr-2" />
            {MODULE_DESIGNER.VALIDATION_MSGS.BTN_VALIDATE}
          </>
        )}
      </Button>

      <Button
        variant="secondary"
        size="sm"
        disabled={true} // Phase 2'de açılacak
        className="bg-slate-100 text-slate-400"
      >
        <Play className="w-4 h-4 mr-2" />
        Simulate
      </Button>
    </Card>
  );
}
