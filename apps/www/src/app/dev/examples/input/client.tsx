"use client";

import { useState } from "react";

import { Input, Flex, Badge, Button } from "ui-lab-components";
import {
  FaMagnifyingGlass,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaXmark,
  FaLink,
  FaAt,
  FaCopy,
  FaCheck,
  FaCircleExclamation,
  FaKey,
} from "react-icons/fa6";

import { DevExampleLayout, type DevExample } from "../dev-example-layout";

function SignInPreview() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex direction="column" gap="sm" style={{ width: 320 }}>
      <Input
        type="email"
        icon={<FaEnvelope className="w-3.5 h-3.5 text-foreground-400" />}
        placeholder="Email address"
        autoComplete="email"
      />
      <Input
        type={showPassword ? "text" : "password"}
        icon={<FaLock className="w-3.5 h-3.5 text-foreground-400" />}
        placeholder="Password"
        autoComplete="current-password"
        actions={[
          {
            icon: showPassword
              ? <FaEyeSlash className="w-3.5 h-3.5" />
              : <FaEye className="w-3.5 h-3.5" />,
            title: showPassword ? "Hide password" : "Show password",
            onClick: () => setShowPassword((v) => !v),
          },
        ]}
      />
      <Button variant="primary" className="w-full mt-1">Sign in</Button>
    </Flex>
  );
}

function SearchPreview() {
  const [query, setQuery] = useState("");

  return (
    <Flex direction="column" gap="sm" style={{ width: 340 }}>
      <Input
        icon={<FaMagnifyingGlass className="w-3.5 h-3.5 text-foreground-400" />}
        placeholder="Search components..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        hint={!query ? <Badge>⌘K</Badge> : undefined}
        actions={
          query
            ? [{ icon: <FaXmark className="w-3.5 h-3.5" />, title: "Clear", onClick: () => setQuery("") }]
            : []
        }
      />
    </Flex>
  );
}

function HandlePreview() {
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

function ApiKeyPreview() {
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

function UrlValidationPreview() {
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

function QuantityPreview() {
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

const examples: DevExample[] = [
  {
    id: "sign-in",
    title: "Sign In Form",
    description: "Email and password fields with a password visibility toggle — a common authentication pattern.",
    preview: <SignInPreview />,
  },
  {
    id: "search",
    title: "Search",
    description: "Search input with a keyboard shortcut hint that switches to a clear action once the user types.",
    preview: <SearchPreview />,
  },
  {
    id: "handle",
    title: "User Handle",
    description: "Editable username field with an inline copy action.",
    preview: <HandlePreview />,
  },
  {
    id: "api-key",
    title: "API Key",
    description: "Read-only secret field with reveal and copy actions — suitable for credentials and tokens.",
    preview: <ApiKeyPreview />,
  },
  {
    id: "url-validation",
    title: "URL with Validation",
    description: "URL field that shows a success or error icon in the suffix slot based on the input value.",
    preview: <UrlValidationPreview />,
  },
  {
    id: "quantity",
    title: "Quantity",
    description: "Number input with native spin controls for selecting a bounded quantity.",
    preview: <QuantityPreview />,
  },
];

export default function InputExamplesPage() {
  return (
    <DevExampleLayout
      title="Input Examples"
      description="Real-world input patterns: auth forms, search, credentials, and validation."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
