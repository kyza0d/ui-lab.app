export { computePosition } from './computePosition';
export type { ComputePosition, ComputePositionConfig, ComputePositionReturn } from './types';

export { computeCoordsFromPlacement } from './computeCoordsFromPlacement';

export { detectOverflow } from './detectOverflow';
export type { DetectOverflowOptions } from './detectOverflow';

export type {
  Derivable,
  Platform,
  MiddlewareData,
  MiddlewareState,
  MiddlewareReturn,
  Middleware,
  Elements,
  ReferenceElement,
  FloatingElement,
  Boundary,
  RootBoundary,
  ElementContext,
} from './types';

// Re-export utility types and functions from utils for DOM layer
export type {
  Coords,
  Dimensions,
  Rect,
  Strategy,
  Axis,
  Side,
  Placement,
  Alignment,
  AlignedPlacement,
  Length,
  SideObject,
  Padding,
  ClientRectObject,
  ElementRects,
  VirtualElement,
} from '../../../utils';

export { rectToClientRect, createCoords } from '../../../utils';

export { originSides } from './constants';

// Middleware exports
export { offset, convertValueToCoords } from './middleware/offset';
export type { OffsetOptions } from './middleware/offset';

export { flip } from './middleware/flip';
export type { FlipOptions } from './middleware/flip';

export { shift, limitShift } from './middleware/shift';
export type { ShiftOptions, LimitShiftOptions } from './middleware/shift';

export { arrow } from './middleware/arrow';
export type { ArrowOptions } from './middleware/arrow';

export { autoPlacement, getPlacementList } from './middleware/autoPlacement';
export type { AutoPlacementOptions } from './middleware/autoPlacement';

export { hide } from './middleware/hide';
export type { HideOptions } from './middleware/hide';

export { inline, getRectsByLine } from './middleware/inline';
export type { InlineOptions } from './middleware/inline';

export { size } from './middleware/size';
export type { SizeOptions } from './middleware/size';
