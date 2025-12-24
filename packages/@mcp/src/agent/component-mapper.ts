/**
 * Component Mapper
 * Maps existing components to UI Lab component alternatives based on similarity and functionality
 */

import { registryAdapter } from '../adapters/registry-adapter.js';
import type { ComponentMetadata } from 'ui-lab-registry';
import type { IdentifiedComponent } from './file-analyzer.js';

export interface ComponentMapping {
  existing: IdentifiedComponent;
  uiLabComponent: ComponentMetadata;
  confidence: number; // 0-1
  reason: string;
  requiredProps: Record<string, unknown>;
  propsMapping: Record<string, string>; // existing prop -> UI Lab prop
  notes: string[];
}

export interface MappingResult {
  mappings: ComponentMapping[];
  unmappedComponents: IdentifiedComponent[];
  summary: {
    totalMapped: number;
    totalUnmapped: number;
    averageConfidence: number;
  };
}

/**
 * Component Mapper class
 */
export class ComponentMapper {
  private readonly nativeToUILabMap: Record<string, string> = {
    // Button
    button: 'button',
    // Input
    input: 'input',
    textarea: 'text-area',
    select: 'select',
    // Layout
    div: 'flex', // Default to Flex for generic div
    section: 'flex',
    article: 'flex',
    // Navigation
    nav: 'navigation',
    ul: 'flex',
    ol: 'flex',
    // Card
    card: 'card',
    // Label
    label: 'label',
    // Form
    form: 'form',
    // Grid
    grid: 'grid',
  };

  private readonly customComponentPatterns: Array<{
    pattern: RegExp | string;
    uiLabComponent: string;
    confidence: number;
  }> = [
    {
      pattern: /button/i,
      uiLabComponent: 'button',
      confidence: 0.9,
    },
    {
      pattern: /input/i,
      uiLabComponent: 'input',
      confidence: 0.9,
    },
    {
      pattern: /card/i,
      uiLabComponent: 'card',
      confidence: 0.85,
    },
    {
      pattern: /modal|dialog|popup/i,
      uiLabComponent: 'dialog',
      confidence: 0.8,
    },
    {
      pattern: /menu|nav/i,
      uiLabComponent: 'menu',
      confidence: 0.75,
    },
    {
      pattern: /tab/i,
      uiLabComponent: 'tabs',
      confidence: 0.85,
    },
    {
      pattern: /badge|tag|chip/i,
      uiLabComponent: 'badge',
      confidence: 0.8,
    },
    {
      pattern: /form/i,
      uiLabComponent: 'form',
      confidence: 0.75,
    },
    {
      pattern: /tooltip|hover/i,
      uiLabComponent: 'tooltip',
      confidence: 0.7,
    },
    {
      pattern: /popover|dropdown/i,
      uiLabComponent: 'popover',
      confidence: 0.7,
    },
    {
      pattern: /progress|loader|spinner/i,
      uiLabComponent: 'progress',
      confidence: 0.65,
    },
  ];

