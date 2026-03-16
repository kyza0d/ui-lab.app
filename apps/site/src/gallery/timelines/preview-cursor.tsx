"use client";

import {
  createContext,
  useContext,
  type CSSProperties,
  type ReactNode,
  type SVGProps,
} from "react";

type CursorPoint = {
  x: number;
  y: number;
};

export type CursorFrame = {
  target: CursorPoint;
  opacity?: number;
  rotate?: number;
  scale?: number;
  hotspot?: CursorPoint;
  transformOrigin?: string;
  motionTransition?: string;
  shapeTransition?: string;
};

export type CursorAppearance = {
  path?: string;
  className?: string;
  fill?: string;
  stroke?: string;
  pointerEvents?: CSSProperties["pointerEvents"];
  hotspot?: CursorPoint;
  transformOrigin?: string;
  motionTransition?: string;
  shapeTransition?: string;
  pathStyle?: CSSProperties;
};

type CursorAppearanceInput<T extends string> =
  | CursorAppearance
  | ((phase: T) => CursorAppearance);

type CursorContextValue = {
  groupStyle: CSSProperties;
  pathProps: SVGProps<SVGPathElement>;
};

const DEFAULT_CURSOR_PATH = "M0 0 L14 14 L9 15 L14 20 L12 22 L7 17 L2 22 Z";
const DEFAULT_MOTION_TRANSITION =
  "transform 0.5s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.25s ease-out";
const DEFAULT_SHAPE_TRANSITION = "transform 0.12s ease-in-out";

const CursorContext = createContext<CursorContextValue | null>(null);

function resolveAppearance<T extends string>(
  appearance: CursorAppearanceInput<T> | undefined,
  phase: T
) {
  if (!appearance) {
    return {};
  }

  return typeof appearance === "function" ? appearance(phase) : appearance;
}

function buildShapeTransform({ rotate, scale,
}: Pick<CursorFrame, "rotate" | "scale">) {
  const transforms: string[] = [];

  if (rotate !== undefined && rotate !== 0) {
    transforms.push(`rotate(${rotate}deg)`);
  }

  if (scale !== undefined && scale !== 1) {
    transforms.push(`scale(${scale})`);
  }

  return transforms.length > 0 ? transforms.join(" ") : undefined;
}

export function CursorProvider<T extends string>({
  phase,
  frames,
  appearance,
  children,
}: {
  phase: T;
  frames: Record<T, CursorFrame>;
  appearance?: CursorAppearanceInput<T>;
  children: ReactNode;
}) {
  const frame = frames[phase];
  const resolvedAppearance = resolveAppearance(appearance, phase);
  const hotspot = frame.hotspot ?? resolvedAppearance.hotspot ?? { x: 0, y: 0 };
  const transformOrigin =
    frame.transformOrigin ?? resolvedAppearance.transformOrigin;
  const shapeTransform = buildShapeTransform(frame);

  const groupStyle: CSSProperties = {
    transform: `translate(${frame.target.x - hotspot.x}px, ${frame.target.y - hotspot.y}px)`,
    opacity: frame.opacity ?? 1,
    transition:
      frame.motionTransition ??
      resolvedAppearance.motionTransition ??
      DEFAULT_MOTION_TRANSITION,
    pointerEvents: resolvedAppearance.pointerEvents ?? "none",
  };

  const pathStyle: CSSProperties = {
    transition:
      frame.shapeTransition ??
      resolvedAppearance.shapeTransition ??
      DEFAULT_SHAPE_TRANSITION,
    ...resolvedAppearance.pathStyle,
  };

  if (shapeTransform) {
    pathStyle.transform = shapeTransform;
  }

  if (transformOrigin) {
    pathStyle.transformOrigin = transformOrigin;
  }

  const pathProps: SVGProps<SVGPathElement> = {
    d: resolvedAppearance.path ?? DEFAULT_CURSOR_PATH,
    className: resolvedAppearance.className,
    fill: resolvedAppearance.fill ?? "currentColor",
    style: pathStyle,
  };

  return (
    <CursorContext.Provider value={{ groupStyle, pathProps }}>
      {children}
    </CursorContext.Provider>
  );
}

export function Cursor({
  pathProps,
  style,
  ...groupProps
}: Omit<SVGProps<SVGGElement>, "children"> & {
  pathProps?: SVGProps<SVGPathElement>;
}) {
  const context = useContext(CursorContext);

  if (!context) {
    throw new Error("Cursor must be used within a CursorProvider.");
  }

  return (
    <g {...groupProps} aria-hidden="true" style={{ ...context.groupStyle, ...style }}>
      <path
        d={pathProps?.d ?? context.pathProps.d}
        className={pathProps?.className ?? context.pathProps.className}
        fill={pathProps?.fill ?? context.pathProps.fill}
        style={{
          ...context.pathProps.style,
          ...pathProps?.style,
        }}
      />
    </g>
  );
}
