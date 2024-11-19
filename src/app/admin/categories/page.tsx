import Link from 'next/link';
import { CategoriesTable } from './_components/categories-table';

export default function AdminCategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link
          href="/admin/categories/create"
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Add Category
        </Link>
      </div>
      <CategoriesTable />
    </div>
  );
}
