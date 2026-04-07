import HomeClient from "@/components/home/HomeClient";
import { Product } from "@/components/ProductCard";

// High-quality fallback products for production stability if the external API fails
const MOCK_PRODUCTS: Product[] = [
  {
    id: 101,
    title: "Gradient Graphic T-shirt",
    price: 145,
    description: "Breathable and stylish cotton t-shirt with modern gradient graphic.",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500",
    rating: { rate: 4.5, count: 120 },
    discountPercentage: 20
  },
  {
    id: 102,
    title: "Polo with Contrast Trims",
    price: 242,
    description: "Premium cotton polo shirt with contrast trim details.",
    category: "Formal",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?q=80&w=500",
    rating: { rate: 4.2, count: 85 }
  },
  {
    id: 103,
    title: "Black Striped T-shirt",
    price: 120,
    description: "Classic black and white striped t-shirt for everyday wear.",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500",
    rating: { rate: 4.8, count: 200 },
    discountPercentage: 20
  },
  {
    id: 104,
    title: "Skinny Fit Jeans",
    price: 240,
    description: "High-quality denim with a perfect skinny fit.",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500",
    rating: { rate: 4.5, count: 150 }
  },
  {
    id: 105,
    title: "Checkered Shirt",
    price: 180,
    description: "Classic checkered shirt made from premium flannel.",
    category: "Formal",
    image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=500",
    rating: { rate: 4.4, count: 95 },
    discountPercentage: 20
  },
  {
    id: 106,
    title: "Sleeve Striped T-shirt",
    price: 130,
    description: "Casual t-shirt with unique sleeve stripe design.",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=500",
    rating: { rate: 4.6, count: 110 }
  },
  {
    id: 107,
    title: "Vertical Striped Shirt",
    price: 212,
    description: "Elegant vertical striped shirt for a tall and slim look.",
    category: "Formal",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=500",
    rating: { rate: 4.3, count: 70 },
    discountPercentage: 20
  },
  {
    id: 108,
    title: "Courage Graphic T-shirt",
    price: 145,
    description: "Inspirational graphic t-shirt for a bold statement.",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=500",
    rating: { rate: 4.7, count: 140 }
  }
];

// Helper function to fetch products with fallback logic
async function getProducts(): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fakestoreapi.com';
  console.log(`[Data Fetch] Attempting to fetch products from: ${baseUrl}`);
  
  try {
    const res = await fetch(`${baseUrl}/products`, { 
      next: { revalidate: 3600 },
      // Add a timeout signal to prevent long hangs on Vercel
      signal: AbortSignal.timeout(5000) 
    });
    
    if (!res.ok) {
      console.warn(`[Data Fetch] API returned status ${res.status}. Falling back to mock data.`);
      return MOCK_PRODUCTS;
    }
    
    const data = await res.json();
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.warn(`[Data Fetch] API returned empty data. Falling back to mock data.`);
      return MOCK_PRODUCTS;
    }

    return data.map((item: any, index: number) => ({
      ...item,
      discountPercentage: index % 2 === 1 ? 20 : undefined
    }));
  } catch (error: any) {
    if (error.name === 'TimeoutError') {
      console.error("[Data Fetch] API request timed out. Falling back to mock data.");
    } else {
      console.error("[Data Fetch] API request failed:", error.message);
    }
    return MOCK_PRODUCTS;
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
