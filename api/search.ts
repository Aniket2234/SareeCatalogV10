import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getStorage } from './_lib/storage.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const storage = await getStorage();
    const products = await storage.searchProducts(q);
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    return res.status(500).json({ error: 'Failed to search products' });
  }
}
