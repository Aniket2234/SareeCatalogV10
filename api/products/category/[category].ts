import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getStorage } from '../../_lib/storage.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log('[API /products/category] Request received');
  
  if (req.method !== 'GET') {
    console.log('[API /products/category] Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category } = req.query;
    
    console.log('[API /products/category] Category param:', category);
    
    if (!category || typeof category !== 'string') {
      console.log('[API /products/category] Invalid category parameter');
      return res.status(400).json({ error: 'Invalid category parameter' });
    }

    const storage = await getStorage();
    const products = await storage.getProductsByCategory(category);
    console.log('[API /products/category] Returning', products.length, 'products for category', category);
    return res.status(200).json(products);
  } catch (error) {
    console.error('[API /products/category] Error:', error);
    return res.status(500).json({ error: 'Failed to fetch products by category' });
  }
}
