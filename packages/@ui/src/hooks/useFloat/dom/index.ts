import {computePosition as computePositionCore} from '../core';
import {platform} from './platform';
import type {
  ComputePositionConfig,
  FloatingElement,
  ReferenceElement,
} from './types';

export const computePosition = (
  reference: ReferenceElement,
  floating: FloatingElement,
  options?: Partial<ComputePositionConfig>,
) => {
  const cache = new Map<ReferenceElement, Array<Element>>();
  const mergedOptions = {platform, ...options};
  const platformWithCache = {...mergedOptions.platform, _c: cache};
  return computePositionCore(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache,
  });
};

export { autoUpdate } from './autoUpdate';
export type { AutoUpdateOptions } from './autoUpdate';

export { platform } from './platform';
export type { Platform } from './types';

export {
  detectOverflow,
  offset,
  autoPlacement,
  shift,
  flip,
  size,
  hide,
  arrow,
  inline,
  limitShift,
} from './middleware';

export type {
  Derivable,
  OffsetValue,
  OffsetOptions,
  NodeScroll,
  Boundary,
  DetectOverflowOptions,
  ComputePositionConfig,
  VirtualElement,
  ReferenceElement,
  FloatingElement,
  Elements,
  MiddlewareState,
  MiddlewareArguments,
  Middleware,
  SizeOptions,
  ArrowOptions,
  AutoPlacementOptions,
  ShiftOptions,
  FlipOptions,
  HideOptions,
} from './types';

export type { ComputePositionReturn } from '../core';
