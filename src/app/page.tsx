import { getFeaturedProducts } from '@/server/product/queries';
import { FeaturedProducts } from './_components/featured-products';
import { HeroSection } from './_components/hero-section';

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <main>
      <HeroSection />
      <div className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">Featured Products</h2>
        <FeaturedProducts products={products} />
      </div>
    </main>
  );
}
