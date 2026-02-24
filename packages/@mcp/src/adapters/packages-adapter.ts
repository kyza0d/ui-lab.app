import { getElementById, searchElements } from 'ui-lab-registry';

export const packagesAdapter = {
  getById: (id: string) => {
    try {
      return getElementById(id) ?? null;
    } catch {
      return null;
    }
  },
  search: (query: string, limit = 10) => {
    try {
      return searchElements(query).slice(0, limit);
    } catch {
      return [];
    }
  },
};
