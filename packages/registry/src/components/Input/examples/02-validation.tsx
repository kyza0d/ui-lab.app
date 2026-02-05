import React from 'react';
import { Input, Label } from 'ui-lab-components';
import { FaCircleExclamation, FaCircleCheck } from 'react-icons/fa6';

export const metadata = {
  title: 'Validation States',
  description: 'Input fields with error and success validation states, including helper text for user feedback.'
};

export default function Example() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      {/* Error State */}
      <div className="flex flex-col gap-1.5">
        <Label error helperText="Please enter a valid email address" helperTextError>
          Email
        </Label>
        <Input
          type="email"
          placeholder="Enter your email"
          error
          defaultValue="invalid-email"
          suffixIcon={<FaCircleExclamation className="text-danger-600" size={14} />}
        />
      </div>

      {/* Success State */}
      <div className="flex flex-col gap-1.5">
        <Label helperText="Email address is available">
          Email
        </Label>
        <Input
          type="email"
          placeholder="Enter your email"
          defaultValue="user@example.com"
          suffixIcon={<FaCircleCheck className="text-success-600" size={14} />}
          className="border-success-600 focus:border-success-600"
        />
      </div>

      {/* Default State with Helper Text */}
      <div className="flex flex-col gap-1.5">
        <Label required helperText="We'll never share your email with anyone else.">
          Email
        </Label>
        <Input
          type="email"
          placeholder="Enter your email"
        />
      </div>
    </div>
  );
}
