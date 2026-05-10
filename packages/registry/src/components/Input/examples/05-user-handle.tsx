"use client";

import { useState } from "react";
import { Input, Flex } from "ui-lab-components";
import { FaAt, FaCopy, FaCheck } from "react-icons/fa6";

export const metadata = {
  title: "User Handle",
  description: "Editable username field with an inline copy action.",
};

export default function Example() {
  const [handle, setHandle] = useState("kyza");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Flex direction="column" gap="sm" style={{ width: 320 }}>
      <Input
        icon={<FaAt className="w-3.5 h-3.5 text-foreground-400" />}
        placeholder="username"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
        actions={[
          {
            icon: copied
              ? <FaCheck className="w-3.5 h-3.5 text-green-500" />
              : <FaCopy className="w-3.5 h-3.5" />,
            title: copied ? "Copied!" : "Copy handle",
            onClick: handleCopy,
          },
        ]}
      />
    </Flex>
  );
}
