import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ReactFlowProvider } from "reactflow";
import BioNode from "./BioNode";
import { MODULE_DESIGNER } from "@/constant/appConstants";

const renderNode = (props: any) => {
  return render(
    <ReactFlowProvider>
      <BioNode {...props} />
    </ReactFlowProvider>,
  );
};

describe("BioNode Component", () => {
  it("renders correct label for Promoter", () => {
    const props = {
      id: "1",
      data: {
        label: "T7 Promoter",
        type: MODULE_DESIGNER.PART_TYPES.PROMOTER.ID,
      },
      selected: false,
      isConnectable: true,
      xPos: 0,
      yPos: 0,
      type: "bioPart",
      dragging: false,
      zIndex: 0,
    } as any;

    renderNode(props);
    expect(screen.getByText("T7 Promoter")).toBeInTheDocument();
    expect(screen.getByText("Promoter")).toBeInTheDocument();
  });

  it("shows selected style when selected is true", () => {
    const props = {
      id: "2",
      data: { label: "RBS", type: "default" },
      selected: true,
    } as any;

    const { container } = renderNode(props);
    const nodeWrapper = container.firstChild;
    expect(nodeWrapper).toHaveClass("border-indigo-500");
  });
});
