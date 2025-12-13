"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Types
export interface FormErrors {
  [fieldName: string]: string;
}

export interface FormValues {
  [fieldName: string]: any;
}

export interface ValidationRule {
  validate: (value: any) => boolean | Promise<boolean>;
  message: string;
}

export interface ValidationRules {
  [fieldName: string]: ValidationRule | ValidationRule[];
}

// Form Context
interface FormContextType {
  values: FormValues;
  errors: FormErrors;
  touched: Set<string>;
  isSubmitting: boolean;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string) => void;
  setFieldTouched: (name: string, touched?: boolean) => void;
  validateField: (name: string) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  resetForm: (values?: FormValues) => void;
  submitForm: () => Promise<void>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a Form");
  }
  return context;
}

// Error Boundary
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class FormErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error("Form wrapper error:", error);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback ? (
        this.props.fallback(this.state.error)
      ) : (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold">Form Error</h3>
          <p className="text-red-700 text-sm mt-1">{this.state.error.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main Form Component
export interface FormProps {
  initialValues: FormValues;
  validationRules?: ValidationRules;
  onSubmit: (values: FormValues) => Promise<void> | void;
  onError?: (errors: FormErrors) => void;
  children: ReactNode;
  errorBoundaryFallback?: (error: Error) => ReactNode;
  className?: string;
}

export function Form({
  initialValues,
  validationRules = {},
  onSubmit,
  onError,
  children,
  errorBoundaryFallback,
  className,
}: FormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldValue = useCallback((name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const setFieldTouched = useCallback((name: string, touched = true) => {
    setTouched((prev) => {
      const newTouched = new Set(prev);
      if (touched) {
        newTouched.add(name);
      } else {
        newTouched.delete(name);
      }
      return newTouched;
    });
  }, []);

  const validateField = useCallback(
    async (name: string): Promise<boolean> => {
      const rules = validationRules[name];
      if (!rules) return true;

      const rulesList = Array.isArray(rules) ? rules : [rules];
      const value = values[name];

      for (const rule of rulesList) {
        const isValid = await rule.validate(value);
        if (!isValid) {
          setFieldError(name, rule.message);
          return false;
        }
      }

      setFieldError(name, "");
      return true;
    },
    [validationRules, values, setFieldError]
  );

  const validateForm = useCallback(async (): Promise<boolean> => {
    const fieldNames = Object.keys(validationRules);
    const results = await Promise.all(fieldNames.map(validateField));
    return results.every((result) => result);
  }, [validationRules, validateField]);

  const resetForm = useCallback((newValues?: FormValues) => {
    setValues(newValues || initialValues);
    setErrors({});
    setTouched(new Set());
  }, [initialValues]);

  const submitForm = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const isValid = await validateForm();
      if (!isValid) {
        onError?.(errors);
        return;
      }
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission error:", error);
      onError?.(errors);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, onSubmit, values, errors, onError]);

  const contextValue: FormContextType = {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    validateField,
    validateForm,
    resetForm,
    submitForm,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <FormErrorBoundary fallback={errorBoundaryFallback}>
      <FormContext.Provider value={contextValue}>
        <form className={cn("space-y-4 min-w-80", className)} onSubmit={handleSubmit}>
          {children}
        </form>
      </FormContext.Provider>
    </FormErrorBoundary>
  );
}

// Export Field Input Component for form integration
export interface FormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  children: (context: FormContextType) => ReactNode;
}

export function FormField({
  name,
  label,
  required,
  className,
  children,
}: FormFieldProps) {
  const context = useFormContext();
  const error = context.errors[name];
  const isTouched = context.touched.has(name);

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label className="text-sm font-medium text-foreground-50">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <div>
        {children(context)}
      </div>
      {error && isTouched && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
