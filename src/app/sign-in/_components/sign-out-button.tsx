'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <Button variant="outline" onClick={() => signOut()}>
      <LogOut className="h-5 w-5" />
      Sign Out
    </Button>
  );
}
