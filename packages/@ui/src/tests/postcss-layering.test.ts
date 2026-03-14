import postcss from "postcss";
import { describe, expect, it } from "vitest";

import { demoteTailwindUtilityLayer } from "../../postcss.config.mts";

describe("demoteTailwindUtilityLayer", () => {
  it("moves generated utility rules into the components layer", async () => {
    const result = await postcss([demoteTailwindUtilityLayer()]).process(
      `@layer utilities {
        .flex {
          display: flex;
        }
      }`,
      { from: undefined }
    );

    expect(result.css).toContain("@layer components");
    expect(result.css).not.toContain("@layer utilities");
  });

  it("leaves layer ordering declarations untouched", async () => {
    const css = "@layer theme, base, components, utilities;";

    const result = await postcss([demoteTailwindUtilityLayer()]).process(css, {
      from: undefined,
    });

    expect(result.css.trim()).toBe(css);
  });
});
