import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getStorage } from '../../_lib/storage.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category } = req.query;
    
    if (!category || typeof category !== 'string') {
      return res.status(400).json({ error: 'Invalid category parameter' });
    }

    const storage = await getStorage();
    const products = await storage.getProductsByCategory(category);
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return res.status(500).json({ error: 'Failed to fetch products by category' });
  }
}
