import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Header from "@/components/header";
import Carousel from "@/components/carousel";
import CategoryNav from "@/components/category-nav";
import AnimatedBorder from "@/components/animated-border";
import { CollectionSection } from "@/components/collection-section";
import type { Category } from "@shared/schema";

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: categories, isLoading: categoriesLoading } = useQuery<
    Category[]
  >({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      console.log("[Home] Fetching categories from /api/categories");
      try {
        const response = await fetch("/api/categories");
        console.log(`[Home] Categories response - Status: ${response.status}`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error("[Home] Categories fetch failed:", errorText);
          throw new Error(`Failed to fetch categories: ${response.status} ${errorText}`);
        }
        const data = await response.json();
        console.log("[Home] Categories data received:", data);
        console.log(`[Home] Number of categories: ${data?.length || 0}`);
        return data;
      } catch (error) {
        console.error("[Home] Error fetching categories:", error);
        throw error;
      }
    },
  });

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setLocation(`/category/${categorySlug}`);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="home-page">
      <Header />

      <main className="animate-fade-in">
        <Carousel />

        <AnimatedBorder />

        <CategoryNav
          categories={categories || []}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          isLoading={categoriesLoading}
        />

        <AnimatedBorder />

        <div className="container mx-auto px-4 py-4">
          <CollectionSection
            title="New Arrival"
            collectionType="new-arrival"
            onViewAll={() => setLocation("/category/new-arrival")}
          />
        </div>

        <AnimatedBorder />

        <div className="container mx-auto px-4 py-4">
          <CollectionSection
            title="Trending Collection"
            collectionType="trending"
            onViewAll={() => setLocation("/category/trending")}
          />
        </div>

        <AnimatedBorder />

        <div className="container mx-auto px-4 py-4">
          <CollectionSection
            title="Exclusive Collection"
            collectionType="exclusive"
            onViewAll={() => setLocation("/category/exclusive")}
          />
        </div>

        <AnimatedBorder />
      </main>
    </div>
  );
}
