import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getStorage } from '../_lib/storage.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { slug } = req.query;
    
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Invalid slug parameter' });
    }

    const storage = await getStorage();
    const category = await storage.getCategoryBySlug(slug);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    return res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return res.status(500).json({ error: 'Failed to fetch category' });
  }
}
