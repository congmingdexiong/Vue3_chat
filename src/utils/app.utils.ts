import type { Conversation, FormattedData } from '@/domain/Conversation';
import { v4 as uuidv4 } from 'uuid';

export function formatDataByDate(items: Conversation[]): FormattedData[] {
  const now = new Date();
  const today = now.setHours(0, 0, 0, 0);
  const yesterday = new Date(today).setDate(new Date(today).getDate() - 1);
  const sevenDaysAgo = new Date(today).setDate(new Date(today).getDate() - 7);
  const thirtyDaysAgo = new Date(today).setDate(new Date(today).getDate() - 30);

  const categories: { [key: string]: Conversation[] } = {
    Today: [],
    Yesterday: [],
    'Previous 7 days': [],
    'Previous 30 days': []
  };

  items.forEach(item => {
    const createdDate = new Date(item.createdTime).setHours(0, 0, 0, 0);
    if (createdDate >= today) {
      categories['Today'].push(item);
    } else if (createdDate >= yesterday) {
      categories['Yesterday'].push(item);
    } else if (createdDate >= sevenDaysAgo) {
      categories['Previous 7 days'].push(item);
    } else if (createdDate >= thirtyDaysAgo) {
      categories['Previous 30 days'].push(item);
    }
  });

  return Object.entries(categories)
    .map(([date, content]) => ({ date, content }))
    .filter(entry => entry.content.length > 0);
}

export const genderateUUID = () => {
  const uuid = uuidv4();
  return uuid;
};
