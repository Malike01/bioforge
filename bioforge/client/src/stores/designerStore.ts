import { create } from "zustand";
import {
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  addEdge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

import { INITIAL_NODES, INITIAL_EDGES } from "@/data/initialDesign";
import { CORE_THEME } from "@/constant/appConstants";

type DesignerState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  updateNodeStatus: (isValid: boolean, errorNodeIds: Set<string>) => void;
  resetNodeStatus: () => void;
};

export const useDesignerStore = create<DesignerState>((set, get) => ({
  nodes: INITIAL_NODES,
  edges: INITIAL_EDGES,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  setNodes: (nodes) => set({ nodes }),

  updateNodeStatus: (isValid, errorNodeIds) => {
    set({
      nodes: get().nodes.map((node) => {
        if (errorNodeIds.has(node.id)) {
          return {
            ...node,
            style: {
              border: `2px solid ${CORE_THEME.COLORS.STATUS.ERROR}`,
              boxShadow: `0 0 15px ${CORE_THEME.COLORS.STATUS.ERROR}40`,
              transition: "all 0.3s ease",
            },
          };
        }
        if (isValid) {
          return {
            ...node,
            style: {
              border: `2px solid ${CORE_THEME.COLORS.STATUS.SUCCESS}`,
              transition: "all 0.3s ease",
            },
          };
        }
        return node;
      }),
    });
  },

  resetNodeStatus: () => {
    set({
      nodes: get().nodes.map((n) => ({
        ...n,
        style: { border: "1px solid #777", boxShadow: "none" },
      })),
    });
  },
}));
