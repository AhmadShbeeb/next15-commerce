'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background py-20">
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Discover Our Latest Collection
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Shop the newest trends and find your perfect style. Quality products at competitive prices.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card
              className={cn(
                'aspect-square w-full overflow-hidden rounded-xl bg-muted',
                'before:absolute before:inset-0 before:z-10 before:bg-gradient-to-br before:from-background/30 before:via-background/0 before:to-background/30',
              )}
            >
              <div className="grid h-full grid-cols-2 gap-4 p-4">
                {[
                  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=500',
                  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=500',
                  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=500',
                  'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=500',
                ].map((src, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-lg bg-muted-foreground/10">
                    <Image
                      src={src}
                      alt={`Shopping image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-grid-white/10 absolute inset-0 [mask-image:radial-gradient(white,transparent_70%)]" />
      </div>
    </div>
  );
}
