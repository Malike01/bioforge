export const BioType = {
  PROMOTER: "SO:0000167",
  RBS: "SO:0000139",
  CDS: "SO:0000316",
  TERMINATOR: "SO:0000141",
};

export type BioType = (typeof BioType)[keyof typeof BioType];

export interface BioComponent {
  id: string;
  name: string;
  type: BioType;
  sequence: string; // DNA Sequence
  metadata?: {
    description?: string;
    organism?: string;
  };
}

export interface BioNodeData {
  label: string;
  component: BioComponent;
  isValid: boolean;
}

export type IDesignerToolbarProps = {
  reactFlowInstance: any;
};
