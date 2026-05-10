"use client";

import { useState } from "react";
import { Input, Flex } from "ui-lab-components";
import { FaKey, FaEye, FaEyeSlash, FaCopy, FaCheck } from "react-icons/fa6";

export const metadata = {
  title: "API Key",
  description: "Read-only secret field with reveal and copy actions — suitable for credentials and tokens.",
};

export default function Example() {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const key = "sk-proj-a8f2c1d9e4b7";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Flex direction="column" gap="sm" style={{ width: 360 }}>
      <Input
        type={revealed ? "text" : "password"}
        icon={<FaKey className="w-3.5 h-3.5 text-foreground-400" />}
        value={key}
        readOnly
        actions={[
          {
            icon: revealed
              ? <FaEyeSlash className="w-3.5 h-3.5" />
              : <FaEye className="w-3.5 h-3.5" />,
            title: revealed ? "Hide key" : "Reveal key",
            onClick: () => setRevealed((v) => !v),
          },
          {
            icon: copied
              ? <FaCheck className="w-3.5 h-3.5 text-green-500" />
              : <FaCopy className="w-3.5 h-3.5" />,
            title: copied ? "Copied!" : "Copy key",
            onClick: handleCopy,
          },
        ]}
      />
    </Flex>
  );
}
