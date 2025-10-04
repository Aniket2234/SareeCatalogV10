import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getStorage } from '../_lib/storage.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log('[API /categories] Request received');
  
  if (req.method !== 'GET') {
    console.log('[API /categories] Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const storage = await getStorage();
    const categories = await storage.getCategories();
    console.log('[API /categories] Returning', categories.length, 'categories');
    return res.status(200).json(categories);
  } catch (error) {
    console.error('[API /categories] Error:', error);
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
