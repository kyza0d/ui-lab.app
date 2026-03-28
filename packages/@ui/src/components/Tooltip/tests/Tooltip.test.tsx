import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Tooltip } from "../Tooltip";

function TestTrigger({ children }: { children: React.ReactNode }) {
  return <button type="button">{children}</button>;
}

describe("Tooltip", () => {
  it("preserves the wrapped element's own classes and behavior", () => {
    const onClick = vi.fn();

    render(
      <Tooltip content="Under Construction">
        <button type="button" className="h-full" data-testid="trigger" onClick={onClick}>
          Articles
        </button>
      </Tooltip>
    );

    const trigger = screen.getByTestId("trigger");
    fireEvent.click(trigger);

    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger).toHaveClass("h-full");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("still opens for custom component children that do not forward arbitrary props", () => {
    const onOpenChange = vi.fn();

    render(
      <Tooltip
        content="Under Construction"
        delay={0}
        onOpenChange={onOpenChange}
      >
        <TestTrigger>Articles</TestTrigger>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: "Articles" });
    fireEvent.mouseOver(trigger);
    fireEvent.focusIn(trigger);

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
