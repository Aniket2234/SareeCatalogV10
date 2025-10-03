import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error('MONGODB_URI environment variable is required');
}

const sampleProducts = [
  {
    name: "White Gadhwal Pure Soft Silk Saree",
    category: "new-trends",
    price: 1695,
    originalPrice: 2445,
    discountPercentage: 30,
    material: "Silk Blend",
    description: "Elegant white Gadhwal saree with intricate border work",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1617382761039-b8e4c3061e77?w=800",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800"
    ],
    colors: ["White", "Gold"],
    inStock: true,
    collectionType: "new-arrival",
    rating: 4.5,
    reviewCount: 11,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Black Soft Chanderi Pochampally Ikkat Saree",
    category: "banarasi-silk",
    price: 1350,
    originalPrice: 2395,
    discountPercentage: 43,
    material: "Silk",
    description: "Traditional black Chanderi with Pochampally patterns",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1612967771958-b821a335f5a7?w=800",
      "https://images.unsplash.com/photo-1617382761039-b8e4c3061e77?w=800",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800"
    ],
    colors: ["Black", "Silver"],
    inStock: true,
    collectionType: "new-arrival",
    rating: 4,
    reviewCount: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "White Pochampally Ikkat Saree",
    category: "new-trends",
    price: 1450,
    originalPrice: 2845,
    discountPercentage: 49,
    material: "Silk Blend",
    description: "Beautiful white Pochampally saree with traditional motifs",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800",
      "https://images.unsplash.com/photo-1617382761039-b8e4c3061e77?w=800"
    ],
    colors: ["White", "Pink"],
    inStock: true,
    collectionType: "new-arrival",
    rating: 5,
    reviewCount: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Multicolor Geometric Kanjivaram Silk Saree",
    category: "printed-silk",
    price: 1450,
    originalPrice: 2895,
    discountPercentage: 50,
    material: "Silk",
    description: "Vibrant multicolor Kanjivaram with geometric patterns",
    images: [
      "https://images.unsplash.com/photo-1612967771958-b821a335f5a7?w=800",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1617382761039-b8e4c3061e77?w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800"
    ],
    colors: ["Multicolor"],
    inStock: true,
    collectionType: "new-arrival",
    rating: 4.5,
    reviewCount: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Pink Banarasi Silk Gadhwal Pattu Saree",
    category: "banarasi-silk",
    price: 1199,
    originalPrice: 2945,
    discountPercentage: 59,
    material: "Silk",
    description: "Elegant pink Banarasi silk with traditional Gadhwal work",
    images: [
      "https://images.unsplash.com/photo-1617382761039-b8e4c3061e77?w=800",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800",
      "https://images.unsplash.com/photo-1612967771958-b821a335f5a7?w=800"
    ],
    colors: ["Pink", "Gold"],
    inStock: true,
    collectionType: "trending",
    rating: 4.5,
    reviewCount: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Vibrant Yellow Ethnic Motifs Banarasi Silk Saree",
    category: "banarasi-silk",
    price: 1150,
    originalPrice: 2895,
    discountPercentage: 60,
    material: "Silk",
    description: "Stunning yellow Banarasi with ethnic motifs",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800",
      "https://images.unsplash.com/photo-1617382761039-b8e4c3061e77?w=800",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800",
      "https://images.unsplash.com/photo-1612967771958-b821a335f5a7?w=800"
    ],
    colors: ["Yellow", "Gold"],
    inStock: true,
    collectionType: "trending",
    rating: 4,
    reviewCount: 18,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Mustard Poly Chiffon Diamond Swaroski Saree",
    category: "georgette",
    price: 1050,
    originalPrice: 2945,
    discountPercentage: 64,
    material: "Poly Chiffon",
    description: "Modern mustard saree with diamond Swarovski work",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800",
      "https://images.unsplash.com/photo-1617382761039-b8e4c3061e77?w=800",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1612967771958-b821a335f5a7?w=800"
    ],
    colors: ["Mustard", "Gold"],
    inStock: true,
    collectionType: "trending",
    rating: 5,
    reviewCount: 25,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Eyecatchear Gadhwal Pure Soft Silk Festive Saree",
    category: "banarasi-silk",
    price: 1695,
    originalPrice: 2948,
    discountPercentage: 42,
    material: "Silk",
    description: "Eye-catching Gadhwal saree perfect for festivities",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1617382761039-b8e4c3061e77?w=800",
      "https://images.unsplash.com/photo-1612967771958-b821a335f5a7?w=800"
    ],
    colors: ["Blue", "Gold"],
    inStock: true,
    collectionType: "trending",
    rating: 4.5,
    reviewCount: 22,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Yellow Dharmasavaram Chanderi Saree",
    category: "printed-silk",
    price: 1695,
    originalPrice: 2645,
    discountPercentage: 36,
    material: "Silk",
    description: "Vibrant yellow Dharmasavaram with Chanderi elegance",
    images: [
      "https://images.unsplash.com/photo-1612967771958-b821a335f5a7?w=800",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1617382761039-b8e4c3061e77?w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800"
    ],
    colors: ["Yellow", "Gold"],
    inStock: true,
    collectionType: "trending",
    rating: 4,
    reviewCount: 16,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Light Green Colour Pure Viscose Dola Silk Saree",
    category: "satin",
    price: 1850,
    originalPrice: 2995,
    discountPercentage: 38,
    material: "Viscose Silk",
    description: "Delicate light green viscose saree with premium finish",
    images: [
      "https://images.unsplash.com/photo-1617382761039-b8e4c3061e77?w=800",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1612967771958-b821a335f5a7?w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800"
    ],
    colors: ["Light Green"],
    inStock: true,
    collectionType: "exclusive",
    rating: 5,
    reviewCount: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Blue Graceful Bandhej Silk Saree",
    category: "banarasi-silk",
    price: 1850,
    originalPrice: 2945,
    discountPercentage: 37,
    material: "Silk",
    description: "Graceful blue Bandhej silk with traditional artistry",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1617382761039-b8e4c3061e77?w=800",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800",
      "https://images.unsplash.com/photo-1612967771958-b821a335f5a7?w=800"
    ],
    colors: ["Blue", "White"],
    inStock: true,
    collectionType: "exclusive",
    rating: 4.5,
    reviewCount: 28,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Patchwork Grace Viscose Dola Silk Saree",
    category: "printed-silk",
    price: 1850,
    originalPrice: 2895,
    discountPercentage: 36,
    material: "Viscose Silk",
    description: "Artistic patchwork design on premium viscose silk",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1617382761039-b8e4c3061e77?w=800",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800"
    ],
    colors: ["Multicolor"],
    inStock: true,
    collectionType: "exclusive",
    rating: 5,
    reviewCount: 32,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Black Graceful Bandhej Silk Saree",
    category: "banarasi-silk",
    price: 1850,
    originalPrice: 2895,
    discountPercentage: 36,
    material: "Silk",
    description: "Elegant black Bandhej with graceful patterns",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800",
      "https://images.unsplash.com/photo-1612967771958-b821a335f5a7?w=800",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
      "https://images.unsplash.com/photo-1617382761039-b8e4c3061e77?w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800"
    ],
    colors: ["Black", "Gold"],
    inStock: true,
    collectionType: "exclusive",
    rating: 4.5,
    reviewCount: 26,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Pista Hand Kalamkari Kanjivaram Silk Saree",
    category: "printed-silk",
    price: 1850,
    originalPrice: 2995,
    discountPercentage: 38,
    material: "Kanjivaram Silk",
    description: "Hand-painted Kalamkari on Kanjivaram silk",
    images: [
      "https://images.unsplash.com/photo-1612967771958-b821a335f5a7?w=800",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800",
      "https://images.unsplash.com/photo-1617382761039-b8e4c3061e77?w=800"
    ],
    colors: ["Pista Green"],
    inStock: true,
    collectionType: "exclusive",
    rating: 5,
    reviewCount: 35,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedProducts() {
  const client = new MongoClient(mongoUri!);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB for seeding');
    
    const db = client.db('saree_catalog');
    const productsCollection = db.collection('products');
    
    const count = await productsCollection.countDocuments();
    
    if (count === 0) {
      await productsCollection.insertMany(sampleProducts);
      console.log(`Successfully inserted ${sampleProducts.length} sample products`);
    } else {
      await productsCollection.deleteMany({});
      await productsCollection.insertMany(sampleProducts);
      console.log(`Replaced existing products with ${sampleProducts.length} sample products`);
    }
    
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedProducts();
