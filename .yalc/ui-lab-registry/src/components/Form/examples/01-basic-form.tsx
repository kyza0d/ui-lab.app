import React from 'react';
import { Form, FormField } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Form',
  description: 'A simple form with input fields and submit button. Use this as the standard form container in your interface.'
};

export default function Example() {
  return (
    <Form
      initialValues={{ name: '', email: '' }}
      onSubmit={(values) => {
        console.log('Form submitted:', values);
      }}
    >
      <FormField name="name" label="Name" required>
        {(context) => (
          <input
            type="text"
            value={context.values.name || ''}
            onChange={(e) => context.setFieldValue('name', e.target.value)}
            onBlur={() => context.setFieldTouched('name')}
          />
        )}
      </FormField>
      <FormField name="email" label="Email" required>
        {(context) => (
          <input
            type="email"
            value={context.values.email || ''}
            onChange={(e) => context.setFieldValue('email', e.target.value)}
            onBlur={() => context.setFieldTouched('email')}
          />
        )}
      </FormField>
      <button type="submit">Submit</button>
    </Form>
  );
}
