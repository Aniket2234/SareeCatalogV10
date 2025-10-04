import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getStorage } from '../_lib/storage';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { collectionType } = req.query;
    const limit = req.query.limit ? Number(req.query.limit) : 6;
    
    if (!collectionType || typeof collectionType !== 'string') {
      return res.status(400).json({ error: 'Invalid collection type' });
    }

    const storage = await getStorage();
    const products = await storage.getProductsByCollection(collectionType, limit);
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching collection products:', error);
    return res.status(500).json({ error: 'Failed to fetch collection products' });
  }
}
