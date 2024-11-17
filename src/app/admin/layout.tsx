import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/app/admin/_components/admin-sidebar';
import { ADMIN_EMAILS } from '@/lib/constants';
import { auth } from '@/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    redirect('/');
  }

  return (
    <div className='flex min-h-screen'>
      <AdminSidebar />
      <main className='flex-1 p-8'>{children}</main>
    </div>
  );
}
