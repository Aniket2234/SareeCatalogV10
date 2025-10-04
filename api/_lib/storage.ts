import { Db, Collection, ObjectId } from "mongodb";
import { getDb } from "./mongodb.js";
import {
  type Category,
  type Product,
  type InsertCategory,
  type InsertProduct,
  type ProductSearch,
} from "../../shared/schema.js";

export class MongoStorage {
  private db: Db;
  private categoriesCollection: Collection<Category>;
  private productsCollection: Collection<Product>;

  constructor(db: Db) {
    this.db = db;
    this.categoriesCollection = this.db.collection<Category>("categories");
    this.productsCollection = this.db.collection<Product>("products");
  }

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoriesCollection.find({}).toArray();
    return categories.map((cat) => ({ ...cat, _id: cat._id?.toString() }));
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const category = await this.categoriesCollection.findOne({ slug });
    return category ? { ...category, _id: category._id?.toString() } : null;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const now = new Date();
    const newCategory = {
      ...category,
      createdAt: now,
      updatedAt: now,
    };

    const result = await this.categoriesCollection.insertOne(
      newCategory as any,
    );
    return {
      ...newCategory,
      _id: result.insertedId.toString(),
    };
  }

  async getProducts(search?: ProductSearch): Promise<Product[]> {
    let filter: any = {};

    if (search) {
      if (search.search) {
        filter.$or = [
          { name: { $regex: search.search, $options: "i" } },
          { description: { $regex: search.search, $options: "i" } },
        ];
      }

      if (search.category && search.category !== "all") {
        filter.category = search.category;
      }

      if (search.material) {
        filter.material = search.material;
      }

      if (search.collectionType) {
        filter.collectionType = search.collectionType;
      }

      if (search.priceMin !== undefined || search.priceMax !== undefined) {
        filter.price = {};
        if (search.priceMin !== undefined) {
          filter.price.$gte = search.priceMin;
        }
        if (search.priceMax !== undefined) {
          filter.price.$lte = search.priceMax;
        }
      }
    }

    const products = await this.productsCollection.find(filter).toArray();
    return products.map((product) => ({
      ...product,
      _id: product._id?.toString(),
    }));
  }

  async getProductsByCollection(
    collectionType: string,
    limit: number = 6,
  ): Promise<Product[]> {
    const products = await this.productsCollection
      .find({ collectionType: collectionType as any })
      .limit(limit)
      .toArray();
    return products.map((product) => ({
      ...product,
      _id: product._id?.toString(),
    }));
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await this.productsCollection.findOne({
      _id: new ObjectId(id),
    } as any);
    return product ? { ...product, _id: product._id?.toString() } : null;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const products = await this.productsCollection.find({ category }).toArray();
    return products.map((product) => ({
      ...product,
      _id: product._id?.toString(),
    }));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const now = new Date();
    const newProduct = {
      ...product,
      createdAt: now,
      updatedAt: now,
    };

    const result = await this.productsCollection.insertOne(newProduct as any);
    return {
      ...newProduct,
      _id: result.insertedId.toString(),
    };
  }

  async searchProducts(query: string): Promise<Product[]> {
    const products = await this.productsCollection
      .find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { material: { $regex: query, $options: "i" } },
        ],
      })
      .toArray();

    return products.map((product) => ({
      ...product,
      _id: product._id?.toString(),
    }));
  }
}

export async function getStorage(): Promise<MongoStorage> {
  const db = await getDb();
  return new MongoStorage(db);
}
