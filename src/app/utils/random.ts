import { v4 } from 'uuid';

export const generateId = (prefix = '') => {
  return prefix + v4().split('-')[0];
};
