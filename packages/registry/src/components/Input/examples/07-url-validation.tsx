"use client";

import { useState } from "react";
import { Input, Flex } from "ui-lab-components";
import { FaLink, FaCircleExclamation, FaCheck } from "react-icons/fa6";

export const metadata = {
  title: "URL with Validation",
  description: "URL field that shows a success or error icon in the suffix slot based on the input value.",
};

export default function Example() {
  const [url, setUrl] = useState("");

  const isValid = url.length === 0 || /^https?:\/\/.+\..+/.test(url);
  const showError = url.length > 0 && !isValid;

  return (
    <Flex direction="column" gap="sm" style={{ width: 340 }}>
      <Input
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        error={showError}
        icon={{
          prefix: <FaLink className="w-3.5 h-3.5 text-foreground-400" />,
          suffix: showError
            ? <FaCircleExclamation className="w-3.5 h-3.5 text-red-500" />
            : url.length > 0
            ? <FaCheck className="w-3.5 h-3.5 text-green-500" />
            : undefined,
        }}
      />
    </Flex>
  );
}
