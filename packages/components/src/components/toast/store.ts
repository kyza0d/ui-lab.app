// toast/store.ts
import React from 'react';

export type ToastVariant = 'default' | 'destructive' | 'success' | 'info' | 'warning';
export type ToastPosition = 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';
export type ToastSpawnDirection = 'top' | 'bottom';

export interface ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  jsx?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number; // ms or Infinity
  open?: boolean;
  onDismiss?: () => void;
  position?: ToastPosition;
  action?: React.ReactNode;
  spawnDirection?: ToastSpawnDirection;

  // Internal — set on ADD_TOAST, never changes
  createdAt?: number;
  _pausedAt?: number;
  _remaining?: number;
  _isExpanded?: boolean;
}

type ToastAction =
  | { type: 'ADD_TOAST'; toast: ToastProps }
  | { type: 'UPDATE_TOAST'; toast: Partial<ToastProps> & { id: string } }
  | { type: 'CLOSE_TOAST'; toastId: string }
  | { type: 'DISMISS_TOAST'; toastId: string }
  | { type: 'PAUSE_TOAST'; toastId: string }
  | { type: 'RESUME_TOAST'; toastId: string; remaining: number }
  | { type: 'SET_ACTIVE_TOAST'; toastId: string | null };

interface State {
  toasts: ToastProps[];
  activeToastId: string | null;
  isFocusMode: boolean;
}

let memoryState: State = { toasts: [], activeToastId: null, isFocusMode: false };
const listeners = new Set<(state: State) => void>();

const broadcast = () => {
  listeners.forEach((listener) => listener(memoryState));
};

const reducer = (state: State, action: ToastAction): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [{ ...action.toast, createdAt: action.toast.createdAt || Date.now() }, ...state.toasts].slice(0, 50),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case 'CLOSE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId ? { ...t, open: false } : t
        ),
      };

    case 'DISMISS_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };

    case 'PAUSE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId
            ? { ...t, _pausedAt: Date.now(), _remaining: t.duration }
            : t
        ),
      };

    case 'RESUME_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId
            ? {
              ...t,
              _remaining: action.remaining,
              _pausedAt: undefined,
            }
            : t
        ),
      };

    case 'SET_ACTIVE_TOAST':
      return {
        ...state,
        activeToastId: action.toastId,
        isFocusMode: action.toastId !== null,
        toasts: state.toasts.map((t) => ({
          ...t,
          _isExpanded: t.id === action.toastId,
        })),
      };

    default:
      return state;
  }
};

export const dispatch = (action: ToastAction) => {
  memoryState = reducer(memoryState, action);
  broadcast();
};

export const useToastStore = () => {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);
  return state;
};
