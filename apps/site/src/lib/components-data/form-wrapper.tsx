"use client";

import { Button } from "ui-lab-components";
import { Input } from "ui-lab-components";
import { TextArea } from "ui-lab-components";
import { FormWrapper, FormField, useFormContext } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { useState } from "react";
import { cn } from "@/lib/utils";

const basicFormCode = `import { FormWrapper, FormField, useFormContext } from "ui-lab-components";
import { Input } from "ui-lab-components";
import { Button } from "ui-lab-components";

function LoginForm() {
  return (
    <FormWrapper
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        console.log("Login:", values);
      }}
    >
      <FormField name="email" label="Email" required>
        {(ctx) => (
          <Input
            type="email"
            placeholder="your@email.com"
            value={ctx.values.email}
            onChange={(e) => ctx.setFieldValue("email", e.target.value)}
            onBlur={() => ctx.setFieldTouched("email")}
            error={!!(ctx.errors.email && ctx.touched.has("email"))}
          />
        )}
      </FormField>

      <FormField name="password" label="Password" required>
        {(ctx) => (
          <Input
            type="password"
            placeholder="Enter your password"
            value={ctx.values.password}
            onChange={(e) => ctx.setFieldValue("password", e.target.value)}
            onBlur={() => ctx.setFieldTouched("password")}
            error={!!(ctx.errors.password && ctx.touched.has("password"))}
          />
        )}
      </FormField>

      <SubmitButton />
    </FormWrapper>
  );
}

function SubmitButton() {
  const { isSubmitting, submitForm } = useFormContext();
  return (
    <Button onClick={submitForm} disabled={isSubmitting} className="w-full">
      {isSubmitting ? "Signing in..." : "Sign In"}
    </Button>
  );
}`;

const BasicLoginExample = () => (
  <FormWrapper
    initialValues={{ email: "", password: "" }}
    onSubmit={async (values) => {
      console.log("Login:", values);
    }}
  >
    <FormField name="email" label="Email" required>
      {(ctx) => (
        <Input
          type="email"
          placeholder="your@email.com"
          value={ctx.values.email}
          onChange={(e) => ctx.setFieldValue("email", e.target.value)}
          onBlur={() => ctx.setFieldTouched("email")}
          error={!!(ctx.errors.email && ctx.touched.has("email"))}
        />
      )}
    </FormField>

    <FormField name="password" label="Password" required>
      {(ctx) => (
        <Input
          type="password"
          placeholder="Enter your password"
          value={ctx.values.password}
          onChange={(e) => ctx.setFieldValue("password", e.target.value)}
          onBlur={() => ctx.setFieldTouched("password")}
          error={!!(ctx.errors.password && ctx.touched.has("password"))}
        />
      )}
    </FormField>

    <BasicSubmitBtn />
  </FormWrapper>
);

function BasicSubmitBtn() {
  const { isSubmitting, submitForm } = useFormContext();
  return (
    <Button onClick={submitForm} disabled={isSubmitting} className="w-full">
      {isSubmitting ? "Signing in..." : "Sign In"}
    </Button>
  );
}

