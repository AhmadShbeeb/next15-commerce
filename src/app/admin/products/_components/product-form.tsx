'use client';

import { SelectSearchable } from '@/components/select-searchable';
import { useGetCategories } from '@/hooks/categories/useGetCategories';
import { useGetColors } from '@/hooks/colors/useGetColors';
import { useGetSizes } from '@/hooks/sizes/useGetSizes';
import { cn } from '@/lib/utils';
import { upsertProduct } from '@/server/product/actions';
import { SerializedProduct } from '@/types/serialized-types';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { CategoryForm } from './category-form';
import { ColorForm } from './color-form';
import { SizeForm } from './size-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MultiSelectSearchable } from '@/components/multi-select-searchable';

interface ProductFormProps {
  product?: SerializedProduct;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState(upsertProduct, null);

  const { data: categories } = useGetCategories();
  const { data: colors } = useGetColors();
  const { data: sizes } = useGetSizes();
  console.log('🚀 ~ ProductForm ~ sizes:', sizes);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" defaultValue={product?.id} />

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={product?.name}
          className={cn({
            'border-destructive': formState?.error?.name,
          })}
          required
        />
        {formState?.error?.name && <p className="text-sm text-destructive">{formState.error.name.join(', ')}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description}
          className={cn({
            'border-destructive': formState?.error?.description,
          })}
          rows={4}
          required
        />
        {formState?.error?.description && (
          <p className="text-sm text-destructive">{formState.error.description.join(', ')}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            defaultValue={product?.price}
            step="0.01"
            className={cn({
              'border-destructive': formState?.error?.price,
            })}
            required
          />
          {formState?.error?.price && <p className="text-sm text-destructive">{formState.error.price.join(', ')}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            defaultValue={product?.quantity}
            className={cn({
              'border-destructive': formState?.error?.quantity,
            })}
            required
          />
          {formState?.error?.quantity && (
            <p className="text-sm text-destructive">{formState.error.quantity.join(', ')}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label className="mb-1 block text-sm font-medium">Category</Label>
          <SelectSearchable
            items={categories?.map((category) => ({ id: category.id, name: category.name })) ?? []}
            placeholder="category"
            inputName="categoryId"
            defaultValue={product?.categoryId}
            isError={!!formState?.error?.categoryId}
            Form={CategoryForm}
          />
          {formState?.error?.categoryId && <div className="text-red-500">{formState.error.categoryId.join(', ')}</div>}
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium">Sizes</Label>
          <MultiSelectSearchable
            items={sizes?.map((size) => ({ id: size.id, name: size.name })) ?? []}
            placeholder="sizes"
            inputName="sizeIds"
            defaultValue={product?.sizes?.map((size) => size.id)}
            isError={!!formState?.error?.sizeIds}
            Form={SizeForm}
          />
          {formState?.error?.sizeIds && <div className="text-red-500">{formState.error.sizeIds.join(', ')}</div>}
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium">Colors</Label>
          <MultiSelectSearchable
            items={colors?.map((color) => ({ id: color.id, name: color.name })) ?? []}
            placeholder="colors"
            inputName="colorIds"
            defaultValue={product?.colors?.map((color) => color.id)}
            isError={!!formState?.error?.colorIds}
            Form={ColorForm}
          />
          {formState?.error?.colorIds && <div className="text-red-500">{formState.error.colorIds.join(', ')}</div>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Image URL</Label>
        <Input
          id="images"
          name="images"
          type="url"
          defaultValue={product?.images && product?.images.length > 0 ? product?.images[0] : ''}
          className={cn({
            'border-destructive': formState?.error?.images,
          })}
        />
        {formState?.error?.images && <p className="text-sm text-destructive">{formState.error.images.join(', ')}</p>}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : product?.id ? 'Update Product' : 'Create Product'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
