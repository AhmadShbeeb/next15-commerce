import 'server-only';

import { auth } from '@/auth';

export async function checkAuthorization() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
}
