import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";

describe("Button focus indicator", () => {
  it("should attach the focus ring to the native button root", () => {
    const { container } = render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(container.firstElementChild).toBe(button);
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button).toHaveAttribute("data-ring", "true");
    expect(button).toHaveAttribute("data-focus-indicator", "target");
    expect(container.querySelector(".focus-scope")).not.toBeInTheDocument();
    expect(container.querySelector(".focus-indicator")).not.toBeInTheDocument();
  });

  it("should apply focus-visible data attribute when focused via keyboard", async () => {
    const user = userEvent.setup();
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    await user.tab();

    expect(button).toHaveAttribute("data-focus-visible", "true");
  });

  it("should not apply focus-visible data attribute when focused via mouse", async () => {
    const user = userEvent.setup();
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    await user.click(button);

    expect(button).not.toHaveAttribute("data-focus-visible", "true");
  });

  it("should attach the focus ring to the anchor root", () => {
    const { container } = render(<Button href="/test">Link button</Button>);
    const link = screen.getByRole("link");

    expect(container.firstElementChild).toBe(link);
    expect(link).toBeInstanceOf(HTMLAnchorElement);
    expect(link).toHaveAttribute("data-ring", "true");
    expect(link).toHaveAttribute("data-focus-indicator", "target");
    expect(container.querySelector(".focus-scope")).not.toBeInTheDocument();
    expect(container.querySelector(".focus-indicator")).not.toBeInTheDocument();
  });

  it("should apply focus-visible to anchor when focused via keyboard", async () => {
    const user = userEvent.setup();
    render(<Button href="/test">Link button</Button>);
    const link = screen.getByRole("link");

    await user.tab();

    expect(link).toHaveAttribute("data-focus-visible", "true");
  });
});
