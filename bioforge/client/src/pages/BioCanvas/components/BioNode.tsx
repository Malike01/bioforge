import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import {
  IconPromoter,
  IconRBS,
  IconCDS,
  IconTerminator,
  IconUnknown,
} from "@/components/icons/BioIcons";
import { CORE_THEME, MODULE_DESIGNER } from "@/constant/appConstants";

// A map showing which icon to use for which SO ID.
const iconMap: Record<string, React.FC<any>> = {
  [MODULE_DESIGNER.PART_TYPES.PROMOTER.ID]: IconPromoter,
  [MODULE_DESIGNER.PART_TYPES.RBS.ID]: IconRBS,
  [MODULE_DESIGNER.PART_TYPES.CDS.ID]: IconCDS,
  [MODULE_DESIGNER.PART_TYPES.TERMINATOR.ID]: IconTerminator,
};

const colorMap: Record<string, string> = {
  [MODULE_DESIGNER.PART_TYPES.PROMOTER.ID]:
    MODULE_DESIGNER.PART_TYPES.PROMOTER.COLOR,
  [MODULE_DESIGNER.PART_TYPES.RBS.ID]: MODULE_DESIGNER.PART_TYPES.RBS.COLOR,
  [MODULE_DESIGNER.PART_TYPES.CDS.ID]: MODULE_DESIGNER.PART_TYPES.CDS.COLOR,
  [MODULE_DESIGNER.PART_TYPES.TERMINATOR.ID]:
    MODULE_DESIGNER.PART_TYPES.TERMINATOR.COLOR,
};

const BioNode = ({ data, selected }: NodeProps) => {
  const IconComponent = iconMap[data.type] || IconUnknown;
  const themeColor = colorMap[data.type] || CORE_THEME.COLORS.BRAND.SECONDARY;

  return (
    <div
      className={`px-4 py-2 shadow-sm rounded-md bg-white border-2 transition-all min-w-[120px]
        ${selected ? "border-indigo-500 shadow-md" : "border-slate-200"}
      `}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-slate-400 hover:bg-indigo-500 transition-colors"
        style={{ border: "2px solid white" }}
      />

      <div className="flex items-center">
        <div className="mr-3 p-1 rounded-sm bg-slate-50 border border-slate-100">
          <IconComponent color={themeColor} size={28} />
        </div>

        <div>
          <div className="text-sm font-bold text-slate-800 truncate max-w-[150px]">
            {data.label}
          </div>
          <div
            className="text-[10px] font-mono uppercase mt-0.5"
            style={{ color: themeColor }}
          >
            {Object.values(MODULE_DESIGNER.PART_TYPES).find(
              (t) => t.ID === data.type,
            )?.LABEL || "Unknown"}
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-slate-400 hover:bg-indigo-500 transition-colors"
        style={{ border: "2px solid white" }}
      />
    </div>
  );
};

export default memo(BioNode);
