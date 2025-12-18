export const NAV_STRUCTURE = {
  'agents-mcps': {
    subNav: {
      'agents-mcps-introduction': ['Getting Started'],
      'agents-mcps-workflows': ['Building Workflows'],
      'agents-mcps-references': ['Reference', 'Technical Reference'],
    },
  },
  cli: {
    subNav: {
      'cli-getting-started': ['Getting Started'],
      'cli-advanced': ['Advanced'],
    },
  },
};

export function getNavSectionMappings(domain) {
  return NAV_STRUCTURE[domain]?.subNav || null;
}
