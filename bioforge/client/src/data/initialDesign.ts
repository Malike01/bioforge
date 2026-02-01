import { MODULE_DESIGNER } from "@/constant/appConstants";
import type { Edge, Node } from "reactflow";

export const INITIAL_NODES: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 150 },
    data: {
      label: "T7 Promoter",
      type: MODULE_DESIGNER.PART_TYPES.PROMOTER.ID, // SO:0000167
      sequence: "TAATACGACTCACTATAG",
    },
    type: "bioPart",
  },
  {
    id: "2",
    position: { x: 350, y: 150 },
    data: {
      label: "RBS (B0034)",
      type: MODULE_DESIGNER.PART_TYPES.RBS.ID, // SO:0000139
      sequence: "AAAGAGGAGAA",
    },
    type: "bioPart",
  },
];

export const INITIAL_EDGES: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
];
