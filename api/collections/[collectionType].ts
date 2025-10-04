import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getStorage } from '../_lib/storage.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  console.log('[API /collections] Request received');
  
  if (req.method !== 'GET') {
    console.log('[API /collections] Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { collectionType } = req.query;
    const limit = req.query.limit ? Number(req.query.limit) : 6;
    
    console.log('[API /collections] Query params:', { collectionType, limit });
    
    if (!collectionType || typeof collectionType !== 'string') {
      console.log('[API /collections] Invalid collection type');
      return res.status(400).json({ error: 'Invalid collection type' });
    }

    const storage = await getStorage();
    const products = await storage.getProductsByCollection(collectionType, limit);
    console.log('[API /collections] Returning', products.length, 'products for', collectionType);
    return res.status(200).json(products);
  } catch (error) {
    console.error('[API /collections] Error:', error);
    return res.status(500).json({ error: 'Failed to fetch collection products' });
  }
}
