/**
 * Starters Adapter
 * Provides access to framework starters from the registry
 * Starters contain setup instructions and file templates for new projects
 */

import { getStarterById, getAllStarters, searchStarters } from 'ui-lab-registry';

export const startersAdapter = {
  getById: (id: string) => {
    try {
      return getStarterById(id) ?? null;
    } catch {
      return null;
    }
  },
  search: (query: string, limit = 10) => {
    try {
      return searchStarters(query).slice(0, limit);
    } catch {
      return [];
    }
  },
  getAll: () => {
    try {
      return getAllStarters();
    } catch {
      return [];
    }
  },
};
