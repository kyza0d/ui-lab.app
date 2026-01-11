import { dispatch, ToastProps } from "./Toast.Store";

type ToastOptions = Omit<ToastProps, 'id' | 'open'>;

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return `t-${Date.now().toString(36)}-${count}`;
}

const toast = (options: ToastOptions) => {
  const id = genId();
  dispatch({ type: 'ADD_TOAST', toast: { ...options, id } });

  return {
    id,
    dismiss: () => dispatch({ type: 'DISMISS_TOAST', toastId: id }),
    update: (props: Partial<ToastProps>) =>
      dispatch({ type: 'UPDATE_TOAST', toast: { ...props, id } }),
  };
};

export { toast };
