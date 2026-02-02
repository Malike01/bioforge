import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { useDesignerStore } from "@/stores/designerStore";
import BioNode from "./BioNode";
import { useMemo } from "react";

export default function BioCanvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useDesignerStore();

  const nodeTypes = useMemo(
    () => ({
      bioPart: BioNode,
    }),
    [],
  );

  return (
    <div className="w-full h-screen bg-slate-50 relative">
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
    </div>
  );
}
