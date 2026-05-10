import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Color } from "../index";

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

describe("Color.Slider", () => {
  it("renders a standalone hue slider on top of the shared Slider primitive", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Color.Slider aria-label="Accent hue" value={0} onChange={onChange} />
    );

    const root = container.querySelector(".hue-slider") as HTMLElement;
    const track = container.querySelector(".hue-track") as HTMLElement;
    const thumb = screen.getByRole("slider", { name: "Accent hue" });

    mockElementRect(track, { left: 10, top: 0, width: 200, height: 16 });

    fireEvent.pointerDown(root, {
      pointerId: 1,
      isPrimary: true,
      button: 0,
      clientX: 110,
      clientY: 8,
    });

    expect(root).toHaveClass("hue-slider");
    expect(track).toHaveAttribute("data-slider-track", "true");
    expect(thumb).toHaveAttribute("aria-valuemax", "360");
    expect(onChange).toHaveBeenCalledWith(180);
    expect(thumb).toHaveFocus();
  });

  it("renders standalone opacity visuals through slider variables and shared interaction", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Color.Slider
        type="opacity"
        aria-label="Accent opacity"
        defaultValue={0.25}
        color="rgb(10, 20, 30)"
        onChange={onChange}
      />
    );

    const root = container.querySelector(".opacity-slider") as HTMLElement;
    const track = container.querySelector(".opacity-track") as HTMLElement;
    const thumb = screen.getByRole("slider", { name: "Accent opacity" });

    mockElementRect(track, { left: 10, top: 0, width: 200, height: 12 });

    fireEvent.pointerDown(root, {
      pointerId: 1,
      isPrimary: true,
      button: 0,
      clientX: 160,
      clientY: 6,
    });

    expect(root.style.getPropertyValue("--color-slider-opacity-color")).toBe("rgb(10, 20, 30)");
    expect(track).toHaveAttribute("data-slider-track", "true");
    expect(thumb).toHaveAttribute("aria-valuemin", "0");
    expect(thumb).toHaveAttribute("aria-valuemax", "1");
    expect(onChange).toHaveBeenCalledWith(0.75);
  });

  it("composes inside Color.Area with hue and opacity sliders", () => {
    render(
      <Color defaultValue="#ff0000" showOpacity>
        <Color.Area />
      </Color>
    );

    expect(screen.getByRole("slider", { name: "Hue" })).toHaveAttribute("aria-valuemax", "360");
    expect(screen.getByRole("slider", { name: "Opacity" })).toHaveAttribute("aria-valuemax", "1");
  });
});