const validationFormCode = `import { FormWrapper, FormField, useFormContext } from "ui-lab-components";
import { Input } from "ui-lab-components";
import { Button } from "ui-lab-components";

const validationRules = {
  email: {
    validate: (val) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val),
    message: "Please enter a valid email",
  },
  password: [
    {
      validate: (val) => val?.length >= 8,
      message: "Password must be at least 8 characters",
    },
    {
      validate: (val) => /[A-Z]/.test(val),
      message: "Password must contain uppercase letter",
    },
    {
      validate: (val) => /[0-9]/.test(val),
      message: "Password must contain number",
    },
  ],
};

function SignupForm() {
  return (
    <FormWrapper
      initialValues={{ email: "", password: "" }}
      validationRules={validationRules}
      onSubmit={async (values) => {
        console.log("Signup:", values);
      }}
      onError={(errors) => {
        console.log("Validation failed:", errors);
      }}
    >
      <FormField name="email" label="Email" required>
        {(ctx) => (
          <Input
            type="email"
            placeholder="your@email.com"
            value={ctx.values.email}
            onChange={(e) => ctx.setFieldValue("email", e.target.value)}
            onBlur={() => ctx.setFieldTouched("email")}
            error={!!(ctx.errors.email && ctx.touched.has("email"))}
          />
        )}
      </FormField>

      <FormField name="password" label="Password" required>
        {(ctx) => (
          <Input
            type="password"
            placeholder="Min 8 chars, uppercase, number"
            value={ctx.values.password}
            onChange={(e) => ctx.setFieldValue("password", e.target.value)}
            onBlur={() => ctx.setFieldTouched("password")}
            error={!!(ctx.errors.password && ctx.touched.has("password"))}
          />
        )}
      </FormField>

      <ValidSubmitBtn />
    </FormWrapper>
  );
}

function ValidSubmitBtn() {
  const { isSubmitting, submitForm } = useFormContext();
  return (
    <Button onClick={submitForm} disabled={isSubmitting} className="w-full">
      {isSubmitting ? "Creating..." : "Create Account"}
    </Button>
  );
}`;

