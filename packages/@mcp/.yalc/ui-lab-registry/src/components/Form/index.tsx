import { Button } from 'ui-lab-components';
import { Input } from 'ui-lab-components';
import { Form, FormField, useFormContext } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-form';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

const examplesData = [
  { id: '01-basic-form', Component: Example1, metadata: metadata1 },
];

const basicFormCode = `import { Form, FormField, useFormContext } from "ui-lab-components";
import { Input } from "ui-lab-components";
import { Button } from "ui-lab-components";

function LoginForm() {
  return (
    <Form
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
    </Form>
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
  <Form
    initialValues={{ email: '', password: '' }}
    onSubmit={async (values) => {
      console.log('Login:', values);
    }}
  >
    <FormField name="email" label="Email" required>
      {(ctx) => (
        <Input
          type="email"
          placeholder="your@email.com"
          value={ctx.values.email}
          onChange={(e) => ctx.setFieldValue('email', e.target.value)}
          onBlur={() => ctx.setFieldTouched('email')}
          error={!!(ctx.errors.email && ctx.touched.has('email'))}
        />
      )}
    </FormField>

    <FormField name="password" label="Password" required>
      {(ctx) => (
        <Input
          type="password"
          placeholder="Enter your password"
          value={ctx.values.password}
          onChange={(e) => ctx.setFieldValue('password', e.target.value)}
          onBlur={() => ctx.setFieldTouched('password')}
          error={!!(ctx.errors.password && ctx.touched.has('password'))}
        />
      )}
    </FormField>

    <BasicSubmitBtn />
  </Form>
);

function BasicSubmitBtn() {
  const { isSubmitting, submitForm } = useFormContext();
  return (
    <Button onClick={submitForm} disabled={isSubmitting} className="w-full">
      {isSubmitting ? 'Signing in...' : 'Sign In'}
    </Button>
  );
}

export const formDetail: ComponentDetail = {
  id: 'form',
  name: 'Form',
  description: 'A comprehensive form management solution with built-in validation, error handling, state management, and error boundary protection.',
  overview: (
    <div className="space-y-6 text-foreground-300">
      <div>
        <p>
          The Form is a technical component that simplifies form management. Represented by the forms icon, it provides complete form state management, validation, error handling, and submission logic in one package. Use this component as the foundation for any form in your application.
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
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: basicFormCode,
      preview: <BasicLoginExample />,
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: 'default',
      name: 'Default',
      description: 'Basic form with email and password fields.',
      code: basicFormCode,
      preview: <BasicLoginExample />,
    },
  ],
};

export * from './examples';
