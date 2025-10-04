import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getStorage } from '../_lib/storage';
import { productSearchSchema } from '../../shared/schema';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const searchParams = productSearchSchema.parse({
      search: req.query.search as string,
      category: req.query.category as string,
      priceMin: req.query.priceMin ? Number(req.query.priceMin) : undefined,
      priceMax: req.query.priceMax ? Number(req.query.priceMax) : undefined,
      material: req.query.material as string,
      collectionType: req.query.collectionType as string,
    });

    const storage = await getStorage();
    const products = await storage.getProducts(searchParams);
    return res.status(200).json(products);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid query parameters' });
    }
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
}
