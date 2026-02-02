import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CORE_THEME, MODULE_DESIGNER } from "@/constant/appConstants";
import { useValidateDesign } from "@/hooks/useBioQueries";
import { useDesignerStore } from "@/stores/designerStore";
import type { IDesignerToolbarProps } from "@/types/bio";
import { prepareDesignForBackend } from "@/utils/adapter";
import { Play, Activity, Save, Loader2, Maximize } from "lucide-react";
import { toast } from "sonner";

export function DesignerToolbar({ reactFlowInstance }: IDesignerToolbarProps) {
  const { nodes, edges, updateNodeStatus, resetNodeStatus } =
    useDesignerStore();

  const validateMutation = useValidateDesign();

  const isValidating = validateMutation.isPending;

  const handleValidate = () => {
    const payload = prepareDesignForBackend(nodes, edges);

    validateMutation.mutate(payload, {
      onSuccess: (response) => {
        resetNodeStatus();

        if (response.is_valid) {
          updateNodeStatus(true, new Set());
          toast.success(MODULE_DESIGNER.VALIDATION_MSGS.SUCCESS);
          reactFlowInstance.fitView({ duration: 800, padding: 0.2 });

          console.log("Compiled DNA:", response.compiled_sequence);
        } else {
          const errorIds: Set<string> = new Set(
            response.messages.map((m: any) => m.node_id),
          );
          updateNodeStatus(false, errorIds);

          const firstMsg =
            response.messages[0]?.message ||
            MODULE_DESIGNER.VALIDATION_MSGS.ERR_GRAMMAR;
          toast.error("Design Logic Error", { description: firstMsg });

          const firstErrorNodeId = response.messages[0]?.node_id;
          const errorNode = nodes.find((n) => n.id === firstErrorNodeId);

          if (errorNode) {
            reactFlowInstance.setCenter(
              errorNode.position.x + 75,
              errorNode.position.y + 25,
              { zoom: 1.5, duration: 1000 },
            );
          }
        }
      },
    });
  };

  return (
    <Card className="absolute top-4 right-4 p-2 flex gap-2 shadow-lg z-50 bg-white/95 backdrop-blur-sm border-slate-200">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => reactFlowInstance.fitView({ duration: 800 })}
        title="Fit to Screen"
        className="text-slate-500 hover:text-slate-800"
      >
        <Maximize className="w-4 h-4" />
      </Button>

      <div className="w-px bg-slate-200 mx-1" />
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
        onClick={handleValidate}
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
