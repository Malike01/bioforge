import { ReactFlowProvider, useReactFlow } from "reactflow";
import BioCanvas from "./components/BioCanvas";
import { DesignerToolbar } from "./components/DesignerToolbar";

export default function BioCADPage() {
  const reactFlowInstance = useReactFlow();

  return (
    <ReactFlowProvider>
      <DesignerToolbar reactFlowInstance={reactFlowInstance} />
      <BioCanvas />
    </ReactFlowProvider>
  );
}
