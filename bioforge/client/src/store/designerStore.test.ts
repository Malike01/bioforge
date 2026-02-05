import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useDesignerStore } from "./designerStore";
import { CORE_THEME } from "@/constant/appConstants";

describe("Designer Store (Integration)", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useDesignerStore());
    act(() => {
      result.current.setNodes([]);
    });
  });

  it("updates node styles on validation error", () => {
    const { result } = renderHook(() => useDesignerStore());

    const mockNode = {
      id: "1",
      data: {},
      position: { x: 0, y: 0 },
      type: "bioPart",
    };
    act(() => {
      result.current.setNodes([mockNode]);
    });

    act(() => {
      result.current.updateNodeStatus(false, new Set(["1"]));
    });

    const updatedNode = result.current.nodes[0];
    expect(updatedNode.style?.border).toContain(CORE_THEME.COLORS.STATUS.ERROR);
  });
});