const ValidationExample = () => {
  const validationRules = {
    email: {
      validate: (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      message: "Please enter a valid email",
    },
    password: [
      {
        validate: (val: string) => val?.length >= 8,
        message: "Password must be at least 8 characters",
      },
      {
        validate: (val: string) => /[A-Z]/.test(val),
        message: "Password must contain uppercase letter",
      },
      {
        validate: (val: string) => /[0-9]/.test(val),
        message: "Password must contain number",
      },
    ],
  };

  return (
    <FormWrapper
      initialValues={{ email: "", password: "" }}
      validationRules={validationRules}
      onSubmit={async (values) => {
        console.log("Signup:", values);
      }}
      onError={(errors) => {
        console.log("Validation failed:", errors);
      }}
    >
      <FormField name="email" label="Email" required>
        {(ctx) => (
          <Input
            type="email"
            placeholder="your@email.com"
            value={ctx.values.email}
            onChange={(e) => ctx.setFieldValue("email", e.target.value)}
            onBlur={() => ctx.setFieldTouched("email")}
            error={!!(ctx.errors.email && ctx.touched.has("email"))}
          />
        )}
      </FormField>

      <FormField name="password" label="Password" required>
        {(ctx) => (
          <Input
            type="password"
            placeholder="Min 8 chars, uppercase, number"
            value={ctx.values.password}
            onChange={(e) => ctx.setFieldValue("password", e.target.value)}
            onBlur={() => ctx.setFieldTouched("password")}
            error={!!(ctx.errors.password && ctx.touched.has("password"))}
          />
        )}
      </FormField>

      <ValidSubmitBtn />
    </FormWrapper>
  );
};

function ValidSubmitBtn() {
  const { isSubmitting, submitForm } = useFormContext();
  return (
    <Button onClick={submitForm} disabled={isSubmitting} className="w-full">
      {isSubmitting ? "Creating..." : "Create Account"}
    </Button>
  );
}

const multiStepFormCode = `import { FormWrapper, FormField, useFormContext } from "ui-lab-components";
import { Input } from "ui-lab-components";
import { TextArea } from "ui-lab-components";
import { Button } from "ui-lab-components";
import { useState } from "react";

function ContactWizard() {
  const [step, setStep] = useState(1);

  return (
    <FormWrapper
      initialValues={{
        fullName: "",
        email: "",
        subject: "",
        message: "",
      }}
      onSubmit={async (values) => {
        console.log("Contact submitted:", values);
      }}
    >
      {step === 1 && <Step1 onNext={() => setStep(2)} />}
      {step === 2 && (
        <Step2
          onPrevious={() => setStep(1)}
        />
      )}
    </FormWrapper>
  );
}`;

const MultiStepExample = () => {
  const [step, setStep] = useState(1);

  const StepIndicator = () => (
    <div className="flex gap-2 mb-6">
      <div className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm",
        step >= 1 ? "bg-accent-500 text-background-950" : "bg-background-800 text-foreground-400"
      )}>
        1
      </div>
      <div className="flex-1 h-1 bg-background-800 rounded self-center" />
      <div className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm",
        step >= 2 ? "bg-accent-500 text-background-950" : "bg-background-800 text-foreground-400"
      )}>
        2
      </div>
    </div>
  );

  return (
    <FormWrapper
      initialValues={{
        fullName: "",
        email: "",
        subject: "",
        message: "",
      }}
      onSubmit={async (values) => {
        console.log("Contact submitted:", values);
      }}
    >
      <StepIndicator />

      {step === 1 && (
        <>
          <h4 className="font-semibold text-foreground-50 mb-4">Your Information</h4>
          <FormField name="fullName" label="Full Name" required>
            {(ctx) => (
              <Input
                placeholder="John Doe"
                value={ctx.values.fullName}
                onChange={(e) => ctx.setFieldValue("fullName", e.target.value)}
                onBlur={() => ctx.setFieldTouched("fullName")}
              />
            )}
          </FormField>

          <FormField name="email" label="Email" required>
            {(ctx) => (
              <Input
                type="email"
                placeholder="your@email.com"
                value={ctx.values.email}
                onChange={(e) => ctx.setFieldValue("email", e.target.value)}
                onBlur={() => ctx.setFieldTouched("email")}
              />
            )}
          </FormField>

          <MultiStepStep1Btn onNext={() => setStep(2)} />
        </>
      )}

      {step === 2 && (
        <>
          <h4 className="font-semibold text-foreground-50 mb-4">Your Message</h4>
          <FormField name="subject" label="Subject" required>
            {(ctx) => (
              <Input
                placeholder="What is this about?"
                value={ctx.values.subject}
                onChange={(e) => ctx.setFieldValue("subject", e.target.value)}
                onBlur={() => ctx.setFieldTouched("subject")}
              />
            )}
          </FormField>

          <FormField name="message" label="Message" required>
            {(ctx) => (
              <TextArea
                placeholder="Your message here..."
                value={ctx.values.message}
                onChange={(e) => ctx.setFieldValue("message", e.target.value)}
                onBlur={() => ctx.setFieldTouched("message")}
              />
            )}
          </FormField>

          <MultiStepStep2Btn onPrevious={() => setStep(1)} />
        </>
      )}
    </FormWrapper>
  );
};

function MultiStepStep1Btn({ onNext }: { onNext: () => void }) {
  const { values } = useFormContext();
  const canProceed = values.fullName?.trim() && values.email?.trim();
  return (
    <Button onClick={onNext} disabled={!canProceed} className="w-full">
      Next
    </Button>
  );
}