  /**
   * Map a single identified component to UI Lab alternative
   */
  mapComponent(identified: IdentifiedComponent): ComponentMapping[] {
    const mappings: ComponentMapping[] = [];

    if (identified.type === 'native') {
      // Map native HTML elements
      const uiLabComponentId = this.nativeToUILabMap[identified.name.toLowerCase()];
      if (uiLabComponentId) {
        const uiLabComponent = registryAdapter.getComponentById(uiLabComponentId);
        if (uiLabComponent) {
          mappings.push({
            existing: identified,
            uiLabComponent,
            confidence: 0.95,
            reason: `Native ${identified.name} element maps directly to UI Lab ${uiLabComponent.name}`,
            requiredProps: this.mapProps(identified, uiLabComponent),
            propsMapping: this.buildPropsMapping(identified.name, uiLabComponent),
            notes: [],
          });
        }
      }
    } else if (identified.type === 'custom') {
      // Try pattern matching for custom components
      const candidates = this.findComponentCandidates(identified.name);
      for (const candidate of candidates) {
        const uiLabComponent = registryAdapter.getComponentById(candidate.id);
        if (uiLabComponent) {
          mappings.push({
            existing: identified,
            uiLabComponent,
            confidence: candidate.confidence,
            reason: candidate.reason,
            requiredProps: this.mapProps(identified, uiLabComponent),
            propsMapping: this.buildPropsMapping(identified.name, uiLabComponent),
            notes: this.generateNotes(identified, uiLabComponent),
          });
        }
      }
    }

    // Sort by confidence (highest first)
    return mappings.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Find candidate UI Lab components for a custom component
   */
  private findComponentCandidates(componentName: string): Array<{
    id: string;
    confidence: number;
    reason: string;
  }> {
    const candidates: Array<{ id: string; confidence: number; reason: string }> = [];

    for (const patternEntry of this.customComponentPatterns) {
      const pattern = typeof patternEntry.pattern === 'string'
        ? new RegExp(patternEntry.pattern, 'i')
        : patternEntry.pattern;

      if (pattern.test(componentName)) {
        const allComponents = registryAdapter.getAllComponentIds();
        const matches = allComponents.filter(id => id.toLowerCase() === patternEntry.uiLabComponent.toLowerCase());

        if (matches.length > 0) {
          candidates.push({
            id: matches[0],
            confidence: patternEntry.confidence,
            reason: `Component name "${componentName}" matches pattern for ${patternEntry.uiLabComponent}`,
          });
        }
      }
    }

    return candidates;
  }

  /**
   * Map props from existing component to UI Lab component
   */
  private mapProps(identified: IdentifiedComponent, uiLabComponent: ComponentMetadata): Record<string, unknown> {
    const mapped: Record<string, unknown> = {};
    const propMapping = this.buildPropsMapping(identified.name, uiLabComponent);

    for (const [existingProp, existingValue] of Object.entries(identified.props)) {
      const uiLabProp = propMapping[existingProp];
      if (uiLabProp) {
        mapped[uiLabProp] = existingValue;
      }
    }

    return mapped;
  }

  /**
   * Build a mapping of existing props to UI Lab props
   */
  private buildPropsMapping(_existingComponentName: string, uiLabComponent: ComponentMetadata): Record<string, string> {
    const mapping: Record<string, string> = {};

    // Common prop mappings
    const commonMappings: Record<string, string> = {
      disabled: 'isDisabled',
      className: 'className',
      style: 'style',
      onClick: 'onPress',
      onChange: 'onChange',
      onBlur: 'onBlur',
      onFocus: 'onFocus',
      type: 'type',
      value: 'value',
      placeholder: 'placeholder',
      name: 'name',
      variant: 'variant',
      size: 'size',
      color: 'color',
      children: 'children',
    };

    // Apply common mappings
    for (const [existing, uiLab] of Object.entries(commonMappings)) {
      mapping[existing] = uiLab;
    }

    // Add specific mappings based on component API
    if (uiLabComponent.api?.props) {
      for (const prop of uiLabComponent.api.props) {
        // Try to find similar props
        if (prop.name === 'isDisabled' && !mapping.disabled) {
          mapping.disabled = 'isDisabled';
        }
      }
    }

    return mapping;
  }

  /**
   * Generate notes about the mapping
   */
  private generateNotes(identified: IdentifiedComponent, _uiLabComponent: ComponentMetadata): string[] {
    const notes: string[] = [];

    // Check for potential issues
    if (identified.styling?.className?.includes('tailwind')) {
      notes.push('Original component uses Tailwind classes - consider using UI Lab design tokens instead');
    }

    if (identified.type === 'custom' && identified.props.children) {
      notes.push('Component has custom children - verify UI Lab component supports slot composition');
    }

    if (Object.keys(identified.props).length > 5) {
      notes.push('Original component has many props - ensure all are compatible with UI Lab component');
    }

    return notes;
  }

  /**
   * Map all components from a file analysis
   */
  mapComponents(components: IdentifiedComponent[]): MappingResult {
    const mappings: ComponentMapping[] = [];
    const mappedComponentNames = new Set<string>();
    const confidenceScores: number[] = [];

    for (const component of components) {
      const componentMappings = this.mapComponent(component);
      if (componentMappings.length > 0) {
        mappings.push(componentMappings[0]); // Take the best match
        mappedComponentNames.add(component.name);
        confidenceScores.push(componentMappings[0].confidence);
      }
    }

    const unmappedComponents = components.filter(c => !mappedComponentNames.has(c.name));

    return {
      mappings,
      unmappedComponents,
      summary: {
        totalMapped: mappings.length,
        totalUnmapped: unmappedComponents.length,
        averageConfidence: confidenceScores.length > 0
          ? confidenceScores.reduce((a, b) => a + b, 0) / confidenceScores.length
          : 0,
      },
    };
  }

  /**
   * Static method for convenience
   */
  static mapComponent(identified: IdentifiedComponent): ComponentMapping[] {
    return new ComponentMapper().mapComponent(identified);
  }

  static mapComponents(components: IdentifiedComponent[]): MappingResult {
    return new ComponentMapper().mapComponents(components);
  }
}

export default ComponentMapper;
