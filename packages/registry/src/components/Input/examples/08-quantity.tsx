"use client";

import { useState } from "react";
import { Input, Flex } from "ui-lab-components";

export const metadata = {
  title: "Quantity",
  description: "Number input with native spin controls for selecting a bounded quantity.",
};

export default function Example() {
  const [qty, setQty] = useState(1);

  return (
    <Flex direction="column" gap="sm" style={{ width: 200 }}>
      <Input
        type="number"
        placeholder="Qty"
        value={qty}
        min={1}
        max={99}
        onChange={(e) => setQty(Number(e.target.value))}
      />
    </Flex>
  );
}
