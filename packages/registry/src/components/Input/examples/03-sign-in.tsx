"use client";

import { useState } from "react";
import { Input, Flex, Button } from "ui-lab-components";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";

export const metadata = {
  title: "Sign In Form",
  description: "Email and password fields with a password visibility toggle — a common authentication pattern.",
};

export default function Example() {
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
