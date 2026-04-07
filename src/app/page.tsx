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

  // Map images for categories
  const casualImg = products[1] ? products[1].image : '';
  const formalImg = products[2] ? products[2].image : '';
  const partyImg = products[15] ? products[15].image : '';
  const gymImg = products[18] ? products[18].image : '';
  const heroImage = '/images/hero.png';

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
