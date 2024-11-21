'use client';

import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { signIn } from 'next-auth/react';

export function SignInButton() {
  return (
    <Button variant="outline" onClick={() => signIn('github')}>
      <Github className="h-5 w-5" />
      Sign in with GitHub
    </Button>
  );
}
