import { renderHook } from "@testing-library/react-hooks";
import TestRenderer from "react-test-renderer";
import { useConfirmationDialog } from "./confirmation-dialog.hook";

const { act } = TestRenderer;

function retrieveUseDialog({
  opened = false,
  itemToDelete = { id: "", name: "" }
} = {}) {
  const { result } = renderHook(() => useConfirmationDialog());

  if (opened) {
    act(() => result.current.onOpenDialog(itemToDelete));
  }

  return result;
}

describe("useConfirmationDialog", () => {
  it("should retrieve an object with a falsy open state", () => {
    const { result } = renderHook(() => useConfirmationDialog());

    expect(result.current.isOpen).toBe(false);
  });

  it("should retrieve an object with an empty lookup state", () => {
    const { result } = renderHook(() => useConfirmationDialog());

    expect(result.current.itemToDelete).toEqual({ id: "", name: "" });
  });

  it("should retrieve an object with onAccept, onClose and onOpenDialog functions", () => {
    const { result } = renderHook(() => useConfirmationDialog());

    expect(result.current.onAccept).toBeInstanceOf(Function);
    expect(result.current.onClose).toBeInstanceOf(Function);
    expect(result.current.onOpenDialog).toBeInstanceOf(Function);
  });

  describe("onAccept", () => {
    it("should clear its item to delete state", () => {
      const itemToDelete = { id: "irrelevantId", name: "irrelevantName" };
      const result = retrieveUseDialog({ itemToDelete });

      act(() => result.current.onAccept());

      expect(result.current.itemToDelete).toEqual({ id: "", name: "" });
    });
  });

  describe("onClose", () => {
    it("should set its open state to falsy", () => {
      const result = retrieveUseDialog({ opened: true });

      act(() => result.current.onClose());

      expect(result.current.isOpen).toBe(false);
    });
  });

  describe("onOpenDialog", () => {
    it("should set its open state to truthy", () => {
      const result = retrieveUseDialog({ opened: true });

      expect(result.current.isOpen).toBe(true);
    });

    it("should set its itemToDelete state to the given one", () => {
      const itemToDelete = { id: "irrelevantId", name: "irrelevantName" };
      const result = retrieveUseDialog({ opened: true, itemToDelete });

      expect(result.current.itemToDelete).toEqual(itemToDelete);
    });
  });
});
