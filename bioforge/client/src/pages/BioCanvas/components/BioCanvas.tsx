import { useValidateDesign } from "@/hooks/useBioQueries";
import { prepareDesignForBackend } from "@/utils/adapter";
import ReactFlow, { Controls, Background, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { DesignerToolbar } from "./DesignerToolbar";
import { toast } from "sonner";
import { MODULE_DESIGNER } from "@/constant/appConstants";
import { useDesignerStore } from "@/stores/designerStore";
import BioNode from "./BioNode";
import { useMemo } from "react";

export default function BioCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodeStatus,
    resetNodeStatus,
  } = useDesignerStore();

  const validateMutation = useValidateDesign();

  const nodeTypes = useMemo(
    () => ({
      bioPart: BioNode,
    }),
    [],
  );

  const handleValidate = () => {
    const payload = prepareDesignForBackend(nodes, edges);

    validateMutation.mutate(payload, {
      onSuccess: (response) => {
        resetNodeStatus();

        if (response.is_valid) {
          updateNodeStatus(true, new Set());
          toast.success(MODULE_DESIGNER.VALIDATION_MSGS.SUCCESS, {
            description: "Sequence compiled successfully.",
          });
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
        }
      },
    });
  };

  return (
    <div className="w-full h-screen bg-slate-50 relative">
      <ReactFlowProvider>
        <DesignerToolbar
          onValidate={handleValidate}
          isValidating={validateMutation.isPending}
        />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="bottom-left"
        >
          <Background color="#cbd5e1" gap={20} size={1} />
          <Controls className="bg-white border-slate-200 shadow-sm" />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
