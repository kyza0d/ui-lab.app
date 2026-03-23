export { computePosition } from './computePosition';


export type { DetectOverflowOptions } from './detectOverflow';

export type {
  MiddlewareState,
  MiddlewareReturn,
  Middleware,
  Elements,
  Boundary,
  RootBoundary,
  ComputePositionReturn,
  ComputePositionConfig,
} from './types';

// Re-export utility types and functions from utils for DOM layer
export type {
  Coords,
  Dimensions,
  Rect,
  Strategy,
  ClientRectObject,
  ElementRects,
} from '../../../utils';

export { rectToClientRect } from '../../../utils';


// Middleware exports

export type { FlipOptions } from './middleware/flip';

export type { ShiftOptions } from './middleware/shift';

export type { ArrowOptions } from './middleware/arrow';

export type { AutoPlacementOptions } from './middleware/autoPlacement';

export type { HideOptions } from './middleware/hide';


export type { SizeOptions } from './middleware/size';
