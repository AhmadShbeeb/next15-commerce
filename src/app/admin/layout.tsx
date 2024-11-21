import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/app/admin/_components/admin-sidebar';
import { auth } from '@/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user?.role || session.user.role !== 'SUPER_ADMIN') {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
