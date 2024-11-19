import { CategoryForm } from '@/app/admin/categories/_components/category-form';
import { getCategory } from '@/server/category/queries';
import { notFound } from 'next/navigation';

interface UpdateCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function UpdateCategoryPage({ params }: UpdateCategoryPageProps) {
  const category = await getCategory(params.id);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Update Category</h1>
      <CategoryForm category={category} />
    </div>
  );
}
