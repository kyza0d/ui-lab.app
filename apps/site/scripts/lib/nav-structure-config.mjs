export const NAV_STRUCTURE = {
  'docs': {
    subNav: {
      'installation': ['Getting Started'],
      'customization-theming': ['Customization'],
      'agents-mcps-installation': ['Agents & MCPs'],
      'agents-mcps-workflows': ['Agents & MCPs'],
    },
  },
  'agents-mcps': {
    subNav: {
      'agents-mcps-introduction': ['Getting Started'],
      'agents-mcps-workflows': ['Building Workflows'],
      'agents-mcps-references': ['Reference', 'Technical Reference'],
    },
  },
};

export function getNavSectionMappings(domain) {
  return NAV_STRUCTURE[domain]?.subNav || null;
}
