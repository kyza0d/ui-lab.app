import React from "react";
import { describe, expect, it } from "vitest";
import { Mask } from "../Mask";

describe("Mask SSR", () => {
  it("renders directional fade styles during server render", () => {
    const { renderToString } = require("react-dom/server");
    const html = renderToString(
      <Mask className="h-48">
        <Mask.Fade direction="bottom" intensity={1} />
        <div>Content</div>
      </Mask>
    );

    expect(html).toContain("mask-image:linear-gradient");
    expect(html).toContain("-webkit-mask-image:linear-gradient");
    expect(html).toContain("Content");
  });
});
