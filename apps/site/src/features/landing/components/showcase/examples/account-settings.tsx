"use client";

import { useState } from "react";
import { Input, TextArea, Checkbox, Radio, Divider } from "ui-lab-components";

export function FormInputs() {
  const [plan, setPlan] = useState("pro");

  return (
    <div>
      <div>
        <div className="px-4 py-3 border-b border-background-700">
          <div className="text-sm font-semibold text-foreground-100">Account Settings</div>
          <div className="text-xs text-foreground-500 mt-0.5">Manage your preferences.</div>
        </div>

        <div className="px-4 py-3 flex flex-col gap-3">
          <div>
            <div className="text-xs text-foreground-400 mb-1.5">Display name</div>
            <Input placeholder="Your name" />
          </div>
          <div>
            <div className="text-xs text-foreground-400 mb-1.5">Bio</div>
            <TextArea placeholder="Tell us about yourself..." rows={2} resizable={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
