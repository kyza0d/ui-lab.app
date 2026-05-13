import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Date } from "../Date";

describe("Date focus indicator", () => {
  it("attaches the shared focus indicator to calendar day buttons", () => {
    render(<Date defaultMonth={new globalThis.Date(2026, 4, 1)} />);
    const dayButton = screen.getByRole("button", { name: /thursday, may 1/i });

    expect(dayButton).toHaveAttribute("data-ring", "true");
    expect(dayButton).toHaveAttribute("data-focus-indicator", "target");
  });

  it("marks a day as focus-visible when reached by keyboard", async () => {
    const user = userEvent.setup();
    const { container } = render(<Date defaultMonth={new globalThis.Date(2026, 4, 1)} />);

    await user.tab();
    await user.tab();
    await user.tab();

    expect(container.querySelector('.day[data-focus-visible="true"]')).toBeInTheDocument();
  });

  it("attaches the shared focus indicator to month navigation buttons", () => {
    render(<Date defaultMonth={new globalThis.Date(2026, 4, 1)} />);

    expect(screen.getByRole("button", { name: "Previous month" })).toHaveAttribute("data-focus-indicator", "target");
    expect(screen.getByRole("button", { name: "Next month" })).toHaveAttribute("data-focus-indicator", "target");
  });
});
