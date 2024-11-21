'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { ProductCard } from '../products/_components/product-card';
import Autoplay from 'embla-carousel-autoplay';
import { SerializedProduct } from '@/types/serialized-types';

export function FeaturedProducts({ products }: { products: SerializedProduct[] }) {
  if (products.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="mb-8 text-3xl font-bold">Featured Products</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
