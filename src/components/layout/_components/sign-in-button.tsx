'use client';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function SignInButton() {
  return (
    <Button variant="outline" onClick={() => signIn('github')}>
      Sign In
    </Button>
  );
}
