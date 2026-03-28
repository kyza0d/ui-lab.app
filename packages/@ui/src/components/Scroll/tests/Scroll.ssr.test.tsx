import React from "react";
import { describe, expect, it } from "vitest";
import { Scroll } from "../Scroll";

describe("Scroll SSR", () => {
  it("includes a first-paint vertical fade in server markup", () => {
    const { renderToString } = require("react-dom/server");
    const html = renderToString(
      <Scroll maxHeight="12rem" fade-y>
        <div>Alpha</div>
        <div>Beta</div>
      </Scroll>
    );

    expect(html).toContain("--mask-top-fade:0%");
    expect(html).toContain("--mask-bottom-fade:4%");
    expect(html).toContain("mask-image:linear-gradient");
  });
});
