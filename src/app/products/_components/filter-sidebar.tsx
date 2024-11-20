'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { DualRangeSlider } from '@/components/ui/slider-range';

interface FilterSidebarProps {
  categories: { id: string; name: string }[];
  sizes: { id: string; name: string }[];
  colors: { id: string; name: string }[];
  maxPrice: number;
}

export function FilterSidebar({ categories, sizes, colors, maxPrice }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('categories')?.split(',') || [],
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>(searchParams.get('sizes')?.split(',') || []);
  const [selectedColors, setSelectedColors] = useState<string[]>(searchParams.get('colors')?.split(',') || []);
  const [priceRange, setPriceRange] = useState<number[]>([
    Number(searchParams.get('minPrice')) || 0,
    Number(searchParams.get('maxPrice')) || maxPrice,
  ]);

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      return current.toString();
    },
    [searchParams],
  );

  const updateFilters = useCallback(() => {
    const params: Record<string, string | null> = {
      categories: selectedCategories.length ? selectedCategories.join(',') : null,
      sizes: selectedSizes.length ? selectedSizes.join(',') : null,
      colors: selectedColors.length ? selectedColors.join(',') : null,
      minPrice: priceRange[0] > 0 ? priceRange[0].toString() : null,
      maxPrice: priceRange[1] < maxPrice ? priceRange[1].toString() : null,
    };

    const queryString = createQueryString(params);
    router.push(queryString ? `?${queryString}` : '/products');
  }, [selectedCategories, selectedSizes, selectedColors, priceRange, createQueryString, router, maxPrice]);

  useEffect(() => {
    updateFilters();
  }, [selectedCategories, selectedSizes, selectedColors, priceRange, updateFilters]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, maxPrice]);
  };

  return (
    <Card className="h-fit w-64 shrink-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Filters</CardTitle>
        {(selectedCategories.length > 0 ||
          selectedSizes.length > 0 ||
          selectedColors.length > 0 ||
          priceRange[0] > 0 ||
          priceRange[1] < maxPrice) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        )}
      </CardHeader>
      <Separator orientation="horizontal" className="mb-2" />
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(
                      checked
                        ? [...selectedCategories, category.id]
                        : selectedCategories.filter((id) => id !== category.id),
                    );
                  }}
                />
                <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Badge
                key={size.id}
                variant={selectedSizes.includes(size.id) ? 'default' : 'secondary'}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedSizes(
                    selectedSizes.includes(size.id)
                      ? selectedSizes.filter((id) => id !== size.id)
                      : [...selectedSizes, size.id],
                  );
                }}
              >
                {size.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Badge
                key={color.id}
                variant={selectedColors.includes(color.id) ? 'default' : 'secondary'}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedColors(
                    selectedColors.includes(color.id)
                      ? selectedColors.filter((id) => id !== color.id)
                      : [...selectedColors, color.id],
                  );
                }}
              >
                {color.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Price Range</h3>
          <div className="space-y-2">
            <DualRangeSlider
              min={0}
              max={maxPrice}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              className="py-4"
            />
            <div className="flex items-center justify-between">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="space-x-2">
          {selectedCategories.length > 0 && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategories([])}>
              Categories ({selectedCategories.length}) <X className="ml-1 h-3 w-3" />
            </Badge>
          )}
          {selectedSizes.length > 0 && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedSizes([])}>
              Sizes ({selectedSizes.length}) <X className="ml-1 h-3 w-3" />
            </Badge>
          )}
          {selectedColors.length > 0 && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedColors([])}>
              Colors ({selectedColors.length}) <X className="ml-1 h-3 w-3" />
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
