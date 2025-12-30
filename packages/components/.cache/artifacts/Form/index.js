var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/components/Form/Form.tsx
import React, { createContext, useContext, useState, useCallback } from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Form/Form.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var FormContext = createContext(void 0);
function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a Form");
  }
  return context;
}
var FormErrorBoundary = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error) {
    console.error("Form wrapper error:", error);
  }
  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback ? this.props.fallback(this.state.error) : /* @__PURE__ */ jsxs("div", { className: "p-4 bg-red-50 border border-red-200 rounded-lg", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-red-800 font-semibold", children: "Form Error" }),
        /* @__PURE__ */ jsx("p", { className: "text-red-700 text-sm mt-1", children: this.state.error.message })
      ] });
    }
    return this.props.children;
  }
};
function Form({
  initialValues,
  validationRules = {},
  onSubmit,
  onError,
  children,
  errorBoundaryFallback,
  className
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(/* @__PURE__ */ new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => __spreadProps(__spreadValues({}, prev), { [name]: value }));
  }, []);
  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => __spreadProps(__spreadValues({}, prev), { [name]: error }));
  }, []);
  const setFieldTouched = useCallback((name, touched2 = true) => {
    setTouched((prev) => {
      const newTouched = new Set(prev);
      if (touched2) {
        newTouched.add(name);
      } else {
        newTouched.delete(name);
      }
      return newTouched;
    });
  }, []);
  const validateField = useCallback(
    async (name) => {
      const rules = validationRules[name];
      if (!rules)
        return true;
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
  const validateForm = useCallback(async () => {
    const fieldNames = Object.keys(validationRules);
    const results = await Promise.all(fieldNames.map(validateField));
    return results.every((result) => result);
  }, [validationRules, validateField]);
  const resetForm = useCallback((newValues) => {
    setValues(newValues || initialValues);
    setErrors({});
    setTouched(/* @__PURE__ */ new Set());
  }, [initialValues]);
  const submitForm = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const isValid = await validateForm();
      if (!isValid) {
        onError == null ? void 0 : onError(errors);
        return;
      }
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission error:", error);
      onError == null ? void 0 : onError(errors);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, onSubmit, values, errors, onError]);
  const contextValue = {
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
    submitForm
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return /* @__PURE__ */ jsx(FormErrorBoundary, { fallback: errorBoundaryFallback, children: /* @__PURE__ */ jsx(FormContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx("form", { className: cn("space-y-4 min-w-80", className), onSubmit: handleSubmit, children }) }) });
}
function FormField({
  name,
  label,
  required,
  className,
  children
}) {
  const context = useFormContext();
  const error = context.errors[name];
  const isTouched = context.touched.has(name);
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-1.5", className), children: [
    label && /* @__PURE__ */ jsxs("label", { className: "text-sm font-medium text-foreground-50", children: [
      label,
      " ",
      required && /* @__PURE__ */ jsx("span", { className: "text-red-600", children: "*" })
    ] }),
    /* @__PURE__ */ jsx("div", { children: children(context) }),
    error && isTouched && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: error })
  ] });
}
export {
  Form,
  FormField,
  useFormContext
};
