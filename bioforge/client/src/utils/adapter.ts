import type { Edge, Node } from "reactflow";

interface ValidationPayload {
  nodes: any[];
  edges: any[];
}

export const prepareDesignForBackend = (
  nodes: Node[],
  edges: Edge[],
): ValidationPayload => {
  return {
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.type || "default", // 'custom' vs.
      data: {
        label: node.data.label,
        type: node.data.type, // SO:0000167
        sequence: node.data.sequence,
      },
      position: node.position,
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    })),
  };
};
