import {
  getPatternById,
  searchPatterns,
  getAllPatterns,
} from 'ui-lab-registry';

export const patternsAdapter = {
  getById: (id: string) => {
    try {
      return getPatternById(id) ?? null;
    } catch {
      return null;
    }
  },
  search: (query: string, limit = 10) => {
    try {
      return searchPatterns(query).slice(0, limit);
    } catch {
      return [];
    }
  },
  getAll: () => {
    try {
      return getAllPatterns();
    } catch {
      return [];
    }
  },
};
