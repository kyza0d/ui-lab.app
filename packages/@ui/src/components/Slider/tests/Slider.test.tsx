import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Slider } from "../Slider";

function mockElementRect(
  element: Element,
  rect: Pick<DOMRect, "left" | "top" | "width" | "height">
) {
  const { left, top, width, height } = rect;

  vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
    x: left,
    y: top,
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    toJSON: () => ({}),
  } as DOMRect);
}

describe("Slider", () => {
  it("updates from pointer down on styled track descendants and keeps dragging from the root", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <Slider aria-label="Volume" defaultValue={0} onValueChange={onValueChange} />
    );

    const root = container.querySelector(".slider") as HTMLElement;
    const track = container.querySelector(".track") as HTMLElement;
    const range = container.querySelector(".range") as HTMLElement;

    mockElementRect(track, { left: 0, top: 0, width: 200, height: 20 });

    fireEvent.pointerDown(range, {
      pointerId: 1,
      isPrimary: true,
      button: 0,
      clientX: 50,
      clientY: 10,
    });
    fireEvent.pointerMove(root, {
      pointerId: 1,
      clientX: 160,
      clientY: 10,
    });
    fireEvent.pointerUp(root, { pointerId: 1 });

    expect(onValueChange).toHaveBeenNthCalledWith(1, [25]);
    expect(onValueChange).toHaveBeenLastCalledWith([80]);
    expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute(
      "aria-valuenow",
      "80"
    );
  });

  it("uses the whole root surface as the pointer hit target and focuses the active thumb", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <Slider aria-label="Volume" defaultValue={0} onValueChange={onValueChange} />
    );

    const root = container.querySelector(".slider") as HTMLElement;
    const track = container.querySelector(".track") as HTMLElement;
    const thumb = screen.getByRole("slider", { name: "Volume" });

    mockElementRect(track, { left: 20, top: 0, width: 200, height: 20 });

    fireEvent.pointerDown(root, {
      pointerId: 1,
      isPrimary: true,
      button: 0,
      clientX: 120,
      clientY: 10,
    });

    expect(onValueChange).toHaveBeenCalledWith([50]);
    expect(thumb).toHaveFocus();
    expect(thumb).toHaveAttribute("data-dragging", "true");
  });

  it("preserves keyboard interaction on the thumb", () => {
    const onValueChange = vi.fn();
    render(
      <Slider
        aria-label="Volume"
        min={0}
        max={20}
        step={5}
        defaultValue={10}
        onValueChange={onValueChange}
      />
    );

    const thumb = screen.getByRole("slider", { name: "Volume" });

    fireEvent.keyDown(thumb, { key: "ArrowRight" });

    expect(onValueChange).toHaveBeenCalledWith([15]);
    expect(thumb).toHaveAttribute("aria-valuenow", "15");
  });

  it("does not respond to pointer or keyboard input when disabled", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <Slider aria-label="Volume" defaultValue={40} disabled onValueChange={onValueChange} />
    );

    const root = container.querySelector(".slider") as HTMLElement;
    const track = container.querySelector(".track") as HTMLElement;
    const thumb = screen.getByRole("slider", { name: "Volume" });

    mockElementRect(track, { left: 0, top: 0, width: 200, height: 20 });

    fireEvent.pointerDown(root, {
      pointerId: 1,
      isPrimary: true,
      button: 0,
      clientX: 160,
      clientY: 10,
    });
    fireEvent.keyDown(thumb, { key: "ArrowRight" });

    expect(onValueChange).not.toHaveBeenCalled();
    expect(thumb).toHaveAttribute("aria-disabled", "true");
    expect(thumb).toHaveAttribute("tabindex", "-1");
  });
});