function MultiStepStep2Btn({ onPrevious }: { onPrevious: () => void }) {
  const { isSubmitting, submitForm } = useFormContext();
  return (
    <div className="flex gap-3">
      <Button variant="outline" onClick={onPrevious} className="flex-1">
        Back
      </Button>
      <Button onClick={submitForm} disabled={isSubmitting} className="flex-1">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}

const resetFormCode = `import { FormWrapper, FormField, useFormContext } from "ui-lab-components";
import { Input } from "ui-lab-components";
import { Button } from "ui-lab-components";

function ProfileForm() {
  return (
    <FormWrapper
      initialValues={{
        firstName: "",
        lastName: "",
        company: "",
      }}
      onSubmit={async (values) => {
        console.log("Profile saved:", values);
      }}
    >
      <FormField name="firstName" label="First Name">
        {(ctx) => (
          <Input
            placeholder="John"
            value={ctx.values.firstName}
            onChange={(e) => ctx.setFieldValue("firstName", e.target.value)}
            onBlur={() => ctx.setFieldTouched("firstName")}
          />
        )}
      </FormField>

      <FormField name="lastName" label="Last Name">
        {(ctx) => (
          <Input
            placeholder="Doe"
            value={ctx.values.lastName}
            onChange={(e) => ctx.setFieldValue("lastName", e.target.value)}
            onBlur={() => ctx.setFieldTouched("lastName")}
          />
        )}
      </FormField>

      <FormField name="company" label="Company">
        {(ctx) => (
          <Input
            placeholder="Acme Inc."
            value={ctx.values.company}
            onChange={(e) => ctx.setFieldValue("company", e.target.value)}
            onBlur={() => ctx.setFieldTouched("company")}
          />
        )}
      </FormField>

      <FormActions />
    </FormWrapper>
  );
}

function FormActions() {
  const { isSubmitting, submitForm, resetForm } = useFormContext();
  return (
    <div className="flex gap-3">
      <Button onClick={submitForm} disabled={isSubmitting} className="flex-1">
        Save Changes
      </Button>
      <Button variant="outline" onClick={() => resetForm()} className="flex-1">
        Reset
      </Button>
    </div>
  );
}`;

const ResetExample = () => (
  <FormWrapper
    initialValues={{
      firstName: "John",
      lastName: "Doe",
      company: "Acme Inc.",
    }}
    onSubmit={async (values) => {
      console.log("Profile saved:", values);
    }}
  >
    <FormField name="firstName" label="First Name">
      {(ctx) => (
        <Input
          placeholder="John"
          value={ctx.values.firstName}
          onChange={(e) => ctx.setFieldValue("firstName", e.target.value)}
          onBlur={() => ctx.setFieldTouched("firstName")}
        />
      )}
    </FormField>

    <FormField name="lastName" label="Last Name">
      {(ctx) => (
        <Input
          placeholder="Doe"
          value={ctx.values.lastName}
          onChange={(e) => ctx.setFieldValue("lastName", e.target.value)}
          onBlur={() => ctx.setFieldTouched("lastName")}
        />
      )}
    </FormField>

    <FormField name="company" label="Company">
      {(ctx) => (
        <Input
          placeholder="Acme Inc."
          value={ctx.values.company}
          onChange={(e) => ctx.setFieldValue("company", e.target.value)}
          onBlur={() => ctx.setFieldTouched("company")}
        />
      )}
    </FormField>

    <ResetFormActions />
  </FormWrapper>
);

function ResetFormActions() {
  const { isSubmitting, submitForm, resetForm } = useFormContext();
  return (
    <div className="flex gap-3">
      <Button onClick={submitForm} disabled={isSubmitting} className="flex-1">
        Save Changes
      </Button>
      <Button variant="outline" onClick={() => resetForm()} className="flex-1">
        Reset
      </Button>
    </div>
  );
}

export const formWrapperDetail: ComponentDetail = {
  id: "form-wrapper",
  name: "Form Wrapper",
  description: "A comprehensive form management solution with built-in validation, error handling, state management, and error boundary protection.",
  overview: (
    <div className="space-y-6 text-foreground-300">
      <div>
        <p>
          The Form Wrapper is a technical component that simplifies form management. Represented by the forms icon, it provides complete form state management, validation, error handling, and submission logic in one package. Use this component as the foundation for any form in your application.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-foreground-50 mb-3">Core Features</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Centralized form state management with React Context</li>
          <li>Flexible validation rules with custom validators</li>
          <li>Built-in error boundary for error handling</li>
          <li>Field-level and form-level validation</li>
          <li>Reset functionality to restore initial values</li>
          <li>Touch tracking for smart error display</li>
          <li>Loading states during form submission</li>
          <li>Async validation support</li>
          <li>Form-wide error callbacks</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-foreground-50 mb-3">When to Use</h4>
        <p>
          Use the Form Wrapper when you need:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Complex forms with multiple fields and validation rules</li>
          <li>Real-time validation with error display</li>
          <li>Multi-step or wizard-style forms</li>
          <li>Conditional field visibility or validation</li>
          <li>Custom form submission handling</li>
          <li>Form state reset capabilities</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-foreground-50 mb-3">Architecture</h4>
        <p>
          The Form Wrapper uses React Context to provide form state and methods throughout the component tree. The error boundary wraps the form to catch and display any errors gracefully. Validation is performed at both field and form levels.
        </p>
      </div>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Login Form",
      description: "A simple login form demonstrating fundamental FormWrapper usage with email and password fields.",
      code: basicFormCode,
      preview: <BasicLoginExample />,
    },
    {
      id: "validation",
      title: "Form with Validation Rules",
      description: "Demonstrates validation with multiple rules per field, error messages, and real-time feedback. Password requires 8+ chars, uppercase, and number.",
      code: validationFormCode,
      preview: <ValidationExample />,
    },
    {
      id: "multi-step",
      title: "Multi-step Wizard Form",
      description: "A two-step contact form showing step navigation, conditional rendering, and form submission. Shows progress indicator and back button.",
      code: multiStepFormCode,
      preview: <MultiStepExample />,
    },
    {
      id: "reset",
      title: "Form Reset & Edit Pattern",
      description: "Profile edit form showing how to use reset functionality. Pre-populated fields and reset button to discard changes.",
      code: resetFormCode,
      preview: <ResetExample />,
    },
  ],

  props: [
    {
      name: "initialValues",
      type: "FormValues",
      description: "Object containing initial values for all form fields.",
    },
    {
      name: "validationRules",
      type: "ValidationRules",
      description: "Object mapping field names to validation rules with custom validators.",
    },
    {
      name: "onSubmit",
      type: "(values: FormValues) => Promise<void> | void",
      description: "Callback function executed when form is submitted and validated.",
    },
    {
      name: "onError",
      type: "(errors: FormErrors) => void",
      description: "Optional callback executed when validation fails.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Child components, typically FormField components.",
    },
    {
      name: "errorBoundaryFallback",
      type: "(error: Error) => ReactNode",
      description: "Custom error boundary fallback UI.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for the form element.",
    },
  ],

  usage: (
    <div className="space-y-6 text-foreground-300 text-sm">
      <div>
        <h4 className="font-semibold text-foreground-50 mb-3">Core Concepts</h4>
        <div className="space-y-3">
          <div>
            <p className="font-medium text-foreground-100">Form Context</p>
            <p className="text-foreground-400">Access form state and methods using the useFormContext hook within child components. The context provides all methods needed to control the form.</p>
          </div>
          <div>
            <p className="font-medium text-foreground-100">Field Values</p>
            <p className="text-foreground-400">Update field values using ctx.setFieldValue(name, value) callback. This is the primary way to update form state.</p>
          </div>
          <div>
            <p className="font-medium text-foreground-100">Validation Rules</p>
            <p className="text-foreground-400">Define validation rules per field with custom validators that return boolean or Promise. Supports both sync and async validation.</p>
          </div>
          <div>
            <p className="font-medium text-foreground-100">Touch Tracking</p>
            <p className="text-foreground-400">Errors only show for touched fields, preventing overwhelming users with errors on page load. Mark fields as touched on blur.</p>
          </div>
          <div>
            <p className="font-medium text-foreground-100">Reset Functionality</p>
            <p className="text-foreground-400">Restore form to initial state using ctx.resetForm() or pass new initial values to reset to a different state.</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground-50 mb-3">Context Methods</h4>
        <div className="space-y-2">
          <div className="bg-background-800/30 p-2 rounded">
            <p className="font-mono text-xs font-medium text-accent-400">setFieldValue(name, value)</p>
            <p className="text-xs text-foreground-500">Update a specific field value</p>
          </div>
          <div className="bg-background-800/30 p-2 rounded">
            <p className="font-mono text-xs font-medium text-accent-400">setFieldTouched(name, touched?)</p>
            <p className="text-xs text-foreground-500">Mark a field as touched (shows errors for this field)</p>
          </div>
          <div className="bg-background-800/30 p-2 rounded">
            <p className="font-mono text-xs font-medium text-accent-400">setFieldError(name, error)</p>
            <p className="text-xs text-foreground-500">Manually set a field error message</p>
          </div>
          <div className="bg-background-800/30 p-2 rounded">
            <p className="font-mono text-xs font-medium text-accent-400">validateField(name)</p>
            <p className="text-xs text-foreground-500">Validate a single field and return validation result</p>
          </div>
          <div className="bg-background-800/30 p-2 rounded">
            <p className="font-mono text-xs font-medium text-accent-400">validateForm()</p>
            <p className="text-xs text-foreground-500">Validate all fields with validation rules</p>
          </div>
          <div className="bg-background-800/30 p-2 rounded">
            <p className="font-mono text-xs font-medium text-accent-400">resetForm(values?)</p>
            <p className="text-xs text-foreground-500">Reset form to initial state or new values</p>
          </div>
          <div className="bg-background-800/30 p-2 rounded">
            <p className="font-mono text-xs font-medium text-accent-400">submitForm()</p>
            <p className="text-xs text-foreground-500">Validate all fields and submit if valid</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground-50 mb-3">Validation Rules Pattern</h4>
        <p className="mb-2">Define validation rules as objects with validate function and message:</p>
        <code className="block bg-background-800 p-3 rounded text-xs overflow-x-auto mb-3">
          {`// Single rule
const rules = {
  email: {
    validate: (val) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val),
    message: "Invalid email address"
  }
}

// Multiple rules (array)
const rules = {
  password: [
    {
      validate: (val) => val.length >= 8,
      message: "Password must be at least 8 characters"
    },
    {
      validate: (val) => /[A-Z]/.test(val),
      message: "Password must have uppercase"
    }
  ]
}

// Async validation
const rules = {
  username: {
    validate: async (val) => {
      const response = await fetch(\`/api/check-username?q=\${val}\`);
      return response.ok;
    },
    message: "Username is already taken"
  }
}`}
        </code>
      </div>

      <div>
        <h4 className="font-semibold text-foreground-50 mb-3">Use Cases</h4>
        <div className="space-y-2">
          <div>
            <p className="font-medium text-foreground-100">Login Forms</p>
            <p className="text-foreground-400">Email validation, password requirements, form submission</p>
          </div>
          <div>
            <p className="font-medium text-foreground-100">Registration Forms</p>
            <p className="text-foreground-400">Multiple fields, password confirmation, terms acceptance</p>
          </div>
          <div>
            <p className="font-medium text-foreground-100">Multi-step Wizards</p>
            <p className="text-foreground-400">Conditional navigation, field visibility, progress tracking</p>
          </div>
          <div>
            <p className="font-medium text-foreground-100">Dynamic Forms</p>
            <p className="text-foreground-400">Conditional fields, dependent field validation</p>
          </div>
          <div>
            <p className="font-medium text-foreground-100">Data Entry Forms</p>
            <p className="text-foreground-400">Complex validation, reset capability, submission handling</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground-50 mb-3">Best Practices</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Always mark fields as touched on blur to show errors at the right time</li>
          <li>Use async validators for server-side checks (e.g., checking username availability)</li>
          <li>Provide clear, actionable error messages to users</li>
          <li>Disable submit button while form is submitting</li>
          <li>Handle errors in the onError callback for form-level error management</li>
          <li>Use FormField component for consistent error display and styling</li>
          <li>Consider performance for forms with many fields (memoize handlers if needed)</li>
        </ul>
      </div>
    </div>
  ),
};
