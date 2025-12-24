/**
 * Component Templates
 * Provides boilerplate patterns for wrapping generated code
 */

/**
 * Wrap component code in a simple functional component
 */
export function wrapInFunctionalComponent(componentCode: string, componentName: string = 'Component'): string {
  return `export function ${componentName}() {
  return (
    ${componentCode}
  );
}`;
}

/**
 * Wrap component code with props
 */
export function wrapInFunctionalComponentWithProps(
  componentCode: string,
  propNames: string[] = [],
  componentName: string = 'Component'
): string {
  const propsInterface = propNames.length > 0 ? `{${propNames.join(', ')}}` : '{}';

  return `interface ${componentName}Props ${propsInterface} {}

export function ${componentName}(props: ${componentName}Props) {
  return (
    ${componentCode}
  );
}`;
}

/**
 * Wrap in a demo component
 */
export function wrapInDemo(componentCode: string): string {
  return `export function Demo() {
  return (
    <div className="p-8 space-y-6">
      ${componentCode}
    </div>
  );
}`;
}

/**
 * Create a complete file with imports, component, and export
 */
export function createCompleteFile(
  imports: string[],
  componentCode: string,
  isDemo: boolean = false
): string {
  const importSection = imports.length > 0 ? imports.join('\n') + '\n\n' : '';

  let code = importSection;

  if (isDemo) {
    code += wrapInDemo(componentCode);
  } else {
    code += componentCode;
  }

  return code;
}

/**
 * Create a Storybook story file
 */
export function createStorybookStory(
  componentName: string,
  componentCode: string,
  importStatement: string
): string {
  return `import type { Meta, StoryObj } from '@storybook/react';
${importStatement}

const meta = {
  title: 'Components/${componentName}',
  component: ${componentName},
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    ${componentCode}
  ),
};`;
}

/**
 * Create a test file template
 */
export function createTestTemplate(
  componentName: string,
  _importStatement: string
): string {
  return `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName} />);
    // Add your assertions here
  });
});`;
}
