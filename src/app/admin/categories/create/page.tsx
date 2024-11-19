import { CategoryForm } from '@/app/admin/categories/_components/category-form';

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Create New Category</h1>
      <CategoryForm />
    </div>
  );
}
