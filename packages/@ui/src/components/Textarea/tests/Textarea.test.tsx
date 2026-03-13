import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { TextArea } from "../Textarea";

describe("TextArea", () => {
  it("uses a custom bottom-right handle by default", () => {
    const { container } = render(<TextArea aria-label="Notes" />);

    const textarea = screen.getByRole("textbox", { name: "Notes" });
    const handle = container.querySelector('[data-slot="resize-handle"]');

    expect(textarea).toHaveAttribute("data-resize-axis", "both");
    expect(textarea).toHaveStyle({ resize: "none" });
    expect(handle).toHaveAttribute("data-axis", "both");
  });

  it("uses a right-side handle when resize-x is passed", () => {
    const { container } = render(<TextArea aria-label="Horizontal" className="resize-x" />);

    const textarea = screen.getByRole("textbox", { name: "Horizontal" });
    const handle = container.querySelector('[data-slot="resize-handle"]');

    expect(textarea).toHaveAttribute("data-resize-axis", "x");
    expect(handle).toHaveAttribute("data-axis", "x");
  });

  it("uses a bottom handle when resize-y is passed", () => {
    const { container } = render(<TextArea aria-label="Vertical" className="resize-y" />);

    const textarea = screen.getByRole("textbox", { name: "Vertical" });
    const handle = container.querySelector('[data-slot="resize-handle"]');

    expect(textarea).toHaveAttribute("data-resize-axis", "y");
    expect(handle).toHaveAttribute("data-axis", "y");
  });

  it("disables resizing when resize-none is passed", () => {
    const { container } = render(<TextArea aria-label="Locked" className="resize-none" />);

    const textarea = screen.getByRole("textbox", { name: "Locked" });

    expect(textarea).toHaveAttribute("data-resize-axis", "none");
    expect(container.querySelector('[data-slot="resize-handle"]')).toBeNull();
  });
});
