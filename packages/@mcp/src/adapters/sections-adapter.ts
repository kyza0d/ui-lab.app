import { getSectionById, searchSections, getAllSections } from 'ui-lab-registry';

export const sectionsAdapter = {
  getById: (id: string) => {
    try {
      return getSectionById(id) ?? null;
    } catch {
      return null;
    }
  },
  search: (query: string, limit = 10) => {
    try {
      return searchSections(query).slice(0, limit);
    } catch {
      return [];
    }
  },
  getAll: () => {
    try {
      return getAllSections();
    } catch {
      return [];
    }
  },
};
