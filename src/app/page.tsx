import HomeClient from "@/components/home/HomeClient";
import { Product } from "@/components/ProductCard";

// Helper function to fetch products
async function getProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fakestoreapi.com';
    const res = await fetch(`${baseUrl}/products`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data.map((item: any, index: number) => ({
      ...item,
      discountPercentage: index % 2 === 1 ? 20 : undefined
    }));
  } catch (error) {
    console.error("Failed to fetch products", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  // 1. Fashion Styling Imagery (Unsplash & Local)
  const casualImg = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1024";
  const formalImg = "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1024";
  const partyImg = "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1024";
  const gymImg = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1024";
  const heroImage = "/images/hero.png";

  return (
    <HomeClient 
      initialProducts={products}
      casualImg={casualImg}
      formalImg={formalImg}
      partyImg={partyImg}
      gymImg={gymImg}
      heroImage={heroImage}
    />
  );
}
