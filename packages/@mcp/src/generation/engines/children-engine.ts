/**
 * Children Engine
 * Generates proper JSX for different types of children
 *
 * Handles:
 * - Text children: simple text content
 * - Component children: nested component specs
 * - Slot children: named slots
 * - Complex children: mixed array of different child types
 */

import type {
  ChildrenSpecification,
  ComponentGenerationSpec,
} from '../../types/index.js';
import { generateBaseComponentJSX } from './base-component-engine.js';
import { buildPropsString } from './props-engine.js';

/**
 * Generate text children
 */
export function generateTextChildren(content: string): string {
  return content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Generate component children (nested component spec)
 */
export function generateComponentChildren(childSpec: ComponentGenerationSpec): string {
  // Recursively generate the nested component
  const base = generateBaseComponentJSX(childSpec);
  const propsString = buildPropsString(childSpec);

  if (childSpec.children) {
    const childrenContent = generateChildrenContent(childSpec.children);
    return `<${base.componentName}${propsString}>\n    ${childrenContent}\n  </${base.componentName}>`;
  }

  return `<${base.componentName}${propsString} />`;
}

/**
 * Generate slot children
 */
export function generateSlotChildren(slotName: string): string {
  return `{children?.[{${JSON.stringify(slotName)}}]}`;
}

/**
 * Generate complex children (array of mixed types)
 */
export function generateComplexChildren(
  children: ChildrenSpecification[]
): string {
  const items = children
    .map((child) => {
      if (child.type === 'text' && typeof child.content === 'string') {
        return `<div>${generateTextChildren(child.content)}</div>`;
      }

      if (child.type === 'component' && typeof child.content === 'object') {
        return generateComponentChildren(child.content as ComponentGenerationSpec);
      }

      if (child.type === 'slot' && child.slotName) {
        return generateSlotChildren(child.slotName);
      }

      return '';
    })
    .filter((item) => item.length > 0);

  return items.join('\n    ');
}

/**
 * Generate children content based on type
 */
export function generateChildrenContent(
  children: ChildrenSpecification
): string {
  switch (children.type) {
    case 'text':
      if (typeof children.content === 'string') {
        return generateTextChildren(children.content);
      }
      return '';

    case 'component':
      if (typeof children.content === 'object' && children.content !== null) {
        return generateComponentChildren(children.content as ComponentGenerationSpec);
      }
      return '';

    case 'slot':
      if (children.slotName) {
        return generateSlotChildren(children.slotName);
      }
      return '';

    case 'complex':
      if (Array.isArray(children.content)) {
        return generateComplexChildren(children.content as ChildrenSpecification[]);
      }
      return '';

    default:
      return '';
  }
}

/**
 * Determine if a component should be self-closing (no children)
 */
export function shouldBeSelfClosing(spec: ComponentGenerationSpec): boolean {
  // If no children specified
  if (!spec.children) {
    return true;
  }

  // If children spec is empty
  if (spec.children.type === 'text' && !spec.children.content) {
    return true;
  }

  return false;
}

/**
 * Build complete element with children
 */
export function buildElementWithChildren(
  opening: string,
  childrenSpec: ChildrenSpecification | undefined,
  closing: string
): string {
  if (!childrenSpec) {
    // Self-closing
    return opening.replace(' >', ' />');
  }

  const childrenContent = generateChildrenContent(childrenSpec);

  if (!childrenContent) {
    // No actual children content, make self-closing
    return opening.replace(' >', ' />');
  }

  // Has children
  return `${opening}\n    ${childrenContent}\n  ${closing}`;
}
