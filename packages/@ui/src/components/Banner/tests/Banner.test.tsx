import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Banner } from "../Banner";

describe("Banner", () => {
  it("renders a custom variant string as a root class", () => {
    const { container } = render(<Banner variant="my-custom-variant">Custom</Banner>);
    const banner = container.firstElementChild;

    expect(banner).toHaveClass("banner");
    expect(banner).toHaveClass("my-custom-variant");
    expect(banner).toHaveAttribute("data-variant", "my-custom-variant");
  });

  it("preserves the default note variant on the root element", () => {
    const { container } = render(<Banner>Default</Banner>);
    const banner = container.firstElementChild;

    expect(banner).toHaveClass("note");
    expect(banner).toHaveAttribute("data-variant", "note");
  });
});
