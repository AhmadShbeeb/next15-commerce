import { getFeaturedProducts } from '@/server/product/queries';
import { FeaturedProducts } from './_components/featured-products';
import { HeroSection } from './_components/hero-section';

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <main>
      <HeroSection />
      <FeaturedProducts products={products} />
    </main>
  );
}
